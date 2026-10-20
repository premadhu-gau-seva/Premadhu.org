import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { sql, AboutPhoto, DEFAULT_ABOUT_PHOTOS, ensureAboutPhotosTable } from "@/lib/db";

export const dynamic = "force-dynamic";

// GET /api/about-photos - Fetch all about photos
export async function GET() {
  try {
    await ensureAboutPhotosTable();

    const { rows } = await sql<AboutPhoto>`
      SELECT id, url, caption, sort_order, created_at
      FROM about_photos
      ORDER BY sort_order ASC, id ASC
    `;

    if (rows && rows.length > 0) {
      return NextResponse.json(rows);
    }

    return NextResponse.json(DEFAULT_ABOUT_PHOTOS);
  } catch (error) {
    console.error("Error fetching about photos:", error);
    // Return default photos on database error so UI never breaks
    return NextResponse.json(DEFAULT_ABOUT_PHOTOS);
  }
}

// POST /api/about-photos - Create a new about photo (Authenticated Admin only)
export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await ensureAboutPhotosTable();

    const body = await request.json();
    const { url, caption, sort_order } = body;

    if (!url || typeof url !== "string" || !url.trim()) {
      return NextResponse.json(
        { error: "Photo URL is required" },
        { status: 400 }
      );
    }

    const cleanUrl = url.trim();
    const cleanCaption =
      caption && typeof caption === "string" && caption.trim().length > 0
        ? caption.trim()
        : null;

    const parsedSortOrder =
      sort_order !== undefined && sort_order !== null && !isNaN(Number(sort_order))
        ? parseInt(String(sort_order), 10)
        : 0;

    const { rows } = await sql<AboutPhoto>`
      INSERT INTO about_photos (url, caption, sort_order)
      VALUES (${cleanUrl}, ${cleanCaption}, ${parsedSortOrder})
      RETURNING id, url, caption, sort_order, created_at
    `;

    // Revalidate public and admin pages
    revalidatePath("/");
    revalidatePath("/admin");

    return NextResponse.json(rows[0], { status: 201 });
  } catch (error) {
    console.error("Error adding about photo:", error);
    const message = error instanceof Error ? error.message : "Failed to add photo";
    return NextResponse.json(
      { error: `Database error: ${message}` },
      { status: 500 }
    );
  }
}
