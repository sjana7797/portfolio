import type { NextFont } from "next/dist/compiled/@next/font";
import NextNProgress from "nextjs-progressbar";
import type { ReactNode } from "react";

type Props = { children: ReactNode; font: NextFont };

function RootLayout({ children, font }: Props) {
  return (
    <div className={font.className}>
      <NextNProgress
        color="#14b8a6"
        height={3}
        showOnShallow
        options={{
          showSpinner: false,
        }}
        startPosition={0.1}
      />
      {children}
    </div>
  );
}

export default RootLayout;
