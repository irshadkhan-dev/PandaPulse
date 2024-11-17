"use client";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import React, { ReactElement, ReactNode, useEffect, useState } from "react";
export const AnimatedListItem = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const animations = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1, originY: 0 },
    exit: { scale: 0, opacity: 0 },
    transition: { type: "spring", stiffness: 350, damping: 40 },
  };

  return (
    <motion.div {...animations} layout className="mx-auto w-full">
      {children}
    </motion.div>
  );
};

interface AnimatedListprops {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export const AnimatedList = React.memo(
  ({ children, delay = 1000, className }: AnimatedListprops) => {
    const childrenArray = React.Children.toArray(children);
    const [messages, setMessages] = useState<ReactNode[]>([]);
    useEffect(() => {
      const interval = setInterval(() => {
        if (messages.length < childrenArray.length) {
          setMessages((prev) => [childrenArray[messages.length], ...prev]);
        } else {
          clearInterval(interval);
        }
      }, delay);

      return () => clearInterval(interval);
    });
    return (
      <div
        className={cn("flex flex-col-reverse items-center gap-4", className)}
      >
        <AnimatePresence>
          {messages.map((item) => (
            <AnimatedListItem key={(item as ReactElement).key}>
              {item}
            </AnimatedListItem>
          ))}
        </AnimatePresence>
      </div>
    );
  }
);

AnimatedList.displayName = "AnimatedList";
