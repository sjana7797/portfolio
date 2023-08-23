import type { AppProps } from "next/app";
import RootLayout from "~/layouts/root";
import { Roboto } from "next/font/google";

// tailwind css
import "~/styles/globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RootLayout font={roboto}>
      <Component {...pageProps} />
    </RootLayout>
  );
}
