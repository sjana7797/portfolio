import {
  DiBootstrap,
  DiCss3,
  DiGit,
  DiHtml5,
  DiJavascript1,
  DiMongodb,
  DiReact,
  DiSass,
} from "react-icons/di";

type Props = {};

function Skills({}: Props) {
  return (
    <section className="mt-16 md:mt-20">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="flex items-center justify-center">
          <h2 className="text-5xl font-semibold uppercase italic tracking-wider text-secondary">
            Skills
          </h2>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-5">
          <DiReact
            className="cursor-pointer rounded-full bg-accent text-6xl text-accent-content"
            title="React JS"
          />
          <DiHtml5
            className="cursor-pointer rounded-full bg-accent text-6xl text-accent-content"
            title="HTML 5"
          />
          <DiCss3
            className="cursor-pointer rounded-full bg-accent text-6xl text-accent-content"
            title="CSS 3"
          />
          <DiJavascript1
            className="cursor-pointer rounded-full bg-accent text-6xl text-accent-content"
            title="JS"
          />
          <DiSass
            className="cursor-pointer rounded-full bg-accent text-6xl text-accent-content"
            title="SASS"
          />
          <DiGit
            className="cursor-pointer rounded-full bg-accent text-6xl text-accent-content"
            title="Git"
          />
          <DiMongodb
            className="cursor-pointer rounded-full bg-accent text-6xl text-accent-content"
            title="MongoDB"
          />
          <DiBootstrap
            className="cursor-pointer rounded-full bg-accent text-6xl text-accent-content"
            title="Bootstrap"
          />
        </div>
      </div>
    </section>
  );
}

export default Skills;
