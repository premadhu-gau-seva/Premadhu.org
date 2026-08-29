import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { sql, Member } from "@/lib/db";

export const dynamic = "force-dynamic";

// GET /api/members - Fetch all members ordered by sort_order, then name
export async function GET() {
  try {
    const { rows } = await sql<Member>`
      SELECT id, name, designation, bio, photo_url, sort_order, created_at
      FROM members
      ORDER BY sort_order ASC, name ASC
    `;
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching members:", error);
    return NextResponse.json(
      { error: "Failed to fetch members" },
      { status: 500 }
    );
  }
}

// POST /api/members - Create a new member (Authenticated Admin only)
export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, designation, bio, sort_order } = body;

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

    const { rows } = await sql<Member>`
      INSERT INTO members (name, designation, bio, sort_order)
      VALUES (${name.trim()}, ${designation.trim()}, ${cleanBio}, ${parsedSortOrder})
      RETURNING id, name, designation, bio, photo_url, sort_order, created_at
    `;

    // Revalidate public routes to reflect the change immediately
    revalidatePath("/members");
    revalidatePath("/");
    revalidatePath("/admin");

    return NextResponse.json(rows[0], { status: 201 });
  } catch (error) {
    console.error("Error creating member:", error);
    return NextResponse.json(
      { error: "Failed to create member" },
      { status: 500 }
    );
  }
}
