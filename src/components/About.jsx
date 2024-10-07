import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useAnimation,
} from "framer-motion";
import { Tilt } from "react-tilt";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";

const TextCard = () => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: false, amount: 0.5 });
  const controls = useAnimation();

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["50%", "-50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.8, 1, 1, 0.8]
  );
  const rotate = useTransform(scrollYProgress, [0, 1], [10, -10]);

  const wordAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={cardRef}
      style={{ y, opacity, scale, rotate }}
      className="w-full max-w-4xl mx-auto mb-20"
    >
      <motion.div
        className="bg-gray-900 rounded-[30px] p-10 shadow-[0_0_30px_10px_rgba(233,100,255,0.3)]"
        initial={{ scale: 1 }}
        animate={isInView ? { scale: 1.03 } : { scale: 1 }}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {/* Rest of the TextCard content remains the same */}
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight text-center"
          initial="hidden"
          animate={controls}
          variants={{
            visible: {
              transition: { staggerChildren: 0.1, delayChildren: 0.3 },
            },
            hidden: {},
          }}
        >
          {["We", "are", "not", "just", "a"].map((word, index) => (
            <motion.span
              key={index}
              className="inline-block mx-1"
              variants={wordAnimation}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>
        <motion.h2
          className="text-3xl md:text-5xl font-semibold text-tertiary mb-6 italic text-center"
          initial="hidden"
          animate={controls}
          variants={{
            visible: {
              opacity: 1,
              scale: 1,
              transition: { duration: 0.8, delay: 1 },
            },
            hidden: { opacity: 0, scale: 0.5 },
          }}
        >
          full service digital agency
        </motion.h2>
        <motion.p
          className="text-2xl md:text-4xl font-medium text-white text-center"
          initial="hidden"
          animate={controls}
          variants={{
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, delay: 1.5 },
            },
            hidden: { opacity: 0, y: 20 },
          }}
        >
          We are{" "}
          <motion.span
            className="text-pink-400"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            partners
          </motion.span>{" "}
          in your journey
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

const ServiceCard = ({ index, title, icon, description }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const bounceVariants = {
    animate: {
      y: [0, -5, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      },
    },
  };

  const flipVariants = {
    front: { rotateY: 0 },
    back: { rotateY: 180 },
  };

  return (
    <motion.div
      variants={bounceVariants}
      animate="animate"
      className="w-[220px] h-[260px] cursor-pointer group"
      style={{ perspective: "1000px" }}
    >
      <Tilt
        options={{ max: 45, scale: 1, speed: 450 }}
        className="w-full h-full"
      >
        <motion.div
          className="w-full h-full relative [transform-style:preserve-3d] transition-all duration-500 group-hover:scale-105"
          animate={isFlipped ? "back" : "front"}
          variants={flipVariants}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          {/* Front of the card */}
          <div className="absolute w-full h-full [backface-visibility:hidden]">
            <div className="w-full h-full p-[2px] rounded-[20px] shadow-[0_0_15px_4px_rgba(233,100,255,0.8)] bg-gradient-to-br from-purple-600 to-pink-500 transition-all ease-in-out duration-500 group-hover:shadow-[0_0_20px_8px_rgba(233,100,255,0.9)]">
              <div className="bg-gray-900 rounded-[18px] py-6 px-8 h-full flex justify-evenly items-center flex-col">
                <img
                  src={icon}
                  alt={title}
                  className="w-20 h-20 object-contain transition-all ease-in-out duration-500 group-hover:scale-110"
                />
                <h3 className="text-white text-[20px] font-bold text-center transition-all ease-in-out duration-500 group-hover:text-pink-300">
                  {title}
                </h3>
              </div>
            </div>
          </div>

          {/* Back of the card */}
          <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <div className="w-full h-full p-[2px] rounded-[20px] shadow-[0_0_15px_4px_rgba(233,100,255,0.8)] bg-gradient-to-br from-purple-600 to-pink-500 transition-all ease-in-out duration-500 group-hover:shadow-[0_0_20px_8px_rgba(233,100,255,0.9)]">
              <div className="bg-gray-900 rounded-[18px] py-6 px-8 h-full flex justify-center items-center">
                <p className="text-white text-[14px] text-center leading-relaxed">
                  {description || "No description available."}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </Tilt>
    </motion.div>
  );
};

const About = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.8, 1, 1, 0.8]
  );
  const y = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    ["5%", "0%", "0%", "5%"]
  );

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <motion.section
        ref={containerRef}
        className="relative w-full py-20 flex items-center justify-center"
        style={{ opacity, scale, y }}
      >
        <div className="relative w-full mx-auto">
          <div className="container mx-auto px-4">
            <TextCard />
            <motion.div
              className="mt-20 flex flex-wrap gap-10 justify-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {services.map((service, index) => (
                <ServiceCard key={service.title} index={index} {...service} />
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default SectionWrapper(About, "about");
