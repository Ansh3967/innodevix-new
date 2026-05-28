import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import ProjectsShowcase from "@/components/ProjectsShowcase";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <CustomCursor />
      <Navbar />
      <Hero />
      <Services />
      <About />
      <ProjectsShowcase />
      <ContactForm />
      <Footer />
    </main>
  );
};

export default Index;
