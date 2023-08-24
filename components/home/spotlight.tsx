import { useSpotlightStore } from "~/store";
import { useEffect, useRef } from "react";
import React from "~/assets/svg/react";

type Props = {};

function Spotlight({}: Props) {
  const { position } = useSpotlightStore();
  const spotlight = useRef<HTMLDivElement>(null);

  //   useEffect(() => {
  //     if (!spotlight.current) return;
  //     spotlight.current.style.background = `radial-gradient(600px at ${position.x}px ${position.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`;
  //   }, [position.x, position.y]);

  return (
    <div
      ref={spotlight}
      className="pointer-events-none fixed inset-0 hidden h-96 w-96 -translate-x-1/2 -translate-y-1/2 blur lg:block"
      style={{
        top: position.y,
        left: position.x,
      }}
    >
      <React className="animate-spin-slow text-blue-400 opacity-5" />
    </div>
    // <div
    //   ref={spotlight}
    //   className="pointer-events-none fixed inset-0 z-30 transition duration-300 lg:absolute"
    // >
    // </div>
  );
}

export default Spotlight;
