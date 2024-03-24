import { Command } from "~/components/home/type";

export type CommandListStore = {
  commands: Command[];
  addCommand: (command: Command) => void;
  clearCommands: () => void;
};
