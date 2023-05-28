import { skills } from "@/constants/skills";

type Props = {};

function Skills({}: Props) {
  return (
    <section className="m-5 flex flex-col gap-5">
      <h2 className="text-7xl text-center uppercase text-slate-200 font-semibold">
        Skills
      </h2>
      <ul className="grid grid-cols-3 md:grid-cols-5 max-w-6xl mx-auto p-5 w-full gap-6">
        {skills.map((skill, index) => (
          <li
            key={index}
            title={skill.name}
            className={`${skill.color} rounded-lg overflow-hidden hover:opacity-100 opacity-70 cursor-pointer transition-all duration-300 ease-in hover:scale-105`}
          >
            <skill.Icon className="w-full h-auto" />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Skills;
