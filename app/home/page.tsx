import { Terminal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import myImage from "~/assets/images/my-image.jpg";
import ProjectBanner from "~/components/home/project-banner";
import { CardBody, CardContainer, CardItem } from "~/components/ui/3d-card";
import { BackgroundGradient } from "~/components/ui/background-gradient";
import {
  TextRevealCard,
  TextRevealCardDescription,
  TextRevealCardTitle,
} from "~/components/ui/text-reveal-card";
import { about, profileSummary } from "~/constants/details";

type Props = {};

function Home({}: Props) {
  return (
    <main className="mx-auto w-full max-w-7xl space-y-10">
      <div className="px-2 py-4">
        <Link
          href="/"
          className="flex w-fit items-center gap-x-2 rounded-md bg-white px-2.5 py-3 text-gray-900"
        >
          <span>
            <Terminal className="w-5" />
          </span>
          <span>Switch to Terminal</span>
        </Link>
      </div>
      <section className="flex h-full flex-col items-center sm:flex-row-reverse sm:gap-x-5 sm:px-5">
        <CardContainer className="inter-var">
          <CardBody className="group/card relative h-auto w-auto rounded-xl border border-black/[0.1] bg-gray-50 p-6 dark:border-white/[0.2] dark:bg-black dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1]">
            <CardItem translateZ="100" className="mt-4 w-full">
              <Image
                src={myImage}
                alt="Sanjay Jana Avatar"
                className="w-full max-w-sm rounded-md object-contain shadow"
              />
            </CardItem>
            <CardItem
              as="p"
              translateZ="60"
              className="mt-2 max-w-sm text-center font-medium text-cyan-600"
            >
              Sanjay Jana | Fullstack Developer
            </CardItem>
          </CardBody>
        </CardContainer>
        <div className="flex h-[40rem] w-full items-center justify-center rounded-2xl">
          <TextRevealCard
            text="You know the business"
            revealText="I know the chemistry "
          >
            <TextRevealCardTitle>
              Sometimes, you just need to see it.
            </TextRevealCardTitle>
            <TextRevealCardDescription>
              This is a text reveal card. Hover over the card to reveal the
              hidden text.
            </TextRevealCardDescription>
          </TextRevealCard>
        </div>
        {/* <div className="space-y-3 px-2 sm:hidden">
          <p>{profileSummary}</p>
          <p>{about}</p>
        </div>
        <div className="hidden w-full p-5 sm:block">
          <BackgroundGradient className="rounded-[22px] bg-slate-900 p-5  text-sm  lg:text-base">
            <p>{profileSummary}</p>
            <br />
            <br />
            <p>{about}</p>
          </BackgroundGradient>
        </div> */}
      </section>
      <ProjectBanner />
    </main>
  );
}

export default Home;
