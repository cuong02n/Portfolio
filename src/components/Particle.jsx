import React from "react";
import Particles from "react-tsparticles";

function Particle() {
  return (
    <Particles
      id="tsparticles"
      params={{
        particles: {
          number: {
            value: 160,
            density: {
              enable: true,
              value_area: 1500,
            },
          },
          color: {
            value: ["#a78bfa", "#38bdf8", "#f472b6"],
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#a78bfa",
            opacity: 0.12,
            width: 1,
          },
          move: {
            direction: "right",
            speed: 0.18,
          },
          size: {
            value: 1.4,
          },
          opacity: {
            value: 0.5,
            anim: {
              enable: true,
              speed: 1,
              opacity_min: 0.08,
            },
          },
        },
        interactivity: {
          events: {
            onclick: {
              enable: true,
              mode: "push",
            },
          },
          modes: {
            push: {
              particles_nb: 1,
            },
          },
        },
        retina_detect: true,
      }}
    />
  );
}

export default Particle;
