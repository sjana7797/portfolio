import { IconType } from "react-icons";
import { FaBeer } from "react-icons/fa";

export const dummy = [
  {
    position: "React Js Developer",
    company: "ValarTech",
    time: "Jan 2022-Present",
    address: "Mumbai,IN",
    work: "Developed React JS applications for multiple clients, prioritizing the creation of immersive user experiences.Utilized Tailwind CSS to craft visually appealing and responsive user interfaces.Collaborated with cross-functional teams to gather requirements and implement desired functionalities.Ensured seamless integration of APIs built with Next JS API, enabling efficient data exchange and optimal performance.",
    companyLink: "https://www.valartech.com",
  },
  {
    position: "System Engineer",
    company: "Tata Consultancy Services",
    time: "October 2019 - November 2021",
    address: "Mumbai,IN",
    work: "Good sense of UI/UX design, Hands-on experience in building React Components.Knowledge of the Financial Domain.",
    companyLink: "https://www.tcs.com/",
  },
];

export type Experience = {
  title: string;
  company_name: string;
  icon: IconType;
  iconBg: string;
  date: string;
  points: string[];
};

export const experiences: Experience[] = [
  {
    title: "React.js Developer",
    company_name: "Starbucks",
    icon: FaBeer,
    iconBg: "#383E56",
    date: "March 2020 - April 2021",
    points: [
      "Developing and maintaining web applications using React.js and other related technologies.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },
  {
    title: "React Native Developer",
    company_name: "Tesla",
    icon: FaBeer,
    iconBg: "#E6DEDD",
    date: "Jan 2021 - Feb 2022",
    points: [
      "Developing and maintaining web applications using React.js and other related technologies.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },
  {
    title: "Web Developer",
    company_name: "Shopify",
    icon: FaBeer,
    iconBg: "#383E56",
    date: "Jan 2022 - Jan 2023",
    points: [
      "Developing and maintaining web applications using React.js and other related technologies.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },
  {
    title: "Full stack Developer",
    company_name: "Meta",
    icon: FaBeer,
    iconBg: "#E6DEDD",
    date: "Jan 2023 - Present",
    points: [
      "Developing and maintaining web applications using React.js and other related technologies.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },
];
