import { GetStaticProps } from "next";
import Intro from "../components/home/Intro";
import Projects from "../components/home/Projects";
import { Intro as IntroInterface, Website } from "../typing";
import { client } from "../utils/sanityClient";

type Props = { websites: Website[]; myIntro: IntroInterface };
const Home = ({ websites, myIntro }: Props) => {
  const featWebsites = websites.filter((website) => website.web.length > 0);
  console.log(myIntro);
  return (
    <>
      <Intro myIntro={myIntro} />
      <Projects websites={featWebsites} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const queryWebsite = `*[_type=='websites']{
    ...,
    'web':*[_type=='feat_websites' && references(^._id)]
  }`;
  const queryMyIntro = ` *[_type=='my_intro']`;

  const websites: Website[] = await client.fetch(queryWebsite);
  const myIntroData: IntroInterface[] = await client.fetch(queryMyIntro);
  const myIntro: IntroInterface = myIntroData[0];
  return { props: { websites, myIntro }, revalidate: 24 * 60 * 60 };
};

export default Home;
