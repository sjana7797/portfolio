import { create } from "zustand";
import { CommandListStore } from "./type";
import { immer } from "zustand/middleware/immer";

export const useCommand = create<CommandListStore>()(
  immer((set) => ({
    commands: [],
    addCommand(command) {
      set((state) => {
        state.commands.push(command);
      });
    },
    clearCommands() {
      set({ commands: [] });
    },
  }))
);
