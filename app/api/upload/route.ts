import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { auth } from "@/auth";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Only image files are allowed" },
        { status: 400 }
      );
    }

    // Limit maximum size to 10MB
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Image exceeds 10MB size limit" },
        { status: 400 }
      );
    }

    // Read the file buffer once upfront
    const buffer = Buffer.from(await file.arrayBuffer());
    const mimeType = file.type || "image/jpeg";
    const base64DataUrl = `data:${mimeType};base64,${buffer.toString("base64")}`;

    // Check if valid Vercel Blob token is configured in environment
    const blobToken = process.env.BLOB_READ_WRITE_TOKEN?.trim();
    if (
      blobToken &&
      blobToken !== "undefined" &&
      blobToken !== "null" &&
      blobToken.length > 10
    ) {
      try {
        const ext = file.name.split(".").pop() || "webp";
        const cleanFilename = `members/${Date.now()}-${Math.random()
          .toString(36)
          .substring(2, 9)}.${ext}`;

        // Upload buffer to Vercel Blob storage
        const blob = await put(cleanFilename, buffer, {
          access: "public",
          token: blobToken,
          contentType: mimeType,
        });

        if (blob?.url) {
          return NextResponse.json({ url: blob.url });
        }
      } catch (blobError) {
        console.warn(
          "Vercel Blob upload failed, falling back to base64 Data URL:",
          blobError
        );
      }
    }

    // Fallback: Return base64 Data URL if BLOB_READ_WRITE_TOKEN is missing or fails
    return NextResponse.json({ url: base64DataUrl });
  } catch (error: unknown) {
    console.error("Upload error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to upload image";
    return NextResponse.json(
      { error: `Upload failed: ${message}` },
      { status: 500 }
    );
  }
}
