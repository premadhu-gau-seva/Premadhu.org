import { MapPin, Mail, Phone, Globe } from "lucide-react";

export default function Contact() {
  const contactDetails = [
    {
      icon: MapPin,
      title: "Address",
      content: (
        <>
          Premadhu Gau Seva Samiti
          <br />
          Gandhi chowk maneganw parsuram kund
          <br />
          Jabalpur, India
        </>
      ),
    },
    {
      icon: Mail,
      title: "Email",
      content: (
        <a
          href="mailto:Premadhu10@gmail.com"
          className="hover:text-primary transition-colors block"
        >
          Premadhu10@gmail.com
        </a>
      ),
    },
    {
      icon: Phone,
      title: "Phone",
      content: (
        <div className="space-y-1">
          <a
            href="tel:+919098924643"
            className="hover:text-primary transition-colors block"
          >
            +91-9098924643
          </a>
          <a
            href="tel:+919301642833"
            className="hover:text-primary transition-colors block"
          >
            +91-9301642833
          </a>
        </div>
      ),
    },
    {
      icon: Globe,
      title: "Website",
      content: (
        <a
          href="https://www.premadhu.org"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary transition-colors block"
        >
          www.premadhu.org
        </a>
      ),
    },
  ];

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-dark tracking-tight mb-4 relative inline-block">
            Contact Us
            <span className="block w-16 h-1 bg-primary mx-auto mt-3 rounded-full"></span>
          </h2>
          <p className="text-lg text-text-light max-w-2xl mx-auto">
            Get in touch with us to support Gau Seva
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {contactDetails.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-start p-6 rounded-2xl bg-bg-light/50 border border-gray-100 hover:border-primary/30 hover:shadow-md transition-all duration-200"
              >
                <div className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center mb-4 flex-shrink-0 shadow-sm">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-text-dark mb-2">
                  {item.title}
                </h3>
                <div className="text-text-light text-sm sm:text-base leading-relaxed">
                  {item.content}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
