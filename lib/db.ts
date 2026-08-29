import { sql, db, createPool } from "@vercel/postgres";

export interface Member {
  id: number;
  name: string;
  designation: string;
  bio: string | null;
  photo_url: string | null;
  sort_order: number;
  created_at: string | Date;
}

export type NewMember = {
  name: string;
  designation: string;
  bio?: string | null;
  photo_url?: string | null;
  sort_order?: number;
};

export { sql, db, createPool };
export default db;
