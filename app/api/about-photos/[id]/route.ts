import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { sql, AboutPhoto, ensureAboutPhotosTable } from "@/lib/db";

export const dynamic = "force-dynamic";

// GET /api/about-photos/[id] - Fetch single photo
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await ensureAboutPhotosTable();
    const { id } = await params;
    const photoId = parseInt(id, 10);
    if (isNaN(photoId)) {
      return NextResponse.json({ error: "Invalid photo ID" }, { status: 400 });
    }

    const { rows } = await sql<AboutPhoto>`
      SELECT id, url, caption, sort_order, created_at
      FROM about_photos
      WHERE id = ${photoId}
    `;

    if (rows.length === 0) {
      return NextResponse.json({ error: "Photo not found" }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error("Error fetching photo by ID:", error);
    return NextResponse.json(
      { error: "Failed to fetch photo" },
      { status: 500 }
    );
  }
}

// PUT /api/about-photos/[id] - Update a photo (Authenticated Admin only)
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await ensureAboutPhotosTable();

    const { id } = await params;
    const photoId = parseInt(id, 10);
    if (isNaN(photoId)) {
      return NextResponse.json({ error: "Invalid photo ID" }, { status: 400 });
    }

    const body = await request.json();
    const { url, caption, sort_order } = body;

    const parsedSortOrder =
      sort_order !== undefined && sort_order !== null && !isNaN(Number(sort_order))
        ? parseInt(String(sort_order), 10)
        : 0;

    const cleanCaption =
      caption !== undefined
        ? caption && typeof caption === "string" && caption.trim().length > 0
          ? caption.trim()
          : null
        : null;

    let rows: AboutPhoto[] = [];

    if (url && typeof url === "string" && url.trim().length > 0) {
      const result = await sql<AboutPhoto>`
        UPDATE about_photos
        SET url = ${url.trim()},
            caption = ${cleanCaption},
            sort_order = ${parsedSortOrder}
        WHERE id = ${photoId}
        RETURNING id, url, caption, sort_order, created_at
      `;
      rows = result.rows;
    } else {
      const result = await sql<AboutPhoto>`
        UPDATE about_photos
        SET caption = ${cleanCaption},
            sort_order = ${parsedSortOrder}
        WHERE id = ${photoId}
        RETURNING id, url, caption, sort_order, created_at
      `;
      rows = result.rows;
    }

    if (rows.length === 0) {
      return NextResponse.json({ error: "Photo not found" }, { status: 404 });
    }

    revalidatePath("/");
    revalidatePath("/admin");

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error("Error updating about photo:", error);
    return NextResponse.json(
      { error: "Failed to update photo" },
      { status: 500 }
    );
  }
}

// DELETE /api/about-photos/[id] - Delete a photo (Authenticated Admin only)
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await ensureAboutPhotosTable();

    const { id } = await params;
    const photoId = parseInt(id, 10);
    if (isNaN(photoId)) {
      return NextResponse.json({ error: "Invalid photo ID" }, { status: 400 });
    }

    const { rows } = await sql<AboutPhoto>`
      DELETE FROM about_photos
      WHERE id = ${photoId}
      RETURNING id
    `;

    if (rows.length === 0) {
      return NextResponse.json({ error: "Photo not found" }, { status: 404 });
    }

    revalidatePath("/");
    revalidatePath("/admin");

    return NextResponse.json({
      success: true,
      message: "Photo deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting about photo:", error);
    return NextResponse.json(
      { error: "Failed to delete photo" },
      { status: 500 }
    );
  }
}
