import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { sql, Member } from "@/lib/db";
import MemberCard from "@/components/MemberCard";

const DEFAULT_CORE_MEMBERS: Member[] = [
  {
    id: 1,
    name: "शिव साधक अतुल पांडेय जी महाराज",
    designation: "संरक्षक एवं मार्गदर्शक",
    bio: null,
    photo_url: "/Atul Pandey ji.jpeg",
    sort_order: 1,
    is_core: true,
    created_at: new Date(),
  },
  {
    id: 2,
    name: "Priyanka Tiwari",
    designation: "President",
    bio: "A teacher by profession and highly active in many social activities",
    photo_url: "/Priyanka.jpeg",
    sort_order: 2,
    is_core: true,
    created_at: new Date(),
  },
  {
    id: 3,
    name: "Sapna Nigam",
    designation: "Vice President",
    bio: "A doctor by profession and active in social and community welfare",
    photo_url: "/Sapna.jpeg",
    sort_order: 3,
    is_core: true,
    created_at: new Date(),
  },
  {
    id: 4,
    name: "Lalit Tiwari",
    designation: "Secretary",
    bio: "Businessman in reality sector, runs blood donation camps and financial aids to poor",
    photo_url: "/Lalit.jpeg",
    sort_order: 4,
    is_core: true,
    created_at: new Date(),
  },
  {
    id: 5,
    name: "Amit Kumar Shrivastav",
    designation: "Assistant Secretary",
    bio: "Policy Advisor, dedicated to social welfare and development",
    photo_url: "/Amit Shrivastav.jpeg",
    sort_order: 5,
    is_core: true,
    created_at: new Date(),
  },
  {
    id: 6,
    name: "Dr Amit Nigam",
    designation: "Treasurer",
    bio: "Professional medical practitioner and active social activist for shelterless people",
    photo_url: "/Amit.jpeg",
    sort_order: 6,
    is_core: true,
    created_at: new Date(),
  },
  {
    id: 7,
    name: "Ajay Bajwa",
    designation: "Fundraising Head",
    bio: "Business Man and Dedicated to Social Works, Runs Fundraising Camps for Welfare of People and Animals",
    photo_url: "/Ajay Bajwa.jpeg",
    sort_order: 7,
    is_core: true,
    created_at: new Date(),
  },
  {
    id: 8,
    name: "Poonam S",
    designation: "Donor Relations Coordinator",
    bio: "House Wife and Compassionate social worker dedicated to community welfare",
    photo_url: "/Poonam.jpeg",
    sort_order: 8,
    is_core: true,
    created_at: new Date(),
  },
  {
    id: 9,
    name: "Rajesh Tiwari",
    designation: "Member",
    bio: "Goat former and working for woman empowerment in rural areas",
    photo_url: "/Rakesh.jpeg",
    sort_order: 9,
    is_core: true,
    created_at: new Date(),
  },
  {
    id: 10,
    name: "Vidyavati Tiwari",
    designation: "Member",
    bio: "Housewife, highly active in spiritual and social works",
    photo_url: "/Vidyavati.jpeg",
    sort_order: 10,
    is_core: true,
    created_at: new Date(),
  },
];

export default async function Team() {
  let coreMembers: Member[] = [];
  let dbError = false;

  try {
    const result = await sql<Member>`
      SELECT id, name, designation, bio, photo_url, sort_order, is_core, created_at
      FROM members
      WHERE is_core = true
      ORDER BY sort_order ASC, name ASC
    `;
    coreMembers = result.rows;
  } catch (err) {
    console.error("Error fetching core members from database:", err);
    dbError = true;
  }

  // Use database core members as source of truth; fall back to default core team only if DB query failed or table has no core members
  const displayMembers =
    !dbError && coreMembers.length > 0 ? coreMembers : DEFAULT_CORE_MEMBERS;

  return (
    <section id="team" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-dark tracking-tight mb-4 relative inline-block">
            Our Core Team
            <span className="block w-16 h-1 bg-primary mx-auto mt-3 rounded-full"></span>
          </h2>
          <p className="text-lg text-text-light max-w-2xl mx-auto">
            Meet the dedicated individuals leading our mission to serve Gau Mata
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {displayMembers.map((member) => (
            <MemberCard
              key={member.id}
              name={member.name}
              designation={member.designation}
              bio={member.bio}
              photoUrl={member.photo_url}
            />
          ))}
        </div>

        {/* More Members Link Button */}
        <div className="mt-14 text-center">
          <Link
            href="/members"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-white font-semibold rounded-full hover:bg-primary-dark shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
          >
            <span>More Members</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
