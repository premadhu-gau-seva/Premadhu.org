export default function Mission() {
  return (
    <section id="mission" className="py-20 md:py-28 bg-[#F1F8E9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-dark tracking-tight mb-4 relative inline-block">
            Our Mission
            <span className="block w-16 h-1 bg-primary mx-auto mt-3 rounded-full"></span>
          </h2>
          <p className="text-lg text-text-light max-w-2xl mx-auto">
            Protecting and serving Gau Mata with compassion
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Mission Text */}
          <div className="lg:col-span-6 space-y-6">
            <p className="text-base sm:text-lg text-text-light leading-relaxed">
              At Premadhu Gau Seva Samiti, we are dedicated to the protection,
              care, and welfare of cows, revered as Gau Mata in our culture.
              Inspired by the teachings of compassion and service, our mission is
              to provide shelter, nourishment, and medical care to stray,
              abandoned, and injured cows, ensuring they live with dignity and
              respect.
            </p>
            <p className="text-base sm:text-lg text-text-light leading-relaxed">
              We aim to promote sustainable practices and raise awareness about the
              ecological and spiritual significance of cows in our society and
              environment.
            </p>
          </div>

          {/* Why Gau Seva Card */}
          <div className="lg:col-span-6">
            <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-lg border border-primary/10 hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
                Why Gau Seva?
              </h3>
              <p className="text-base sm:text-lg text-text-light leading-relaxed">
                In Indian tradition, cows are considered the embodiment of
                Kamadhenu, the divine cow of plenty. They symbolize gentleness,
                nurturing, and selfless service. By serving Gau Mata, we honor our
                cultural heritage and contribute to environmental sustainability
                through organic farming and natural resource utilization.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
