import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import EventDetails from "@/components/EventDetails";
import Schedule from "@/components/Schedule";
import RegistrationCTA from "@/components/RegistrationCTA";
import FAQ from "@/components/FAQ";
import PeopleBehind from "@/components/PeopleBehind";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="scroll-smooth">
        <Hero />
        <AboutSection />
        <EventDetails />
        <Schedule />
        <RegistrationCTA />
        <FAQ />
        <PeopleBehind />
        <Footer />
      </main>
    </>
  );
}
