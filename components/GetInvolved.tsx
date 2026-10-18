"use client";

import Image from "next/image";
import {
  HeartHandshake,
  Users2,
  Megaphone,
  Copy,
  Check,
  X,
  Share2,
  MapPin,
  Globe,
  ExternalLink,
} from "lucide-react";
import { useState, useEffect } from "react";

const UPI_ID = "UJJ83981823963@Ujjivan";
const VOLUNTEER_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSeJe1akyU-O0LiwfF9MVKRlxMVgJ5G6HQE4vbz66enON5P5yQ/viewform?usp=dialog";
const WEBSITE_URL = "https://premadhu.org";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export default function GetInvolved() {
  const [isDonateExpanded, setIsDonateExpanded] = useState(false);
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [copiedShareLink, setCopiedShareLink] = useState(false);
  const [copiedWebsite, setCopiedWebsite] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsShareModalOpen(false);
      }
    };
    if (isShareModalOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isShareModalOpen]);

  const shareWhatsAppText = `आप भी गौ सेवा का हिस्सा बन सकते हैं:
🙏 हमारे मिशन के बारे में अपने परिवार और दोस्तों को बताएं
📲 हमारी पोस्ट और वीडियो अपने WhatsApp, Instagram और Facebook पर शेयर करें
🐄 जरूरतमंद गौवंश दिखाई देने पर जिम्मेदारी से सहायता की पहल करें
🤝 गौशाला में Volunteer के रूप में अपना समय दें
🌿 गौ संरक्षण और प्राकृतिक/जैविक जीवनशैली के प्रति जागरूकता फैलाएं
❤️ भोजन, चिकित्सा एवं देखभाल के लिए सहयोग करें

आपका एक Share किसी नए व्यक्ति तक गौ सेवा का संदेश पहुंचा सकता है।
आइए, मिलकर एक ऐसा समाज बनाएं जहाँ कोई भी बेसहारा गौवंश भूखा, घायल या असहाय न रहे।

🐄 Premadhu Gau Seva Samiti
सेवा • संरक्षण • करुणा
📍 Gandhi Chowk, Parasram kund, Ranjhi, Jabalpur
🌐 ${WEBSITE_URL}`;

  const handleNativeShareOrCopy = async () => {
    if (typeof window !== "undefined") {
      const currentUrl = window.location.origin || WEBSITE_URL;
      if (navigator.share) {
        try {
          await navigator.share({
            title: "Premadhu Gau Seva Samiti",
            text: "आप भी गौ सेवा का हिस्सा बन सकते हैं - Premadhu Gau Seva Samiti",
            url: currentUrl,
          });
          return;
        } catch {
          // Fallback to copy if aborted or unsupported
        }
      }
      try {
        await navigator.clipboard.writeText(shareWhatsAppText);
        setCopiedShareLink(true);
        setTimeout(() => setCopiedShareLink(false), 2500);
      } catch {
        const textarea = document.createElement("textarea");
        textarea.value = shareWhatsAppText;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        setCopiedShareLink(true);
        setTimeout(() => setCopiedShareLink(false), 2500);
      }
    }
  };

  const handleCopyWebsite = async () => {
    if (typeof window !== "undefined") {
      try {
        await navigator.clipboard.writeText(WEBSITE_URL);
        setCopiedWebsite(true);
        setTimeout(() => setCopiedWebsite(false), 2000);
      } catch {
        const textarea = document.createElement("textarea");
        textarea.value = WEBSITE_URL;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        setCopiedWebsite(true);
        setTimeout(() => setCopiedWebsite(false), 2000);
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
        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-8 ${
            isDonateExpanded ? "md:items-start" : "items-stretch"
          }`}
        >
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
            className={`bg-white p-8 sm:p-10 rounded-2xl shadow-md transition-all duration-300 text-center flex flex-col items-center justify-between border border-gray-100 relative cursor-pointer h-full ${
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
              <h3 className="text-2xl font-bold text-text-dark mb-3 min-h-[2rem] md:min-h-[3.5rem] flex items-center justify-center">
                Donate
              </h3>
              <p className="text-text-light text-base mb-8 leading-relaxed min-h-[3rem] sm:min-h-[4rem] flex items-center justify-center">
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
          <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-center flex flex-col items-center justify-between border border-gray-100 h-full">
            <div className="flex flex-col items-center w-full">
              <div className="w-24 h-24 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center mb-6 text-white shadow-md flex-shrink-0">
                <Users2 className="w-11 h-11" />
              </div>
              <h3 className="text-2xl font-bold text-text-dark mb-3 min-h-[2rem] md:min-h-[3.5rem] flex items-center justify-center">
                Volunteer
              </h3>
              <p className="text-text-light text-base mb-8 leading-relaxed min-h-[3rem] sm:min-h-[4rem] flex items-center justify-center">
                Be a part of our Gau Seva family by volunteering at our gaushala.
              </p>
            </div>
            <a
              href={VOLUNTEER_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-6 bg-transparent border-2 border-primary text-primary font-semibold rounded-full hover:bg-primary hover:text-white transition-all duration-200 flex items-center justify-center"
            >
              Join Us
            </a>
          </div>

          {/* Spread Awareness Card */}
          <div
            onClick={() => setIsShareModalOpen(true)}
            onKeyDown={(e) => {
              if (
                (e.key === "Enter" || e.key === " ") &&
                e.target === e.currentTarget
              ) {
                e.preventDefault();
                setIsShareModalOpen(true);
              }
            }}
            tabIndex={0}
            role="button"
            aria-label="Spread awareness and share details"
            className="bg-white p-8 sm:p-10 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-center flex flex-col items-center justify-between border border-gray-100 h-full cursor-pointer"
          >
            <div className="flex flex-col items-center w-full">
              <div className="w-24 h-24 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center mb-6 text-white shadow-md flex-shrink-0">
                <Megaphone className="w-11 h-11" />
              </div>
              <h3 className="text-2xl font-bold text-text-dark mb-3 min-h-[2rem] md:min-h-[3.5rem] flex items-center justify-center">
                Spread Awareness
              </h3>
              <p className="text-text-light text-base mb-8 leading-relaxed min-h-[3rem] sm:min-h-[4rem] flex items-center justify-center">
                Share our mission with your community to inspire support for
                cow welfare.
              </p>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsShareModalOpen(true);
              }}
              className="w-full py-3 px-6 bg-transparent border-2 border-primary text-primary font-semibold rounded-full hover:bg-primary hover:text-white transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Spread Awareness & Share Details Modal */}
      {isShareModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="share-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsShareModalOpen(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100 p-6 sm:p-8 relative text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsShareModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-text-light hover:text-text-dark hover:bg-gray-100 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Badge & Title */}
            <div className="flex items-center gap-3 mb-5 pr-10">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent to-primary flex items-center justify-center text-white shadow-md flex-shrink-0">
                <Megaphone className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-semibold text-primary uppercase tracking-wider block">
                  Spread Awareness • जागरूकता फैलाएं
                </span>
                <h3
                  id="share-modal-title"
                  className="text-xl sm:text-2xl font-bold text-text-dark"
                >
                  आप भी गौ सेवा का हिस्सा बन सकते हैं:
                </h3>
              </div>
            </div>

            {/* Bullet Points */}
            <div className="space-y-3 mb-6 bg-[#F9FBF7] p-4 sm:p-5 rounded-2xl border border-primary/20">
              <div className="flex items-start gap-3">
                <span className="text-xl flex-shrink-0 leading-none mt-0.5">🙏</span>
                <p className="text-sm sm:text-base text-text-dark font-medium leading-relaxed">
                  हमारे मिशन के बारे में अपने परिवार और दोस्तों को बताएं
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xl flex-shrink-0 leading-none mt-0.5">📲</span>
                <p className="text-sm sm:text-base text-text-dark font-medium leading-relaxed">
                  हमारी पोस्ट और वीडियो अपने WhatsApp, Instagram और Facebook पर शेयर करें
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xl flex-shrink-0 leading-none mt-0.5">🐄</span>
                <p className="text-sm sm:text-base text-text-dark font-medium leading-relaxed">
                  जरूरतमंद गौवंश दिखाई देने पर जिम्मेदारी से सहायता की पहल करें
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xl flex-shrink-0 leading-none mt-0.5">🤝</span>
                <p className="text-sm sm:text-base text-text-dark font-medium leading-relaxed">
                  गौशाला में Volunteer के रूप में अपना समय दें
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xl flex-shrink-0 leading-none mt-0.5">🌿</span>
                <p className="text-sm sm:text-base text-text-dark font-medium leading-relaxed">
                  गौ संरक्षण और प्राकृतिक/जैविक जीवनशैली के प्रति जागरूकता फैलाएं
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xl flex-shrink-0 leading-none mt-0.5">❤️</span>
                <p className="text-sm sm:text-base text-text-dark font-medium leading-relaxed">
                  भोजन, चिकित्सा एवं देखभाल के लिए सहयोग करें
                </p>
              </div>
            </div>

            {/* Message Quote Block */}
            <div className="bg-[#F1F8E9] border-l-4 border-primary p-4 rounded-r-xl mb-6 text-text-dark">
              <p className="font-semibold text-sm sm:text-base text-text-dark mb-1 leading-snug">
                आपका एक Share किसी नए व्यक्ति तक गौ सेवा का संदेश पहुंचा सकता है।
              </p>
              <p className="text-xs sm:text-sm text-text-light leading-relaxed">
                आइए, मिलकर एक ऐसा समाज बनाएं जहाँ कोई भी बेसहारा गौवंश भूखा, घायल या असहाय न रहे।
              </p>
            </div>

            {/* Share & Spread Awareness Buttons */}
            <div className="mb-6">
              <h4 className="text-xs sm:text-sm font-bold text-text-dark uppercase tracking-wider mb-3 flex items-center gap-2">
                <Share2 className="w-4 h-4 text-primary" />
                <span>Share &amp; Spread Awareness</span>
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-3">
                {/* WhatsApp */}
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareWhatsAppText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-3 py-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-xl text-xs sm:text-sm font-semibold shadow-sm hover:shadow transition-all hover:-translate-y-0.5"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-current" />
                  <span>WhatsApp</span>
                </a>

                {/* Facebook */}
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(WEBSITE_URL)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-3 py-2.5 bg-[#1877F2] hover:bg-[#166FE5] text-white rounded-xl text-xs sm:text-sm font-semibold shadow-sm hover:shadow transition-all hover:-translate-y-0.5"
                >
                  <FacebookIcon className="w-4 h-4 fill-current" />
                  <span>Facebook</span>
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/premadhu_2024/?utm_source=ig_web_button_share_sheet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-3 py-2.5 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-95 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-sm hover:shadow transition-all hover:-translate-y-0.5"
                >
                  <InstagramIcon className="w-4 h-4 fill-current" />
                  <span>Instagram</span>
                </a>

                {/* YouTube */}
                <a
                  href="https://www.youtube.com/channel/UCV1XYch4XPD1P7nTtQ9tIbw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-3 py-2.5 bg-[#FF0000] hover:bg-[#E60000] text-white rounded-xl text-xs sm:text-sm font-semibold shadow-sm hover:shadow transition-all hover:-translate-y-0.5"
                >
                  <YouTubeIcon className="w-4 h-4 fill-current" />
                  <span>YouTube</span>
                </a>
              </div>

              {/* Native Share & Copy Message Button */}
              <button
                type="button"
                onClick={handleNativeShareOrCopy}
                className="w-full py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-text-dark rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                {copiedShareLink ? (
                  <>
                    <Check className="w-4 h-4 text-primary" />
                    <span className="text-primary font-bold">Message &amp; Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4 text-text-light" />
                    <span>Copy Awareness Message &amp; Website Link</span>
                  </>
                )}
              </button>
            </div>

            {/* Volunteer Box */}
            <div className="bg-[#F1F8E9] p-4 sm:p-5 rounded-2xl border border-primary/20 mb-6">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xl">🤝</span>
                <h4 className="text-base sm:text-lg font-bold text-text-dark">
                  Make a Volunteer
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-text-light mb-4 leading-relaxed">
                गौ सेवा से जुड़ें और अपना समय, हुनर और सहयोग जरूरतमंद गौवंश के लिए समर्पित करें।
              </p>
              <a
                href={VOLUNTEER_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-2.5 bg-primary text-white font-semibold text-sm rounded-full hover:bg-primary-dark shadow-md hover:shadow-lg transition-all"
              >
                <span>Become a Volunteer</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Samiti Details Footer */}
            <div className="border-t border-gray-100 pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs sm:text-sm">
              <div>
                <p className="font-bold text-text-dark flex items-center gap-1.5">
                  <span>🐄</span> Premadhu Gau Seva Samiti
                </p>
                <p className="text-xs text-primary font-semibold mb-1">
                  सेवा • संरक्षण • करुणा
                </p>
                <p className="flex items-center gap-1 text-xs text-text-light">
                  <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  Gandhi Chowk, Parasram kund, Ranjhi, Jabalpur
                </p>
              </div>

              {/* Website with Copy Icon */}
              <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-3 py-2 rounded-xl">
                <Globe className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="font-mono text-xs text-text-dark">premadhu.org</span>
                <button
                  type="button"
                  onClick={handleCopyWebsite}
                  className="p-1 hover:bg-white rounded text-text-light hover:text-primary transition-colors cursor-pointer"
                  title="Copy website link"
                  aria-label="Copy website link"
                >
                  {copiedWebsite ? (
                    <Check className="w-3.5 h-3.5 text-primary" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

