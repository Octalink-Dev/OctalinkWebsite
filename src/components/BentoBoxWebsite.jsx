import React, { useRef, useState, useEffect } from "react";
import {
  Star,
  GitBranch,
  KeyRound,
  RefreshCw,
  Gift,
  Image,
  FileText,
  MonitorPlay,
} from "lucide-react";
import { motion, useAnimation, useScroll, useTransform } from "framer-motion";

const AnimatedBox = ({ children, direction }) => {
  const boxRef = useRef(null);
  const controls = useAnimation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (boxRef.current) {
      observer.observe(boxRef.current);
    }

    return () => {
      if (boxRef.current) {
        observer.unobserve(boxRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isVisible, controls]);

  const variants = {
    hidden: {
      x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 30,
        stiffness: 200,
      },
    },
  };

  return (
    <motion.div
      ref={boxRef}
      initial="hidden"
      animate={controls}
      variants={variants}
      className="overflow-hidden"
    >
      {children}
    </motion.div>
  );
};

const AnimatedSection = ({ children }) => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.75, 1],
    [0, 1, 1, 0]
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.25, 0.75, 1],
    [0.8, 1, 1, 0.8]
  );

  return (
    <motion.div
      ref={sectionRef}
      style={{ opacity, scale }}
      className="overflow-hidden"
    >
      {children}
    </motion.div>
  );
};

const BentoBoxWebsite = () => {
  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
      {/* Left column */}
      <div className="space-y-4 sm:space-y-6">
        <AnimatedBox direction="left">
          <div className="bg-gray-800 p-4 sm:p-6 rounded-lg">
            <h2 className="text-xl sm:text-2xl font-bold">
              Effortless Prompt Perfection
            </h2>
            <p className="text-gray-400 mt-2">14 days trial</p>
            <p className="text-gray-400">after - $5/month</p>
          </div>
        </AnimatedBox>
        <AnimatedBox direction="left">
          <div className="bg-gray-800 p-4 sm:p-6 rounded-lg">
            <h2 className="text-orange-400 text-3xl sm:text-4xl font-bold">
              12K
            </h2>
            <p className="text-lg">happy users</p>
            <div className="flex mt-2 space-x-2">
              <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
              <div className="w-10 h-10 bg-orange-400 rounded-full"></div>
              <div className="w-10 h-10 bg-purple-400 rounded-full"></div>
            </div>
          </div>
        </AnimatedBox>
        <AnimatedBox direction="left">
          <button className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg flex items-center justify-center text-lg">
            <RefreshCw className="mr-2" size={24} />
            Generate
          </button>
        </AnimatedBox>
      </div>

      {/* Center column */}
      <AnimatedSection>
        <div className="bg-purple-600 rounded-lg p-6 sm:p-8 flex flex-col items-center justify-center text-center aspect-square">
          <img
            src="/api/placeholder/120/120"
            alt="PromptPal logo"
            className="w-24 h-24 sm:w-32 sm:h-32 mb-6"
          />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            More Than Just A Website
          </h1>
          <div className="relative w-48 h-48 sm:w-64 sm:h-64 mb-6">
            <div className="absolute inset-0 bg-purple-700 rounded-full flex items-center justify-center overflow-hidden">
              <MonitorPlay className="text-orange-400 absolute" size={200} />
            </div>
            <div className="absolute inset-0 border-4 border-purple-500 rounded-full"></div>
          </div>
          <p className="text-purple-200 text-lg">A Place To Call Home</p>
        </div>
      </AnimatedSection>

      {/* Right column */}
      <div className="space-y-4 sm:space-y-6">
        <AnimatedBox direction="right">
          <div className="bg-gray-800 p-4 sm:p-6 rounded-lg flex items-center justify-between">
            <Star className="text-orange-400" size={32} />
            <div className="w-16 h-8 bg-gray-700 rounded-full"></div>
          </div>
        </AnimatedBox>
        <AnimatedBox direction="right">
          <div className="bg-gray-800 p-4 sm:p-6 rounded-lg">
            <h2 className="text-purple-400 text-3xl sm:text-4xl font-bold">
              25M
            </h2>
            <p className="text-lg">created prompts</p>
          </div>
        </AnimatedBox>
        <AnimatedBox direction="right">
          <div className="bg-gray-800 p-4 sm:p-6 rounded-lg flex items-center">
            <GitBranch className="text-orange-400 mr-3" size={24} />
            <div>
              <h3 className="text-lg font-semibold">Branching paths</h3>
              <p className="text-gray-400">
                Explore multiple prompt directions with branching.
              </p>
            </div>
          </div>
        </AnimatedBox>
        <AnimatedBox direction="right">
          <div className="bg-gray-800 p-4 sm:p-6 rounded-lg flex items-center">
            <KeyRound className="text-purple-400 mr-3" size={24} />
            <div>
              <h3 className="text-lg font-semibold">Keyword enhancer</h3>
              <p className="text-gray-400">
                Boost your prompt precision with keywords.
              </p>
            </div>
          </div>
        </AnimatedBox>
        <AnimatedBox direction="right">
          <div className="bg-gray-800 p-4 sm:p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Prompt templates</h3>
            <p className="text-gray-400 mb-3">
              Use pre-made templates to jumpstart creativity.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-gray-700 text-white text-sm py-1 px-3 rounded">
                14 days trial
              </span>
              <span className="bg-gray-700 p-2 rounded">
                <RefreshCw size={20} className="text-purple-400" />
              </span>
              <span className="bg-gray-700 p-2 rounded">
                <Gift size={20} className="text-orange-400" />
              </span>
              <span className="bg-gray-700 p-2 rounded">
                <Image size={20} className="text-blue-400" />
              </span>
              <span className="bg-gray-700 p-2 rounded">
                <FileText size={20} className="text-green-400" />
              </span>
            </div>
          </div>
        </AnimatedBox>
      </div>
    </div>
  );
};

export default BentoBoxWebsite;
