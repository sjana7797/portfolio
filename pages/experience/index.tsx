import Head from "next/head";
import ExperienceComponent from "../../components/experience/Experience";
import Skills from "../../components/experience/Skills";
import { APP_NAME } from "../../config/app";

type Props = {};

const Experience = (props: Props) => {
  return (
    <>
      <Head>
        <title>Experience | {APP_NAME}</title>
      </Head>
      <ExperienceComponent />
      <Skills />
    </>
  );
};

export default Experience;
