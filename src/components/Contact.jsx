import React, { useRef, useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import emailjs from "@emailjs/browser";
import { styles } from "../styles";
import EarthCanvas from "./3dmodel";
import { SectionWrapper } from "../hoc";

const Contact = () => {
  const formRef = useRef();
  const sectionRef = useRef(null);
  const controls = useAnimation();
  const [isVisible, setIsVisible] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { root: null, rootMargin: "0px", threshold: 0 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      // Delay the animation start by 1 second
      setTimeout(() => {
        controls.start("visible");
      }, 1000);
    } else {
      controls.start("hidden");
    }
  }, [isVisible, controls]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "JavaScript Mastery",
          from_email: form.email,
          to_email: "sujata@jsmastery.pro",
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          alert("Thank you. I will get back to you as soon as possible.");
          setForm({ name: "", email: "", message: "" });
        },
        (error) => {
          setLoading(false);
          console.error(error);
          alert("Ahh, something went wrong. Please try again.");
        }
      );
  };

  const slideVariants = {
    hidden: { x: "-150%" },
    visible: {
      x: 0,
      transition: { type: "spring", damping: 30, stiffness: 200, delay: 0.2 },
    },
  };

  return (
    <div className="w-full flex items-center justify-center">
      <motion.div
        ref={sectionRef}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={slideVariants}
        className="flex flex-col-reverse xl:flex-row gap-10 overflow-hidden w-full max-w-7xl mx-auto p-8"
      >
        <div className="flex-[0.75] bg-gray-800 p-8 rounded-2xl shadow-lg">
          <p className="text-cyan-300 font-semibold text-xl mb-2">
            Get in touch
          </p>
          <h3 className="text-white font-bold text-4xl mb-8">Contact Us</h3>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex flex-col gap-8"
          >
            <label className="flex flex-col">
              <span className="text-white font-medium mb-4">Your Name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="What's your good name?"
                className="bg-gray-700 py-4 px-6 placeholder:text-gray-400 text-white rounded-lg outline-none border-none font-medium focus:ring-2 focus:ring-cyan-300 transition duration-300"
              />
            </label>
            <label className="flex flex-col">
              <span className="text-white font-medium mb-4">Your Email</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="What's your web address?"
                className="bg-gray-700 py-4 px-6 placeholder:text-gray-400 text-white rounded-lg outline-none border-none font-medium focus:ring-2 focus:ring-cyan-300 transition duration-300"
              />
            </label>
            <label className="flex flex-col">
              <span className="text-white font-medium mb-4">Your Message</span>
              <textarea
                rows={7}
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="What you want to say?"
                className="bg-gray-700 py-4 px-6 placeholder:text-gray-400 text-white rounded-lg outline-none border-none font-medium focus:ring-2 focus:ring-cyan-300 transition duration-300"
              />
            </label>

            <button
              type="submit"
              className="bg-cyan-500 hover:bg-cyan-600 py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-cyan-800 transition duration-300"
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </form>
        </div>

        <div className="xl:flex-1 xl:h-auto h-[350px] rounded-2xl overflow-hidden shadow-lg">
          <EarthCanvas />
        </div>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
