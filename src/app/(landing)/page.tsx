import Hero from "@/components/landing/Hero";
import IncomeTaxSection from "@/components/landing/IncomeTaxSection";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/shared/Footer";


const LandingPage = () => {
  return <main>
    <Navbar />
    <Hero />
    <IncomeTaxSection />
    <Footer />
  </main>;
};

export default LandingPage;
