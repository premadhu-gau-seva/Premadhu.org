import { sql, db, createPool } from "@vercel/postgres";

export interface Member {
  id: number;
  name: string;
  designation: string;
  bio: string | null;
  photo_url: string | null;
  sort_order: number;
  is_core: boolean;
  created_at: string | Date;
}

export type NewMember = {
  name: string;
  designation: string;
  bio?: string | null;
  photo_url?: string | null;
  sort_order?: number;
  is_core?: boolean;
};

export interface AboutPhoto {
  id: number;
  url: string;
  caption: string | null;
  sort_order: number;
  created_at: string | Date;
}

export type NewAboutPhoto = {
  url: string;
  caption?: string | null;
  sort_order?: number;
};

export const DEFAULT_ABOUT_PHOTOS: AboutPhoto[] = [
  {
    id: 1,
    url: "/Cow.jpg",
    caption: "Cows being cared for with love at Premadhu Gau Seva Samiti",
    sort_order: 1,
    created_at: new Date().toISOString(),
  },
];

let tableEnsured = false;
export async function ensureAboutPhotosTable() {
  if (tableEnsured) return;
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS about_photos (
        id SERIAL PRIMARY KEY,
        url TEXT NOT NULL,
        caption TEXT,
        sort_order INTEGER DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    await sql`
      CREATE INDEX IF NOT EXISTS idx_about_photos_sort_order ON about_photos (sort_order ASC, id ASC);
    `;
    tableEnsured = true;
  } catch (err) {
    // Non-fatal if offline or DB not reachable
    console.warn("Could not ensure about_photos table:", err);
  }
}

export { sql, db, createPool };
export default db;
