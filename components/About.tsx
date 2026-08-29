import Image from "next/image";

export default function About() {
  const stats = [
    { count: "500+", label: "Cows Protected" },
    { count: "50+", label: "Lives Touched" },
    { count: "1+", label: "Years of Service" },
  ];

  return (
    <section id="about" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-dark tracking-tight mb-4 relative inline-block">
            About Us
            <span className="block w-16 h-1 bg-primary mx-auto mt-3 rounded-full"></span>
          </h2>
          <p className="text-lg text-text-light max-w-2xl mx-auto">
            Founded with a vision to serve and protect cows
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Text & Stats */}
          <div className="lg:col-span-7 space-y-6">
            <p className="text-base sm:text-lg text-text-light leading-relaxed">
              Founded with a vision to serve and protect cows, Premadhu Gau Seva
              Samiti is a non-profit organization committed to Gau Seva (cow
              service). Our gaushala provides a safe haven for cows, offering them
              fresh grass, clean water, nutritious feed, and medical attention.
            </p>
            <p className="text-base sm:text-lg text-text-light leading-relaxed">
              We also work to support local communities through education, organic
              farming initiatives, and sustainable dairy practices, honoring the
              sacred bond between humans and Gau Mata.
            </p>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100">
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center p-3 sm:p-4 rounded-xl bg-bg-light/60">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-1">
                    {stat.count}
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-text-light">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="lg:col-span-5">
            <div className="relative w-full h-80 sm:h-96 md:h-[420px] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group border border-gray-100">
              <Image
                src="/Cow.jpg"
                alt="Our Gaushala - Cows being cared for at Premadhu Gau Seva Samiti"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <p className="text-white text-sm font-medium">
                  Cows being cared for with love at Premadhu Gau Seva Samiti
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
