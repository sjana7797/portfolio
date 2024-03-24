import { Command } from "./type";

const aboutMe: Command = {
  id: "2a4df0b6-2d1d-4035-baff-5455a815555a",
  name: "about --me",
};

const skills: Command = {
  id: "2a4df0b6-2d1d-4035-baff-5455a815555b",
  name: "ls --skill",
};

const profile: Command = {
  id: "142c33d5-711c-491c-a638-d3a898de0115",
  name: "profile",
};

export const clear: Command = {
  id: "80d6440c-c286-48c5-8c2a-f94dc56a7ded",
  name: "clear",
};

export const terminalMessages = {
  [aboutMe.id]: `I'm a passionate MERN stack developer 🚀 with expertise in building robust and scalable web applications. 💻 Whether it's crafting elegant front-end interfaces or designing efficient back-end systems, I thrive on creating seamless user experiences. 💡 Constantly seeking innovative solutions, I enjoy working with modern technologies like React.js, Node.js, Express.js, and MongoDB. From concept to deployment, I'm committed to delivering high-quality code and collaborating effectively with cross-functional teams. 🌱 I believe in continuous learning and staying up-to-date with industry trends. I'm always exploring new tools and frameworks to improve my skills and contribute to the open-source community. 📚 If you're looking for a dedicated developer who loves tackling challenges head-on, feel free to explore my repositories and reach out for collaboration opportunities. Let's build amazing projects together! 💪`,
  [profile.id]: `Experienced React JS Developer skilled in developing robust applications for diverse clients, focusing on delivering exceptional user experiences. Proficient in utilizing Tailwind CSS to create visually appealing interfaces. Currently engaged in developing a cutting-edge SaaS product aimed at enhancing marketing strategies and driving sales for client companies. Employing a combination of Tailwind CSS and Material UI to achieve a highly polished user interface. Integrating the product with Next JS API to ensure seamless data flow and optimal performance.`,
  [skills.id]: `Frontend -> HTML,CSS,JavaScript,TypeScript,React JS,Next JS;
  Backend -> Node JS,Express,Nest JS;
  Database -> MongoDB,Postgres;
  Languages -> Core Java,JavaScript,TypeScript;`,
};

export const terminalCommands: Command[] = [profile, aboutMe, skills, clear];
