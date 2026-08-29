import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { sql, Member } from "@/lib/db";

export const dynamic = "force-dynamic";

// GET /api/members/[id] - Fetch single member
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const memberId = parseInt(id, 10);
    if (isNaN(memberId)) {
      return NextResponse.json({ error: "Invalid member ID" }, { status: 400 });
    }

    const { rows } = await sql<Member>`
      SELECT id, name, designation, bio, photo_url, sort_order, created_at
      FROM members
      WHERE id = ${memberId}
    `;

    if (rows.length === 0) {
      return NextResponse.json({ error: "Member not found" }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error("Error fetching member by ID:", error);
    return NextResponse.json(
      { error: "Failed to fetch member" },
      { status: 500 }
    );
  }
}

// PUT /api/members/[id] - Update a member (Authenticated Admin only)
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const memberId = parseInt(id, 10);
    if (isNaN(memberId)) {
      return NextResponse.json({ error: "Invalid member ID" }, { status: 400 });
    }

    const body = await request.json();
    const { name, designation, bio, photo_url, sort_order } = body;

    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }

    if (!designation || typeof designation !== "string" || !designation.trim()) {
      return NextResponse.json(
        { error: "Designation is required" },
        { status: 400 }
      );
    }

    const parsedSortOrder =
      sort_order !== undefined && sort_order !== null && !isNaN(Number(sort_order))
        ? parseInt(String(sort_order), 10)
        : 0;

    const cleanBio =
      bio && typeof bio === "string" && bio.trim().length > 0
        ? bio.trim()
        : null;

    const cleanPhotoUrl =
      photo_url !== undefined
        ? photo_url && typeof photo_url === "string" && photo_url.trim().length > 0
          ? photo_url.trim()
          : null
        : null;

    const { rows } = await sql<Member>`
      UPDATE members
      SET name = ${name.trim()},
          designation = ${designation.trim()},
          bio = ${cleanBio},
          photo_url = ${cleanPhotoUrl},
          sort_order = ${parsedSortOrder}
      WHERE id = ${memberId}
      RETURNING id, name, designation, bio, photo_url, sort_order, created_at
    `;

    if (rows.length === 0) {
      return NextResponse.json({ error: "Member not found" }, { status: 404 });
    }

    // Revalidate public routes to reflect the change immediately
    revalidatePath("/members");
    revalidatePath("/");
    revalidatePath("/admin");

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error("Error updating member:", error);
    return NextResponse.json(
      { error: "Failed to update member" },
      { status: 500 }
    );
  }
}

// DELETE /api/members/[id] - Delete a member (Authenticated Admin only)
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const memberId = parseInt(id, 10);
    if (isNaN(memberId)) {
      return NextResponse.json({ error: "Invalid member ID" }, { status: 400 });
    }

    const { rows } = await sql<Member>`
      DELETE FROM members
      WHERE id = ${memberId}
      RETURNING id
    `;

    if (rows.length === 0) {
      return NextResponse.json({ error: "Member not found" }, { status: 404 });
    }

    // Revalidate public routes to reflect the change immediately
    revalidatePath("/members");
    revalidatePath("/");
    revalidatePath("/admin");

    return NextResponse.json({
      success: true,
      message: "Member deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting member:", error);
    return NextResponse.json(
      { error: "Failed to delete member" },
      { status: 500 }
    );
  }
}
