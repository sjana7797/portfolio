import { GetStaticProps } from "next";
import Head from "next/head";
import ExperienceComponent from "../../components/experience/Experience";
import Skills from "../../components/experience/Skills";
import { APP_NAME } from "../../config/app";
import { Experience } from "../../typing";
import { client } from "../../utils/sanityClient";

type Props = { experiences: Experience[] };

const Experience = ({ experiences }: Props) => {
  return (
    <>
      <Head>
        <title>Experience | {APP_NAME}</title>
      </Head>
      <ExperienceComponent experiences={experiences} />
      <Skills />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const queryExperience = `*[_type=='experience']`;
  const experiences: Experience[] = await client.fetch(queryExperience);
  console.log(experiences);
  return { props: { experiences }, revalidate: 24 * 60 * 60 * 30 * 6 };
};

export default Experience;
