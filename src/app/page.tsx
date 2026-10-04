import AssistantWidget from "@/components/AssistantWidget";
import Navbar from "@/components/Navbar";
import Contact from "./_Contact";
import Hero from "./_Hero";
import About from "./About";
import Projects from "./Projects";
import Services from "./Services";

export default function Home() {
  return (
    <>
      <div className="dot-grid-bg" aria-hidden="true" />
      <Navbar />
      <main className="font-mono">
        <Hero />
        <About />
        <Services />
        <Projects />
        <Contact />
      </main>
      <AssistantWidget />
    </>
  );
}
