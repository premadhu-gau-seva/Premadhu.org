import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Mission from "@/components/Mission";
import Work from "@/components/Work";
import GetInvolved from "@/components/GetInvolved";
import Contact from "@/components/Contact";
import Feedback from "@/components/Feedback";
import Team from "@/components/Team";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <About />
        <Mission />
        <Work />
        <GetInvolved />
        <Contact />
        <Feedback />
        <Team />
      </main>
      <Footer />
    </div>
  );
}
