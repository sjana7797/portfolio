import { create } from "zustand";
import type { SpotlightSlice } from "./spotlight/type";
import { createSpotlightSlice } from "./spotlight";

export const useSpotlightStore = create<SpotlightSlice>()((...a) =>
  createSpotlightSlice(...a)
);
