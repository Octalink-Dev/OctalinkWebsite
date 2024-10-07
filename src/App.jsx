import React from "react";

// Import components
import Header from "./components/Header";
import Typewriter from "./components/Typewriter";
import About from "./components/About";
import BentoBoxWebsite from "./components/BentoBoxWebsite";
import BentoBoxApp from "./components/BentoBoxApp";
import Contact from "./components/Contact";
import StarsCanvas from "./components/Stars";
import ButtonGradient from "./assets/svg/ButtonGradient";
import Pricing from "./components/Pricing";

// Define sections and gradients with an improved color scheme
const SECTIONS = [
  {
    id: "typewriter",
    gradient:
      "bg-gradient-to-b from-black from-40% via-gray-950 via-60% to-sky-900 to-95% ",
    Component: Typewriter,
  },
  {
    id: "about",
    gradient: "bg-gradient-to-b from-sky-900 to-gray-600",
    Component: About,
  },
  {
    id: "BentoBoxWebsite",
    gradient: "bg-gradient-to-b from-gray-600   to-gray-800",
    Component: BentoBoxWebsite,
  },
  {
    id: "bentobox",
    gradient: "bg-gradient-to-b from-gray-800 to-gray-900",
    Component: BentoBoxApp,
  },
  {
    id: "pricing",
    gradient: "bg-gradient-to-b from-gray-900 to-black",
    Component: Pricing,
  },
  {
    id: "contact",
    gradient: "bg-gradient-to-b from-gray-900 to-black",
    Component: Contact,
  },
];
const Section = ({ section, children }) => {
  return (
    <section
      id={section.id}
      className={`min-h-16 ${section.gradient} flex items-center justify-center relative`}
    >
      {children}
    </section>
  );
};

const App = () => {
  return (
    <div className="text-white relative">
      <Header />

      {/* StarsCanvas positioned above gradients */}
      <div className="fixed inset-0 z-10 pointer-events-none">
        <StarsCanvas />
      </div>

      {SECTIONS.map((section) => (
        <Section key={section.id} section={section}>
          <div className="relative z-20 w-full h-full">
            {section.id === "typewriter" && (
              <div className="relative w-full h-full">
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle at center top, rgba(139, 92, 246, 0.15), transparent 0%)",
                  }}
                />
                <Typewriter />
              </div>
            )}
            {section.id === "about" && <About />}
            {section.id === "BentoBoxWebsite" && <BentoBoxWebsite />}
            {section.id === "bentobox" && <BentoBoxApp />}
            {section.id === "pricing" && <Pricing />}
            {section.id === "contact" && <Contact />}
          </div>
        </Section>
      ))}

      <ButtonGradient />
    </div>
  );
};

export default App;
