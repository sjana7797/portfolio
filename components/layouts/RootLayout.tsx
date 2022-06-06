import Head from "next/head";
import { ReactElement } from "react";
import "lazysizes";
import "lazysizes/plugins/parent-fit/ls.parent-fit";
import Header from "../global/Header";
import { APP_NAME } from "../../config/app";

type Props = { children: ReactElement };

function RootLayout({ children }: Props) {
  return (
    <>
      <Head>
        <title>{APP_NAME}</title>
      </Head>
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-10 md:py-20">{children}</main>
    </>
  );
}

export default RootLayout;
