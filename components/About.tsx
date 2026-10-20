import { sql, AboutPhoto, DEFAULT_ABOUT_PHOTOS, ensureAboutPhotosTable } from "@/lib/db";
import AboutImageCarousel from "@/components/AboutImageCarousel";

export default async function About() {
  const stats = [
    { count: "500+", label: "Cows Protected" },
    { count: "50+", label: "Lives Touched" },
    { count: "1+", label: "Years of Service" },
  ];

  let photos: AboutPhoto[] = [];
  try {
    await ensureAboutPhotosTable();
    const result = await sql<AboutPhoto>`
      SELECT id, url, caption, sort_order, created_at
      FROM about_photos
      ORDER BY sort_order ASC, id ASC
    `;
    if (result && result.rows && result.rows.length > 0) {
      photos = result.rows;
    }
  } catch (err) {
    console.error("Error fetching about photos from database:", err);
  }

  const displayPhotos = photos.length > 0 ? photos : DEFAULT_ABOUT_PHOTOS;

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

          {/* Right Column: Interactive Photo Carousel */}
          <div className="lg:col-span-5">
            <AboutImageCarousel initialPhotos={displayPhotos} />
          </div>
        </div>
      </div>
    </section>
  );
}
