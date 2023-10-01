import { useSpotlightStore } from "~/store";
import { useRef } from "react";
import React from "~/assets/svg/react";

type Props = {};

function Spotlight({}: Props) {
  const { position } = useSpotlightStore();
  const spotlight = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={spotlight}
      className="pointer-events-none fixed inset-0 hidden h-96 w-96 -translate-x-1/2 -translate-y-1/2 blur lg:block"
      style={{
        top: position.y,
        left: position.x,
      }}
    >
      <React className="animate-spin-slow text-blue-400 opacity-[0.01]" />
    </div>
  );
}

export default Spotlight;
