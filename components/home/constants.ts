import { Github, Instagram, Linkedin, Twitter } from "lucide-react";
import type { Experience, Nav, Social } from "./type";

const about: Nav = {
  href: "#about",
  name: "About",
};
const summary: Nav = {
  href: "#summary",
  name: "Profile Summary",
};

const experience: Nav = {
  href: "#experience",
  name: "experience",
};

const skills: Nav = {
  href: "#skills",
  name: "skills",
};
const projects: Nav = {
  href: "#projects",
  name: "projects",
};

export const navs: Nav[] = [summary, about, experience, projects, skills];

export const aboutMe = `I'm a passionate MERN stack developer 🚀 with expertise in building robust and scalable web applications. 💻 Whether it's crafting elegant front-end interfaces or designing efficient back-end systems, I thrive on creating seamless user experiences. 💡 Constantly seeking innovative solutions, I enjoy working with modern technologies like React.js, Node.js, Express.js, and MongoDB. From concept to deployment, I'm committed to delivering high-quality code and collaborating effectively with cross-functional teams. 🌱 I believe in continuous learning and staying up-to-date with industry trends. I'm always exploring new tools and frameworks to improve my skills and contribute to the open-source community. 📚 If you're looking for a dedicated developer who loves tackling challenges head-on, feel free to explore my repositories and reach out for collaboration opportunities. Let's build amazing projects together! 💪`;

export const profile = `Skilled React JS Dev creating exceptional SaaS with Tailwind, Material UI, and Next JS API.`;
export const profileSummary = `Experienced React JS Developer skilled in developing robust applications for
diverse clients, focusing on delivering exceptional user experiences. Proficient
in utilizing Tailwind CSS to create visually appealing interfaces. Currently
engaged in developing a cutting-edge SaaS product aimed at enhancing
marketing strategies and driving sales for client companies. Employing a
combination of Tailwind CSS and Material UI to achieve a highly polished user
interface. Integrating the product with Next JS API to ensure seamless data
flow and optimal performance.`;

const saasmonk: Experience = {
  company: "SaaSMonk",
  position: "Full Stack Developer",
  duration: "January 2022 - Present",
  techStack: ["React.js", "Node.js", "Express.js", "MongoDB"],
  description: `Currently spearheading the development of a SaaS product focused on enhancing marketing strategies and boosting client company sales.Leveraged Next JS API to build robust backend functionality, ensuring smooth data flow and reliable performance.Collaborated closely with stakeholders to gather requirements and align product features with business goals.
`,
  previousPosition: ["Frontend Developer - React"],
  website: "https://www.saasmonk.io/",
};
const tcs: Experience = {
  company: "TCS - Tata Consultancy Services",
  position: "System Engineer",
  duration: "October 2019 - November 2021",
  techStack: ["React.js", "Java", "SQL"],
  description: `Good sense of UI/UX design, Hands-on experience in building React Components.Knowledge of the Financial Domain`,
  previousPosition: [
    "Assistant System Engineer",
    "Assistant System Engineer Trainee",
  ],
  website: "https://www.tcs.com/",
};

export const workExperiences: Experience[] = [saasmonk, tcs];

const github: Social = {
  name: "Github",
  href: "https://github.com/sjana7797",
  icon: Github,
};
const linkedin: Social = {
  name: "Linkedin",
  href: "https://www.linkedin.com/in/sjana7797/",
  icon: Linkedin,
};
const x: Social = {
  name: "x",
  href: "https://twitter.com/_code_decoder",
  icon: Twitter,
};
const instagram: Social = {
  name: "instagram",
  href: "https://www.instagram.com/code__decoder/",
  icon: Instagram,
};

export const socials = [github, linkedin, x, instagram];
