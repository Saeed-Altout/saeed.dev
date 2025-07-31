import * as React from "react";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * StartBorder
 * A visually striking border component that can wrap any content (e.g., Button, Card).
 * Uses Framer Motion to animate a gradient border with rounded corners and subtle shadow for a modern look.
 *
 * @param {React.PropsWithChildren<React.ComponentProps<"div">>} props - The component props.
 * @returns {JSX.Element}
 *
 * @example
 * <StartBorder>
 *   <Button>Click Me</Button>
 * </StartBorder>
 */

const gradientVariants: Variants = {
  animate: {
    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    transition: {
      backgroundPosition: {
        duration: 3,
        ease: "linear",
        repeat: Infinity,
      },
    },
  },
};

/**
 * Uses Framer Motion to animate the gradient border background.
 * This avoids the need for custom CSS keyframes and leverages JS-based animation for smoothness and control.
 */
export function StartBorder({
  children,
  className,
}: React.ComponentProps<"div">) {
  return (
    <motion.div
      initial={false}
      animate="animate"
      variants={gradientVariants}
      style={{
        background: "linear-gradient(45deg, var(--primary), #ec4899, #facc15)",
        backgroundSize: "200% 200%",
        padding: 2,
        borderRadius: 12,
        boxShadow: "0 4px 24px 0 rgba(0,0,0,0.10)",
      }}
      className={cn("relative", className)}
      tabIndex={-1}
      aria-hidden="false"
    >
      <div className="rounded-[10px] bg-background w-full h-full">
        {children}
      </div>
    </motion.div>
  );
}

StartBorder.displayName = "StartBorder";
