import dotenv from "dotenv";
import path from "path";

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

import { createPool } from "@vercel/postgres";

async function seed() {
  const connectionString = process.env.POSTGRES_URL;

  if (!connectionString) {
    throw new Error(
      "POSTGRES_URL is not defined in environment variables or .env.local"
    );
  }

  console.log("Connecting to Postgres database...");
  const pool = createPool({ connectionString });
  const client = await pool.connect();

  try {
    console.log("Creating 'members' table if it does not exist...");
    await client.query(`
      CREATE TABLE IF NOT EXISTS members (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        designation TEXT NOT NULL,
        bio TEXT,
        photo_url TEXT,
        sort_order INTEGER DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
      CREATE INDEX IF NOT EXISTS idx_members_sort_order ON members (sort_order ASC, id ASC);
    `);
    console.log("✓ 'members' table ready.");

    const sampleMembers = [
      {
        name: "Priyanka Tiwari",
        designation: "President",
        sort_order: 1,
      },
      {
        name: "Pushpendra Tiwari",
        designation: "Vice President",
        sort_order: 2,
      },
      {
        name: "Lalit Tiwari",
        designation: "Secretary",
        sort_order: 3,
      },
      {
        name: "Arti Tiwari",
        designation: "Assistant Secretary",
        sort_order: 4,
      },
      {
        name: "Dr Amit Nigam",
        designation: "Treasurer",
        sort_order: 5,
      },
      {
        name: "Rajesh Tiwari",
        designation: "Member",
        sort_order: 6,
      },
      {
        name: "Vidyavati Tiwari",
        designation: "Member",
        sort_order: 7,
      },
      {
        name: "Ramesh Sharma",
        designation: "Volunteer Coordinator",
        sort_order: 8,
      },
      {
        name: "Sunita Patel",
        designation: "Gau Seva Volunteer",
        sort_order: 9,
      },
      {
        name: "Anil Kumar",
        designation: "Animal Health Associate",
        sort_order: 10,
      },
    ];

    console.log("Checking existing members...");
    const { rows: existingRows } = await client.query(
      "SELECT count(*) FROM members"
    );
    const count = parseInt(existingRows[0].count, 10);

    if (count === 0) {
      console.log("Seeding sample members...");
      for (const member of sampleMembers) {
        await client.query(
          `INSERT INTO members (name, designation, sort_order)
           VALUES ($1, $2, $3)`,
          [member.name, member.designation, member.sort_order]
        );
      }
      console.log(`✓ Inserted ${sampleMembers.length} sample members.`);
    } else {
      console.log(
        `Table 'members' already contains ${count} rows. Checking for missing sample members...`
      );
      for (const member of sampleMembers) {
        const { rows } = await client.query(
          "SELECT id FROM members WHERE name = $1 AND designation = $2",
          [member.name, member.designation]
        );
        if (rows.length === 0) {
          await client.query(
            `INSERT INTO members (name, designation, sort_order)
             VALUES ($1, $2, $3)`,
            [member.name, member.designation, member.sort_order]
          );
          console.log(`+ Added member: ${member.name} (${member.designation})`);
        }
      }
    }

    const { rows: allMembers } = await client.query(
      "SELECT id, name, designation, photo_url, sort_order, created_at FROM members ORDER BY sort_order ASC, id ASC"
    );

    console.log("\nCurrent members in database:");
    console.table(allMembers);
    console.log("✓ Database seeding complete!");
  } catch (error) {
    console.error("Error during database seed:", error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
