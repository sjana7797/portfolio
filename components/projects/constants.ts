import type { Project } from "./type";

const movieprism: Project = {
  id: "5bcfea02-dcc0-4daf-8c5f-7b4c4d5c3827",
  title: "Movieprism",
  description:
    "Movieprism is is a cutting-edge movie app that seamlessly combines the power of Next.js and the elegance of Tailwind CSS to provide you with the ultimate movie-watching experience. With Movieprism, you can explore, discover, and enjoy your favorite movies like never before.",
  stack: ["React", "Next JS", "Typescript", "Tailwind CSS", "TMDB API"],
};

const cinematics: Project = {
  id: "5bcfea02-dcc0-4daf-8c5f-7b4c4d5c3828",
  title: "Cinematics",
  description:
    "Cinematics is a user-friendly content details application designed to provide comprehensive information about movies and TV series. The app utilizes the TMDB API to gather data, ensuring accurate and up-to-date content. Developed with React JS, Cinematics offers seamless navigation and an intuitive user interface. React Router is employed for efficient routing, enabling smooth transitions between different sections of the app. The application's visual appeal is enhanced through the use of Tailwind CSS, while lazy sizes are utilized for image optimization, ensuring optimal performance and faster loading times.",
  stack: ["React", "Typescript", "Tailwind CSS", "TMDB API"],
};

export const projects: Project[] = [movieprism, cinematics];
