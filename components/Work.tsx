import { ShieldPlus, Stethoscope, Sprout, Users } from "lucide-react";

export default function Work() {
  const workItems = [
    {
      icon: ShieldPlus,
      title: "Rescue and Rehabilitation",
      description:
        "We rescue abandoned, injured, or sick cows and provide them with proper care and rehabilitation in our gaushala.",
    },
    {
      icon: Stethoscope,
      title: "Medical Care",
      description:
        "Our team ensures timely medical treatment for injured and ailing cows with veterinary support.",
    },
    {
      icon: Sprout,
      title: "Organic Farming",
      description:
        "We promote eco-friendly farming by utilizing cow dung and urine for organic fertilizers and natural products.",
    },
    {
      icon: Users,
      title: "Community Outreach",
      description:
        "We organize awareness programs, health camps, and educational initiatives to highlight the importance of cow protection.",
    },
  ];

  return (
    <section id="work" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-dark tracking-tight mb-4 relative inline-block">
            Our Work
            <span className="block w-16 h-1 bg-primary mx-auto mt-3 rounded-full"></span>
          </h2>
          <p className="text-lg text-text-light max-w-2xl mx-auto">
            Comprehensive care and community service
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {workItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white p-8 rounded-2xl border border-gray-200 hover:border-primary text-center hover:-translate-y-2 hover:shadow-xl transition-all duration-300 flex flex-col items-center group"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mb-6 text-white shadow-md group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-9 h-9" />
                </div>
                <h3 className="text-xl font-bold text-text-dark mb-3">
                  {item.title}
                </h3>
                <p className="text-text-light text-sm sm:text-base leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
