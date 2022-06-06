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
}

export interface NavLink {
  link: string;
  title: string;
}
