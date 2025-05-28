import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import styles from "./ThemeToggle.module.css";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    updateBodyTheme(savedTheme);
  }, []);

  const updateBodyTheme = (theme) => {
    if (theme === "dark") {
      document.body.classList.add("themeDark");
    } else {
      document.body.classList.remove("themeDark");
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    updateBodyTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <button
      aria-pressed={theme === "dark"}
      aria-label={`Alternar para tema ${theme === "light" ? "escuro" : "claro"}`}
      className={styles.toggleButton}
      onClick={toggleTheme}
      title="Alternar tema claro/escuro"
    >
      <div className={`${styles.toggleThumb} ${theme === "dark" ? styles.dark : ""}`} />
      <Moon className={styles.toggleIcon} />
      <Sun className={styles.toggleIcon} />
    </button>
  );
}
