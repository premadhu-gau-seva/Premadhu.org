"use client";

import Image from "next/image";
import { HeartHandshake, Users2, Megaphone, Copy, Check, X } from "lucide-react";
import { useState } from "react";

const UPI_ID = "UJJ83981823963@Ujjivan";

export default function GetInvolved() {
  const [shared, setShared] = useState(false);
  const [isDonateExpanded, setIsDonateExpanded] = useState(false);
  const [copiedUpi, setCopiedUpi] = useState(false);

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

  const handleCopyUpi = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window !== "undefined") {
      try {
        await navigator.clipboard.writeText(UPI_ID);
        setCopiedUpi(true);
        setTimeout(() => setCopiedUpi(false), 2000);
      } catch {
        const textarea = document.createElement("textarea");
        textarea.value = UPI_ID;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        setCopiedUpi(true);
        setTimeout(() => setCopiedUpi(false), 2000);
      }
    }
  };

  const toggleDonate = () => {
    setIsDonateExpanded((prev) => !prev);
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Donate Card */}
          <div
            onClick={toggleDonate}
            onKeyDown={(e) => {
              if (
                (e.key === "Enter" || e.key === " ") &&
                e.target === e.currentTarget
              ) {
                e.preventDefault();
                toggleDonate();
              }
            }}
            tabIndex={0}
            role="region"
            aria-label="Donation information"
            className={`bg-white p-8 sm:p-10 rounded-2xl shadow-md transition-all duration-300 text-center flex flex-col items-center justify-between border border-gray-100 relative cursor-pointer ${
              isDonateExpanded
                ? "shadow-2xl ring-2 ring-primary/20"
                : "hover:shadow-2xl hover:-translate-y-2"
            }`}
          >
            {/* Close button when expanded */}
            {isDonateExpanded && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDonateExpanded(false);
                }}
                className="absolute top-4 right-4 p-1.5 rounded-full text-text-light hover:text-text-dark hover:bg-gray-100 transition-colors cursor-pointer"
                aria-label="Close donation details"
              >
                <X className="w-5 h-5" />
              </button>
            )}

            <div className="flex flex-col items-center w-full">
              <div className="w-24 h-24 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center mb-6 text-white shadow-md flex-shrink-0">
                <HeartHandshake className="w-11 h-11" />
              </div>
              <h3 className="text-2xl font-bold text-text-dark mb-3">Donate</h3>
              <p className="text-text-light text-base mb-6 leading-relaxed">
                Your contributions help us provide food, shelter, and medical
                care for cows.
              </p>

              {/* Expandable Details */}
              <div
                id="donate-qr-details"
                className={`w-full grid transition-all duration-300 ease-in-out ${
                  isDonateExpanded
                    ? "grid-rows-[1fr] opacity-100 mb-6"
                    : "grid-rows-[0fr] opacity-0 mb-0 pointer-events-none"
                }`}
              >
                <div className="overflow-hidden">
                  <div
                    className="pt-2 flex flex-col items-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* QR Code Container */}
                    <div className="relative w-48 h-48 sm:w-52 sm:h-52 p-2 bg-white rounded-xl border border-gray-200 shadow-sm flex items-center justify-center mb-2">
                      <Image
                        src="/donate-qr.png"
                        alt="Scan QR code to donate to Premadhu Gau Seva Samiti"
                        width={200}
                        height={200}
                        className="w-full h-full object-contain rounded-lg"
                      />
                    </div>
                    <p className="text-xs text-text-light mb-4">
                      Scan with any UPI app (GPay, PhonePe, Paytm)
                    </p>

                    {/* UPI ID Box with Copy Button */}
                    <div className="w-full bg-[#F1F8E9] p-3 rounded-xl border border-primary/20 flex items-center justify-between gap-2">
                      <div className="text-left overflow-hidden min-w-0">
                        <span className="text-[11px] font-semibold text-text-light uppercase tracking-wider block">
                          UPI ID
                        </span>
                        <span className="text-xs sm:text-sm font-semibold text-text-dark select-all truncate block font-mono">
                          {UPI_ID}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={handleCopyUpi}
                        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 shadow-sm flex-shrink-0 cursor-pointer ${
                          copiedUpi
                            ? "bg-primary text-white border border-primary"
                            : "bg-white text-primary border border-primary/30 hover:bg-primary hover:text-white"
                        }`}
                        aria-label="Copy UPI ID"
                      >
                        {copiedUpi ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              aria-expanded={isDonateExpanded}
              aria-controls="donate-qr-details"
              onClick={(e) => {
                e.stopPropagation();
                toggleDonate();
              }}
              className="w-full py-3 px-6 bg-primary text-white font-semibold rounded-full hover:bg-primary-dark shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
            >
              {isDonateExpanded ? "Close" : "Donate"}
            </button>
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

