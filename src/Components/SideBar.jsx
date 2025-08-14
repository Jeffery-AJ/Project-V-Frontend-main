import React, { useState, useEffect, useMemo, useCallback, useContext } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/ContentBar";
import {
  IconLayoutSidebarLeftExpandFilled,
  IconLayoutSidebarLeftCollapseFilled,
  IconBook,
  IconSettings,
  IconUserBolt,
  IconTopologyRing2,
} from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "/lib/utils";
import CustomThemeToggle from "./ThemeToggle2";
import { ThemeContext } from "../Context/ThemeContext";
import CssBaseline from "@mui/material/CssBaseline";
import AppTheme from '../theme/AppTheme';
import Cookies from 'js-cookie';

const noop = () => {};

export function SidebarDemo({ studyTools, aiAssit, collabration, settings }) {
  // Use theme context for light/dark mode
  const { mode, toggleMode } = useContext(ThemeContext);

  // Create a mapping of dashboard components
  const dashboards = { studyTools, aiAssit, collabration, settings };

  // Active dashboard key state. Default to "studyTools"
  const [activeDashboard, setActiveDashboard] = useState("studyTools");


  const [open, setOpen] = useState(false);
  const [isDocked, setIsDocked] = useState(false);
  const [username, setUsername] = useState('');
  const [pfp, setPfp] = useState('');


  useEffect(() => {
    const user = JSON.parse(decodeURI(Cookies.get('user')));
    if (user) {
      setUsername(user.username);
      let avatar = user.google_data?.picture || user.github_data?.avatar_url || ''
      setPfp(avatar);
    }
  }, []);

  const links = useMemo(
    () => [
      {
        key: "studyTools",
        label: <span className="text-neutral-800 dark:text-neutral-200 font-medium">Study Tools</span>,
        href: "#",
        icon: (
          <IconBook className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
        ),
        onClick: () => setActiveDashboard("studyTools"),
      },
      {
        key: "aiAssit",
        label: <span className="text-neutral-800 dark:text-neutral-200 font-medium">AI Assistant</span>,
        href: "#",
        icon: (
          <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
        ),
        onClick: () => setActiveDashboard("aiAssit"),
      },
      {
        key: "collabration",
        label: <span className="text-neutral-800 dark:text-neutral-200 font-medium">Collabration</span>,
        href: "#",
        icon: (
          <IconTopologyRing2 className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
        ),
        onClick: () => setActiveDashboard("collabration"),
      },
      {
        key: "settings",
        label: <span className="text-neutral-800 dark:text-neutral-200 font-medium">User Settings</span>,
        href: "#",
        icon: (
          <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
        ),
        onClick: () => setActiveDashboard("settings"),
      },
    ],
    []
  );

  const handleDockToggle = useCallback(() => {
    setIsDocked((prev) => {
      const newDocked = !prev;
      setOpen(newDocked);
      return newDocked;
    });
  }, []);

  // Get the active dashboard component
  const ActiveComponent = dashboards[activeDashboard];

  return (
    <AppTheme mode={mode}>
      <CssBaseline enableColorScheme />
      <div
        className={cn(
          "flex flex-col md:flex-row bg-[hsl(36, 24%, 86%)] dark:bg-neutral-800 shadow-none w-screen h-screen overflow-hidden",
          mode === "dark" && "dark"
        )}
      >
        <Sidebar open={open} setOpen={isDocked ? noop : setOpen} className="overflow-hidden">
          <SidebarBody className="justify-between gap-10 overflow-hidden">
            <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-[hsl(36, 24%, 86%)] dark:bg-neutral-800">
              {open ? <Logo /> : <LogoIcon />}
              <div className="mt-8 flex flex-col gap-3 ml-1">
                {links.map((link) => (
                  <div key={link.key} onClick={link.onClick}>
                    <SidebarLink link={link} />
                  </div>
                ))}
              </div>
            </div>
            <div className="overflow-hidden bg-[hsl(36, 24%, 86%)]dark:bg-neutral-800">
              <div className="mb-4">
                <SidebarLink
                  link={{
                    label: username,
                    href: "#",
                    icon: (
                      <img
                        src= {pfp}
                        className="h-7 w-7 flex-shrink-0 rounded-full"
                        width={50}
                        height={50}
                        alt="Avatar"
                        loading="eager"
                        fetchpriority="high"
                        decoding="async"
                      />
                    ),
                  }}
                />
              </div>
              <div onClick={handleDockToggle} className="cursor-pointer mt-2">
                <div className="hidden md:flex flex items-center relative ml-[3.4px]">
                  {isDocked ? (
                    <IconLayoutSidebarLeftCollapseFilled
                      className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0"
                    />
                  ) : (
                    <IconLayoutSidebarLeftExpandFilled
                      className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0"
                    />
                  )}
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={isDocked ? "Unpin Sidebar" : "Pin Sidebar"}
                      variants={{
                        hidden: { opacity: 0, x: -10 },
                        visible: { opacity: 1, x: 0 },
                        exit: { opacity: 0, x: 10 },
                      }}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={{ duration: 0.2 }}
                      className="whitespace-nowrap text-sm font-medium text-neutral-700 dark:text-neutral-200 ml-3"
                    >
                      {isDocked ? "Unpin Sidebar" : "Pin Sidebar"}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>
              <div className="cursor-pointer mt-3 ml-[1.4px]">
                <div className="flex items-center relative">
                  <CustomThemeToggle toggleMode={toggleMode} mode={mode} />
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={mode === "light" ? "Light Mode" : "Dark Mode"}
                      variants={{
                        hidden: { opacity: 0, x: -10 },
                        visible: { opacity: 1, x: 0 },
                        exit: { opacity: 0, x: 10 },
                      }}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={{ duration: 0.2 }}
                      className="whitespace-nowrap text-sm font-medium text-neutral-700 dark:text-neutral-200 ml-[10px]"
                    >
                      {mode === "light" ? "Light Mode" : "Dark Mode"}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </SidebarBody>
        </Sidebar>
        {ActiveComponent && <ActiveComponent />}
      </div>
    </AppTheme>
  );
}

export const Logo = () => {
  return (
    <a
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-black rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <span className="font-medium text-black dark:text-white whitespace-pre">
        The Note
      </span>
    </a>
  );
};

export const LogoIcon = () => {
  return (
    <a
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-black rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </a>
  );
};