"use client";

import Link from "next/link";
import { HeartHandshake, Users2, Megaphone } from "lucide-react";
import { useState } from "react";

export default function GetInvolved() {
  const [shared, setShared] = useState(false);

  const handleShare = async () => {
    if (typeof window !== "undefined") {
      if (navigator.share) {
        try {
          await navigator.share({
            title: "Premadhu Gau Seva Samiti",
            text: "Support Premadhu Gau Seva Samiti in protecting and serving Gau Mata.",
            url: window.location.origin,
          });
        } catch {
          // Ignore abort
        }
      } else {
        navigator.clipboard.writeText(window.location.origin);
        setShared(true);
        setTimeout(() => setShared(false), 2500);
      }
    }
  };

  return (
    <section id="get-involved" className="py-20 md:py-28 bg-[#F1F8E9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-dark tracking-tight mb-4 relative inline-block">
            Get Involved
            <span className="block w-16 h-1 bg-primary mx-auto mt-3 rounded-full"></span>
          </h2>
          <p className="text-lg text-text-light max-w-2xl mx-auto">
            Join us in our noble mission to protect and serve Gau Mata
          </p>
        </div>

        {/* 3 Involvement Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Donate Card */}
          <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-center flex flex-col items-center justify-between border border-gray-100">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center mb-6 text-white shadow-md">
                <HeartHandshake className="w-11 h-11" />
              </div>
              <h3 className="text-2xl font-bold text-text-dark mb-3">Donate</h3>
              <p className="text-text-light text-base mb-8 leading-relaxed">
                Your contributions help us provide food, shelter, and medical
                care for cows.
              </p>
            </div>
            <Link
              href="#contact"
              className="w-full py-3 px-6 bg-primary text-white font-semibold rounded-full hover:bg-primary-dark shadow-md hover:shadow-lg transition-all duration-200"
            >
              Contact Us
            </Link>
          </div>

          {/* Volunteer Card */}
          <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-center flex flex-col items-center justify-between border border-gray-100">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center mb-6 text-white shadow-md">
                <Users2 className="w-11 h-11" />
              </div>
              <h3 className="text-2xl font-bold text-text-dark mb-3">Volunteer</h3>
              <p className="text-text-light text-base mb-8 leading-relaxed">
                Be a part of our Gau Seva family by volunteering at our gaushala.
              </p>
            </div>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSeJe1akyU-O0LiwfF9MVKRlxMVgJ5G6HQE4vbz66enON5P5yQ/viewform?usp=dialog"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-6 bg-transparent border-2 border-primary text-primary font-semibold rounded-full hover:bg-primary hover:text-white transition-all duration-200"
            >
              Join Us
            </a>
          </div>

          {/* Spread Awareness Card */}
          <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-center flex flex-col items-center justify-between border border-gray-100">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center mb-6 text-white shadow-md">
                <Megaphone className="w-11 h-11" />
              </div>
              <h3 className="text-2xl font-bold text-text-dark mb-3">
                Spread Awareness
              </h3>
              <p className="text-text-light text-base mb-8 leading-relaxed">
                Share our mission with your community to inspire others to
                support cow welfare.
              </p>
            </div>
            <button
              type="button"
              onClick={handleShare}
              className="w-full py-3 px-6 bg-transparent border-2 border-primary text-primary font-semibold rounded-full hover:bg-primary hover:text-white transition-all duration-200 cursor-pointer"
            >
              {shared ? "Link Copied!" : "Share"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
