import React, { useState, useEffect, useRef } from "react";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { motion, useAnimation, useScroll, useTransform } from "framer-motion";
import { SectionWrapper } from "../hoc";

// Separate component for mouse-dependent effects
const MouseGlowEffect = ({ children }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const glowAnimation = useAnimation();
  const scrollIndicatorRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (event) => {
      requestAnimationFrame(() => {
        setMousePosition({ x: event.clientX, y: event.clientY });
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    if (scrollIndicatorRef.current) {
      const rect = scrollIndicatorRef.current.getBoundingClientRect();
      const indicatorCenter = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };

      const distance = Math.sqrt(
        Math.pow(mousePosition.x - indicatorCenter.x, 2) +
          Math.pow(mousePosition.y - indicatorCenter.y, 2)
      );

      const maxDistance = 300;
      const intensity = Math.max(0, 1 - distance / maxDistance);

      glowAnimation.start({
        boxShadow: `0 0 ${15 + intensity * 25}px ${
          5 + intensity * 15
        }px rgba(147, 51, 234, ${0.5 + intensity * 0.5})`,
        transition: { duration: 0.2 },
      });
    }
  }, [mousePosition, glowAnimation]);

  return React.cloneElement(children, {
    ref: scrollIndicatorRef,
    animate: glowAnimation,
  });
};

export default function Typewriter() {
  const [showDynamicText, setShowDynamicText] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  const [staticText] = useTypewriter({
    words: ["Designing And Building The Next Generation Of"],
    loop: 1,
    typeSpeed: 100,
    deleteSpeed: 80,
    onLoopDone: () => setShowDynamicText(true),
  });

  const [dynamicText] = useTypewriter({
    words: ["", "Websites", "Mobile Apps", "Digital Experiences"],
    loop: {},
    typeSpeed: 100,
    deleteSpeed: 80,
  });

  const handleSmoothScroll = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleWheelScroll = (event) => {
      const aboutSection = document.getElementById("about");
      if (event.deltaY > 0 && window.scrollY === 0 && aboutSection) {
        event.preventDefault();
        handleSmoothScroll();
      }
    };

    window.addEventListener("wheel", handleWheelScroll, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheelScroll);
    };
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className="flex flex-col items-center justify-center min-h-screen relative"
      style={{ opacity, scale }}
    >
      <motion.div className="flex items-center space-x-8 z-20 relative w-full px-4 md:px-0">
        <div className="text-center w-full">
          <h1 className="text-4xl md:text-7xl lg:text-8xl font-light transition-all duration-300 ease-in-out">
            <span className="md:leading-tight">{staticText}</span>
            <br />
            {showDynamicText && (
              <span
                className="font-bold text-green-500 inline-block md:mt-4 transition-all duration-300 ease-in-out"
                style={{ width: "15ch", whiteSpace: "nowrap" }}
              >
                {dynamicText}
                <Cursor />
              </span>
            )}
          </h1>
        </div>
      </motion.div>

      <motion.div className="absolute bottom-[20%] md:bottom-[15%] w-full flex flex-col items-center z-30">
        <p className="text-base md:text-xl font-bold mb-6 block md:hidden">
          Explore how we can
          <br />
          transform your business today
        </p>
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <a onClick={handleSmoothScroll} className="relative cursor-pointer">
            <MouseGlowEffect>
              <motion.div
                className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-purple-500 flex justify-center items-center cursor-pointer transition-all duration-300 ease-in-out"
                whileHover={{ scale: 1.1 }}
                style={{ boxShadow: "0 0 30px 15px rgba(255, 255, 255, 0.8)" }}
              >
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white md:w-8 md:h-8"
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </motion.svg>
              </motion.div>
            </MouseGlowEffect>
          </a>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
