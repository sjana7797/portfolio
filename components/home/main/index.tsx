import About from "./about";
import Experience from "./experience";
import Summary from "./summary";

type Props = {};

function Main({}: Props) {
  return (
    <div className="max-h-full pt-24 lg:w-1/2 lg:py-24">
      <Summary />
      <About />
      <Experience />
    </div>
  );
}

export default Main;
