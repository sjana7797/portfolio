import { GetStaticProps } from "next";
import Head from "next/head";
import React from "react";
import ProjectsList from "../../components/projects/ProjectsList";
import { APP_NAME } from "../../config/app";
import { Website } from "../../typing";
import { client } from "../../utils/sanityClient";

type Props = { projects: Website[] };

function Projects({ projects }: Props) {
  return (
    <>
      <Head>
        <title>Projects | {APP_NAME}</title>
      </Head>
      <h1 className="text-center text-4xl font-medium uppercase tracking-wider text-secondary underline decoration-wavy underline-offset-8 md:text-5xl lg:text-6xl xl:text-7xl">
        Projects
      </h1>
      <ProjectsList projects={projects} />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const queryWebsite = `*[_type=='websites']`;

  const projects: Website[] = await client.fetch(queryWebsite);
  return { props: { projects }, revalidate: 24 * 60 * 60 };
};

export default Projects;
