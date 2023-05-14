/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        "ubuntu-mono": ["Ubuntu Mono", "monospace"],
      },
      keyframes: {
        cubeRotation: {
          to: {
            transform: "rotateY(360deg) rotateX(480deg) rotateZ(720deg)",
          },
        },
        cubeShadow: {
          to: {
            transform: "scale(1.2) translateY(-10px)",
          },
        },
        skillAnimationBoxOn: {
          from: { right: "-300px" },
          to: { right: "40px" },
        },
        skillAnimationBoxOff: {
          from: { right: "40px" },
          to: { right: "-300px" },
        },
      },
      animation: {
        cubeRotation: "cubeRotation 15s linear infinite alternate",
        cubeShadow: "cubeShadow 1s ease-in-out infinite alternate",
        skillAnimationBoxOn: "skillAnimationBoxOn 2s linear forwards",
      },
    },
  },
  plugins: [],
};
