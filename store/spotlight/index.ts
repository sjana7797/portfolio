import type { StateCreator } from "zustand";
import { SpotlightSlice } from "./type";

export const createSpotlightSlice: StateCreator<
  SpotlightSlice,
  [],
  [],
  SpotlightSlice
> = (set) => ({
  position: { x: 0, y: 0 },
  setPosition: (position) => set({ position }),
});
