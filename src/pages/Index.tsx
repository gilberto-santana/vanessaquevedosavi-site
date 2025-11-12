import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Symptoms } from "@/components/Symptoms";
import { Results } from "@/components/Results";
import { Courses } from "@/components/Courses";
import { About } from "@/components/About";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Symptoms />
      <Results />
      <Courses />
      <About />
      <Testimonials />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Index;
