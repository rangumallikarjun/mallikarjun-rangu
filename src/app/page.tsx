import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GradientBlobBackground from "@/components/ui/GradientBlobBackground";
import ScrollProgressBar from "@/components/ui/ScrollProgressBar";
import PageLoader from "@/components/ui/PageLoader";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <PageLoader />
      <ScrollProgressBar />
      <GradientBlobBackground />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
