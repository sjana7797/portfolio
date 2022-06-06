import { GetStaticProps } from "next";
import Intro from "../components/home/Intro";
import Projects from "../components/home/Projects";
import { Website } from "../typing";
import { client } from "../utils/sanityClient";

type Props = { websites: Website[] };
const Home = ({ websites }: Props) => {
  const featWebsites = websites.filter((website) => website.web.length > 0);
  return (
    <>
      <Intro />
      <Projects websites={websites} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const queryWebsite = `  *[_type=='websites']{
    ...,
    'web':*[_type=='feat_websites' && references(^._id)]
  }`;

  const websites: Website[] = await client.fetch(queryWebsite);
  return { props: { websites }, revalidate: 24 * 60 * 60 };
};

export default Home;
