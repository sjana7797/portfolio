interface Image {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
}

export interface Website {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: "websites";
  _updatedAt: string;
  link: string;
  mobile_image: Image;
  name: "Movieprism";
  web_image: Image;
  web: [];
  description: string;
}

export interface NavLink {
  link: string;
  title: string;
}

export interface Experience {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: "experience";
  _updatedAt: string;
  company: string;
  designation: string;
  isCurrent: boolean;
  month_joining: string;
  month_leave: string;
  year_joining: string;
  year_leave: string;
}

export interface Intro {
  description: string;
  designation: string;
  quick_intro: string[];
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: "my_intro";
  _updatedAt: string;
}
