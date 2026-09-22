import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Users } from "lucide-react";
import { sql, Member } from "@/lib/db";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MemberCard from "@/components/MemberCard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "All Members - Premadhu Gau Seva Samiti",
  description:
    "Meet the dedicated members and volunteers of Premadhu Gau Seva Samiti working together for cow protection and welfare.",
};

const DEFAULT_MEMBERS: Member[] = [
  {
    id: 1,
    name: "शिव साधक अतुल पांडेय जी महाराज",
    designation: "संरक्षक एवं मार्गदर्शक",
    bio: null,
    photo_url: "/Atul Pandey ji.jpeg",
    sort_order: 1,
    created_at: new Date(),
  },
  {
    id: 2,
    name: "Priyanka Tiwari",
    designation: "President",
    bio: "A teacher by profession and highly active in many social activities",
    photo_url: "/Priyanka.jpeg",
    sort_order: 2,
    created_at: new Date(),
  },
  {
    id: 3,
    name: "Sapna Nigam",
    designation: "Vice President",
    bio: "A doctor by profession and active in social and community welfare",
    photo_url: "/Sapna.jpeg",
    sort_order: 3,
    created_at: new Date(),
  },
  {
    id: 4,
    name: "Lalit Tiwari",
    designation: "Secretary",
    bio: "Businessman in reality sector, runs blood donation camps and financial aids to poor",
    photo_url: "/Lalit.jpeg",
    sort_order: 4,
    created_at: new Date(),
  },
  {
    id: 5,
    name: "Amit Kumar Shrivastav",
    designation: "Assistant Secretary",
    bio: "Policy Advisor, dedicated to social welfare and development",
    photo_url: "/Amit Shrivastav.jpeg",
    sort_order: 5,
    created_at: new Date(),
  },
  {
    id: 6,
    name: "Dr Amit Nigam",
    designation: "Treasurer",
    bio: "Professional medical practitioner and active social activist for shelterless people",
    photo_url: "/Amit.jpeg",
    sort_order: 6,
    created_at: new Date(),
  },
  {
    id: 7,
    name: "Ajay Bajwa",
    designation: "Fundraising Head",
    bio: "Business Man and Dedicated to Social Works, Runs Fundraising Camps for Welfare of People and Animals",
    photo_url: "/Ajay Bajwa.jpeg",
    sort_order: 7,
    created_at: new Date(),
  },
  {
    id: 8,
    name: "Poonam S",
    designation: "Donor Relations Coordinator",
    bio: "House Wife and Compassionate social worker dedicated to community welfare",
    photo_url: "/Poonam.jpeg",
    sort_order: 8,
    created_at: new Date(),
  },
  {
    id: 9,
    name: "Rajesh Tiwari",
    designation: "Member",
    bio: "Goat former and working for woman empowerment in rural areas",
    photo_url: "/Rakesh.jpeg",
    sort_order: 9,
    created_at: new Date(),
  },
  {
    id: 10,
    name: "Vidyavati Tiwari",
    designation: "Member",
    bio: "Housewife, highly active in spiritual and social works",
    photo_url: "/Vidyavati.jpeg",
    sort_order: 10,
    created_at: new Date(),
  },
  {
    id: 11,
    name: "Ramesh Sharma",
    designation: "Volunteer Coordinator",
    bio: "Dedicated volunteer managing day-to-day operations and community outreach",
    photo_url: "/male.png",
    sort_order: 10,
    created_at: new Date(),
  },
  {
    id: 12,
    name: "Sunita Patel",
    designation: "Gau Seva Volunteer",
    bio: "Passionate animal lover actively assisting in cow care and feeding programs",
    photo_url: "/female.png",
    sort_order: 11,
    created_at: new Date(),
  },
  {
    id: 13,
    name: "Anil Kumar",
    designation: "Animal Health Associate",
    bio: "Assisting in veterinary care, medication schedules, and regular cow health checkups",
    photo_url: "/male.png",
    sort_order: 12,
    created_at: new Date(),
  },
];

export default async function MembersPage() {
  let members: Member[] = [];

  try {
    const result = await sql<Member>`
      SELECT id, name, designation, bio, photo_url, sort_order, created_at
      FROM members
      ORDER BY sort_order ASC, name ASC
    `;
    members = result.rows;
  } catch (err) {
    console.error("Error fetching members from database:", err);
  }

  // Gracefully use default members if database is unpopulated or unreachable
  const displayMembers = members.length > 0 ? members : DEFAULT_MEMBERS;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-grow pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Navigation */}
          <div className="mb-8">
            <Link
              href="/#team"
              className="inline-flex items-center gap-2 text-sm font-semibold text-text-light hover:text-primary transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to Home</span>
            </Link>
          </div>

          {/* Page Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-bg-light text-primary mb-4 shadow-sm">
              <Users className="w-6 h-6" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-dark tracking-tight mb-4 relative inline-block">
              Our Members
              <span className="block w-20 h-1 bg-primary mx-auto mt-3 rounded-full"></span>
            </h1>
            <p className="text-base sm:text-lg text-text-light max-w-2xl mx-auto">
              Dedicated individuals and volunteers united in the sacred mission of Gau Seva and welfare
            </p>
          </div>

          {/* Members Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
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
        </div>
      </main>

      <Footer />
    </div>
  );
}
