export const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
      delayChildren: 0.5,
    },
  },
};

export const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};
