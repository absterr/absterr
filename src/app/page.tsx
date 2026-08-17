import About from "./About";
import Contact from "./_Contact";
import Hero from "./_Hero";
import Services from "./Services";

export default function Home() {
  return (
    <main className="font-mono">
      <Hero />
      <About />
      <Services />
      <Contact />
    </main>
  );
}
