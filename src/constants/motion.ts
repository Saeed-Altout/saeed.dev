import type { Variants } from "motion/react";

export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const hoverScale = {
  scale: 1.02,
  transition: {
    duration: 0.2,
    ease: "easeInOut",
  },
};

export const borderAnimation = {
  rotate: 360,
  transition: {
    duration: 3,
    ease: "linear",
    repeat: Infinity,
  },
};
