"use client";
import NextNProgress from "nextjs-progressbar";

function TopLoadingbar() {
  return (
    <NextNProgress
      color="#29D"
      startPosition={0.3}
      stopDelayMs={200}
      height={3}
      showOnShallow={true}
    />
  );
}

export default TopLoadingbar;
