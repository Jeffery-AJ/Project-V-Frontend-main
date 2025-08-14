import * as React from 'react';
import { useMemo } from 'react';
import { Tabs } from "../Components/ui/tabs";

const DashboardContent = () => {
  const firstArray = useMemo(() => Array.from({ length: 4 }), []);
  const secondArray = useMemo(() => Array.from({ length: 2 }), []);

  return (
    <div className="h-full w-full flex">
      <div className="p-2 md:p-10 flex flex-col gap-2 flex-1 w-full h-full overflow-hidden">
        <div className="flex gap-2">
          {firstArray.map((_, i) => (
            <div
              key={i}
              className="h-20 w-full rounded-lg bg-gray-100 dark:bg-neutral-800 animate-pulse"
            ></div>
          ))}
        </div>
        <div className="flex gap-2 flex-1">
          {secondArray.map((_, i) => (
            <div
              key={i}
              className="h-full w-full rounded-lg bg-gray-100 dark:bg-neutral-800 animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

const OtherContent = () => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <h2 className="text-2xl font-bold">Other Component Content</h2>
    </div>
  );
};

const DashboardTabs = React.memo(() => {
  const tabs = [
    {
      buttonLabel: "AI Chat",
      content: <DashboardContent />,
    },
    {
      buttonLabel: "Financial Insights",
      content: <OtherContent />,
    },
  ];

  return (
    <Tabs
      tabs={tabs}
      containerClassName=""
      activeTabClassName=""
      tabClassName="hover:opacity-80 transition"
      contentClassName=""
    />
  );
});

export default DashboardTabs;
