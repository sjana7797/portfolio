export type Command = {
  id: string;
  name: string;
};

export type Message = {
  message: string;
  id: string;
  type: "user" | "bot";
};
