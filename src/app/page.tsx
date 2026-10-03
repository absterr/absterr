import Contact from "./_Contact";
import Hero from "./_Hero";
import About from "./About";
import Projects from "./Projects";
import Services from "./Services";

export default function Home() {
  return (
    <main className="font-mono">
      <Hero />
      <About />
      <Services />
      <Projects />
      <Contact />
    </main>
  );
}
