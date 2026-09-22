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
        name: "शिव साधक अतुल पांडेय जी महाराज",
        designation: "संरक्षक एवं मार्गदर्शक",
        bio: null,
        photo_url: "/Atul Pandey ji.jpeg",
        sort_order: 1,
      },
      {
        name: "Priyanka Tiwari",
        designation: "President",
        bio: "A teacher by profession and highly active in many social activities",
        photo_url: "/Priyanka.jpeg",
        sort_order: 2,
      },
      {
        name: "Sapna Nigam",
        designation: "Vice President",
        bio: "A doctor by profession and active in social and community welfare",
        photo_url: "/Sapna.jpeg",
        sort_order: 3,
      },
      {
        name: "Lalit Tiwari",
        designation: "Secretary",
        bio: "Businessman in reality sector, runs blood donation camps and financial aids to poor",
        photo_url: "/Lalit.jpeg",
        sort_order: 4,
      },
      {
        name: "Amit Kumar Shrivastav",
        designation: "Assistant Secretary",
        bio: "Policy Advisor, dedicated to social welfare and development",
        photo_url: "/Amit Shrivastav.jpeg",
        sort_order: 5,
      },
      {
        name: "Dr Amit Nigam",
        designation: "Treasurer",
        bio: "Professional medical practitioner and active social activist for shelterless people",
        photo_url: "/Amit.jpeg",
        sort_order: 6,
      },
      {
        name: "Ajay Bajwa",
        designation: "Fundraising Head",
        bio: "Business Man and Dedicated to Social Works, Runs Fundraising Camps for Welfare of People and Animals",
        photo_url: "/Ajay Bajwa.jpeg",
        sort_order: 7,
      },
      {
        name: "Poonam S",
        designation: "Donor Relations Coordinator",
        bio: "House Wife and Compassionate social worker dedicated to community welfare",
        photo_url: "/Poonam.jpeg",
        sort_order: 8,
      },
      {
        name: "Rajesh Tiwari",
        designation: "Member",
        bio: "Goat former and working for woman empowerment in rural areas",
        photo_url: "/Rakesh.jpeg",
        sort_order: 9,
      },
      {
        name: "Vidyavati Tiwari",
        designation: "Member",
        bio: "Housewife, highly active in spiritual and social works",
        photo_url: "/Vidyavati.jpeg",
        sort_order: 10,
      },
      {
        name: "Ramesh Sharma",
        designation: "Volunteer Coordinator",
        bio: "Dedicated volunteer managing day-to-day operations and community outreach",
        photo_url: "/male.png",
        sort_order: 11,
      },
      {
        name: "Sunita Patel",
        designation: "Gau Seva Volunteer",
        bio: "Passionate animal lover actively assisting in cow care and feeding programs",
        photo_url: "/female.png",
        sort_order: 12,
      },
      {
        name: "Anil Kumar",
        designation: "Animal Health Associate",
        bio: "Assisting in veterinary care, medication schedules, and regular cow health checkups",
        photo_url: "/male.png",
        sort_order: 13,
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
          `INSERT INTO members (name, designation, bio, photo_url, sort_order)
           VALUES ($1, $2, $3, $4, $5)`,
          [member.name, member.designation, member.bio, member.photo_url, member.sort_order]
        );
      }
      console.log(`✓ Inserted ${sampleMembers.length} sample members.`);
    } else {
      console.log(
        `Table 'members' already contains ${count} rows. Checking for missing sample members...`
      );
      for (const member of sampleMembers) {
        const { rows } = await client.query(
          "SELECT id, photo_url, bio FROM members WHERE name = $1 AND designation = $2",
          [member.name, member.designation]
        );
        if (rows.length === 0) {
          await client.query(
            `INSERT INTO members (name, designation, bio, photo_url, sort_order)
             VALUES ($1, $2, $3, $4, $5)`,
            [member.name, member.designation, member.bio, member.photo_url, member.sort_order]
          );
          console.log(`+ Added member: ${member.name} (${member.designation})`);
        } else {
          await client.query(
            `UPDATE members
             SET photo_url = COALESCE(photo_url, $1),
                 bio = COALESCE(bio, $2),
                 sort_order = $3
             WHERE id = $4`,
            [member.photo_url, member.bio, member.sort_order, rows[0].id]
          );
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
