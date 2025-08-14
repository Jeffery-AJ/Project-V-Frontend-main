import React from "react";
import {
  IconSunset,
  IconSunrise,
} from "@tabler/icons-react";
import { color } from "framer-motion";

export default function CustomThemeToggle({ toggleMode, mode }) {
  return (
    <button
      onClick={toggleMode}
      aria-label="Toggle theme"
      style={{
        border: "none",
        background: "transparent",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "8px",
      }}
    >
      {mode === "light" ? (
        <IconSunset />
      ) : (
        <IconSunrise color="white"/>
      )}
    </button>
  );
}