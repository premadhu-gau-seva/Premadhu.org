import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Team() {
  const teamMembers = [
    {
      name: "Priyanka Tiwari",
      role: "President",
      bio: "A teacher by profession and highly active in many social activities",
      image: "/Priyanka.jpeg",
    },
    {
      name: "Lalit Tiwari",
      role: "Secretary",
      bio: "Businessman in reality sector, runs blood donation camps and financial aids to poor",
      image: "/Lalit.jpeg",
    },
    {
      name: "Dr Amit Nigam",
      role: "Treasurer",
      bio: "Professional medical practitioner and active social activist for shelterless people",
      image: "/Amit.jpeg",
    },
    {
      name: "Rajesh Tiwari",
      role: "Member",
      bio: "Goat former and working for woman empowerment in rural areas",
      image: "/Rakesh.jpeg",
    },
    {
      name: "Vidyavati Tiwari",
      role: "Member",
      bio: "Housewife, highly active in spiritual and social works",
      image: "/Vidyavati.jpeg",
    },
  ];

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
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-primary/40 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center flex flex-col items-center group"
            >
              {/* Circular Avatar with primary border */}
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-primary mb-5 shadow-inner">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              <h3 className="text-xl font-bold text-text-dark mb-1">
                {member.name}
              </h3>
              <div className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
                {member.role}
              </div>
              <p className="text-text-light text-sm leading-relaxed">
                {member.bio}
              </p>
            </div>
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
