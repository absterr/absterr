import About from "./About";
import Footer from "./Footer";
import Hero from "./Hero";
import Contact from "./_Contact";
import Navbar from "./_Navbar";
import Projects from "./_Projects";

const Page = () => {
  return (
    <>
      <div className="flex justify-center">
        <Navbar />
      </div>

      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default Page;
