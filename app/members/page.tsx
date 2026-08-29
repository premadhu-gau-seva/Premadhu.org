import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Users } from "lucide-react";
import { sql, Member } from "@/lib/db";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "All Members - Premadhu Gau Seva Samiti",
  description:
    "Meet the dedicated members and volunteers of Premadhu Gau Seva Samiti working together for cow protection and welfare.",
};

export default async function MembersPage() {
  let members: Member[] = [];
  let error: string | null = null;

  try {
    const result = await sql<Member>`
      SELECT id, name, designation, bio, photo_url, sort_order
      FROM members
      ORDER BY sort_order ASC, name ASC
    `;
    members = result.rows;
  } catch (err) {
    console.error("Error fetching members from database:", err);
    error = "Unable to load members list at this time. Please try again later.";
  }

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

          {/* Error Message */}
          {error && (
            <div className="max-w-md mx-auto p-4 bg-red-50 border border-red-200 rounded-xl text-center text-red-700 text-sm mb-12">
              {error}
            </div>
          )}

          {/* Members Grid */}
          {!error && members.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="bg-white p-6 sm:p-7 rounded-2xl border border-gray-100 hover:border-primary/40 shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 text-center flex flex-col items-center group"
                >
                  {/* Circular Avatar if photo_url is set */}
                  {member.photo_url ? (
                    <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-primary mb-5 shadow-inner flex-shrink-0">
                      <Image
                        src={member.photo_url}
                        alt={member.name}
                        fill
                        sizes="(max-width: 640px) 112px, 128px"
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  ) : null}

                  <h2 className="text-xl font-bold text-text-dark mb-1 group-hover:text-primary transition-colors">
                    {member.name}
                  </h2>
                  <div className="text-xs sm:text-sm font-semibold text-primary uppercase tracking-wider mb-2">
                    {member.designation}
                  </div>
                  {member.bio && (
                    <p className="text-text-light text-xs sm:text-sm leading-relaxed mt-1">
                      {member.bio}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!error && members.length === 0 && (
            <div className="text-center py-16">
              <p className="text-text-light text-lg">No members found at this moment.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
