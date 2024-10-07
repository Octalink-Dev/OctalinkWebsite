import React, { useCallback } from "react";
import { Typewriter } from "react-simple-typewriter";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";

const EnhancedPricingHeader = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <div className="container mx-auto px-4 mb-16">
      <div
        className="relative bg-gradient-to-b from-blue-50 to-white rounded-3xl shadow-2xl overflow-hidden"
        style={{ height: "500px" }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Particles
            id="tsparticles"
            init={particlesInit}
            options={{
              fullScreen: { enable: false },
              background: {
                color: {
                  value: "transparent",
                },
              },
              fpsLimit: 120,
              interactivity: {
                events: {
                  onClick: {
                    enable: true,
                    mode: "push",
                  },
                  onHover: {
                    enable: true,
                    mode: "repulse",
                  },
                  resize: true,
                },
                modes: {
                  push: {
                    quantity: 4,
                  },
                  repulse: {
                    distance: 200,
                    duration: 0.4,
                  },
                },
              },
              particles: {
                color: {
                  value: "#4B5563",
                },
                links: {
                  color: "#4B5563",
                  distance: 150,
                  enable: true,
                  opacity: 0.5,
                  width: 1,
                },
                collisions: {
                  enable: true,
                },
                move: {
                  direction: "none",
                  enable: true,
                  outModes: {
                    default: "bounce",
                  },
                  random: false,
                  speed: 2,
                  straight: false,
                },
                number: {
                  density: {
                    enable: true,
                    area: 800,
                  },
                  value: 80,
                },
                opacity: {
                  value: 0.7,
                },
                shape: {
                  type: "circle",
                },
                size: {
                  value: { min: 1, max: 5 },
                },
              },
              detectRetina: true,
            }}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
            }}
          />
        </div>
        <div className="relative z-10 h-full flex flex-col justify-center px-6 py-12">
          <div className="text-center">
            <h2 className="text-6xl font-extrabold text-gray-800 mb-6 leading-tight">
              <Typewriter
                words={["Flexible pricing for teams of all sizes"]}
                loop={1}
                cursor
                cursorStyle="_"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </h2>
            <p className="text-2xl text-gray-600 max-w-2xl mx-auto">
              Choose the plan that works best for you and your team
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedPricingHeader;
