import Link from "next/link";
import { Heart } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-br from-[#F9FBE7] to-[#F1F8E9] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-text-dark tracking-tight leading-tight">
              Welcome to{" "}
              <span className="text-primary block sm:inline">
                Premadhu Gau Seva Samiti
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-text-light font-normal max-w-2xl mx-auto lg:mx-0">
              Dedicated to the protection, care, and welfare of Gau Mata
            </p>

            {/* Sanskrit Quote Box */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl border-l-4 border-primary shadow-md hover:shadow-lg transition-shadow max-w-2xl mx-auto lg:mx-0 text-left">
              <p className="text-lg sm:text-xl font-semibold text-primary mb-2">
                &quot;गाय सम्पूर्ण प्राणियों की माता है एवं सबको सुख देने वाली है।&quot;
              </p>
              <span className="text-sm sm:text-base text-text-light italic block">
                (The cow is the mother of all beings and brings happiness to everyone.)
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-2">
              <Link
                href="#get-involved"
                className="px-8 py-3.5 bg-primary text-white font-semibold rounded-full hover:bg-primary-dark shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
              >
                Get Involved
              </Link>
              <Link
                href="#about"
                className="px-8 py-3.5 bg-transparent border-2 border-primary text-primary font-semibold rounded-full hover:bg-primary hover:text-white hover:-translate-y-0.5 transition-all duration-200"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Right Column: Hero Card / Highlight */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-center border border-gray-100 flex flex-col items-center">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary animate-pulse">
                <Heart className="w-12 h-12 fill-primary text-primary" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-text-dark mb-3">
                Serving Gau Mata
              </h2>
              <p className="text-text-light text-base sm:text-lg">
                With compassion and dedication
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
