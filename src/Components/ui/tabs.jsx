import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "/lib/utils";

export const Tabs = ({
  tabs: propTabs,
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="h-screen w-screen flex flex-col">
      <div
        className={cn(
          "mt-8 ml-8 mb-8 gap-1 flex flex-row items-center justify-start [perspective:1000px] relative overflow-auto sm:overflow-visible no-visible-scrollbar max-w-full w-full",
          containerClassName
        )}
      >
        {propTabs.map((tab, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={cn("relative px-4 py-2 rounded-full cursor-pointer", tabClassName)}
            style={{ transformStyle: "preserve-3d" }}
          >
            {activeIndex === idx && (
              <motion.div
                layoutId="clickedbutton"
                transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                className={cn(
                  "absolute inset-0 bg-[#000000] text-white dark:bg-zinc-800 rounded-full",
                  activeTabClassName
                )}
              />
            )}
            <span className={cn("relative block dark:text-white", activeIndex === idx ? "text-white" : "text-black")}>
              {tab.buttonLabel}
            </span>
          </button>
        ))}
      </div>
      <div className="flex-1">
        <FullScreenContent content={propTabs[activeIndex].content} contentClassName={contentClassName} />
      </div>
    </div>
  );
};

const FullScreenContent = ({ content, contentClassName }) => {
  return (
    <motion.div
      layoutId="full-content"
      animate={{ y: 0 }} // Keeps the content stationary
      className={cn("w-full h-full relative", contentClassName)}
    >
      {content}
    </motion.div>
  );
};