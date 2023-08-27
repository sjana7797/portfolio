import Mobile from "~/components/common/mockup/mobile";
import About from "./about";
import Experience from "./experience";
import Summary from "./summary";
import Projects from "./projects";
import Skills from "./skills";

type Props = {};

function Main({}: Props) {
  return (
    <div className="max-h-full pt-24 lg:w-1/2 lg:py-24">
      <Summary />
      <About />
      <Experience />
      <Projects />
      <Skills />
    </div>
  );
}

export default Main;
