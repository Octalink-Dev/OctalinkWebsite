import React, { useRef, useEffect, useState, useCallback } from "react";
import { Element } from "react-scroll";
import clsx from "clsx";
import CountUp from "react-countup";
import {
  motion,
  useAnimation,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { Check } from "lucide-react";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";

// Assume these are imported from your project structure
import { plans } from "../constants";
import Button from "../components/Button.jsx";

const AnimatedBox = ({ children, direction }) => {
  const boxRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: boxRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    direction === "left" ? ["-100%", "0%", "0%"] : ["100%", "0%", "0%"]
  );

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);

  return (
    <motion.div
      ref={boxRef}
      style={{ x, opacity }}
      className="overflow-visible"
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

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.8, 1, 1, 0.8]
  );
  const y = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    ["50%", "0%", "0%", "-50%"]
  );

  return (
    <motion.div
      ref={sectionRef}
      style={{ opacity, scale, y }}
      className="overflow-visible"
    >
      {children}
    </motion.div>
  );
};

const PricingCard = ({ plan, index, monthly }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: false, amount: 0.5 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);

  return (
    <div className="p-4">
      <motion.div
        ref={cardRef}
        className={clsx(
          "relative rounded-[30px] overflow-hidden ",
          index === 1 ? "bg-gray-200 max-w-sm z-10" : "bg-gray-300 max-w-xs"
        )}
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { scale: 1 },
          visible: {
            scale: 1.03,
          },
        }}
        whileHover={{
          scale: 1.05,
        }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="px-6 py-8">
          <div className="flex justify-center mb-6">
            <img
              src={`/api/placeholder/${index === 1 ? 120 : 88}`}
              alt={plan.title}
              className="w-24 h-24 object-contain"
            />
          </div>
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-2">
            {plan.title}
          </h3>
          <div className="text-center mb-6">
            <span className="text-4xl font-bold text-gray-900">
              $
              <CountUp
                start={plan.priceMonthly}
                end={monthly ? plan.priceMonthly : plan.priceYearly}
                duration={0.4}
                useEasing={false}
                preserveValue
              />
            </span>
            <span className="text-gray-600 ml-2">/ mo</span>
          </div>
          <p className="text-center text-gray-600 mb-8">{plan.caption}</p>
          <ul className="space-y-4 mb-8">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-center">
                <Check className="w-5 h-5 mr-3 text-green-500" />
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
          <Button
            icon="/api/placeholder/24/24"
            className={clsx(
              "w-full py-3 rounded-full text-white font-medium transition-all duration-200",
              index === 1
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-800 hover:bg-gray-900"
            )}
          >
            Get Started
          </Button>
        </div>
        {index === 1 && (
          <div className="bg-blue-500 text-white text-center py-2 text-sm font-medium">
            Most Popular
          </div>
        )}
      </motion.div>
    </div>
  );
};
const Pricing = () => {
  const [monthly, setMonthly] = useState(false);

  const toggleVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 100,
      },
    },
  };

  return (
    <section className="py-20 min-h-screen flex items-center justify-center overflow-hidden">
      <Element name="pricing">
        <div className="container mx-auto px-4">
          <motion.div
            variants={toggleVariants}
            initial="hidden"
            animate="visible"
            className="flex justify-center mb-12"
          >
            <motion.div
              className="bg-gray-200 rounded-full p-1 shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                className={clsx(
                  "px-6 py-2 rounded-full text-sm font-medium transition-all duration-200",
                  monthly
                    ? "bg-blue-500 text-white"
                    : "bg-transparent text-gray-700 hover:bg-gray-300"
                )}
                onClick={() => setMonthly(true)}
              >
                Monthly
              </button>
              <button
                className={clsx(
                  "px-6 py-2 rounded-full text-sm font-medium transition-all duration-200",
                  !monthly
                    ? "bg-blue-500 text-white"
                    : "bg-transparent text-gray-700 hover:bg-gray-300"
                )}
                onClick={() => setMonthly(false)}
              >
                Annual
              </button>
            </motion.div>
          </motion.div>

          <div className="flex flex-wrap justify-center items-center">
            {plans.map((plan, index) => {
              if (index === 0) {
                return (
                  <AnimatedBox key={plan.id} direction="left">
                    <PricingCard plan={plan} index={index} monthly={monthly} />
                  </AnimatedBox>
                );
              } else if (index === 1) {
                return (
                  <AnimatedSection key={plan.id}>
                    <PricingCard plan={plan} index={index} monthly={monthly} />
                  </AnimatedSection>
                );
              } else {
                return (
                  <AnimatedBox key={plan.id} direction="right">
                    <PricingCard plan={plan} index={index} monthly={monthly} />
                  </AnimatedBox>
                );
              }
            })}
          </div>
        </div>
      </Element>
    </section>
  );
};

export default Pricing;
