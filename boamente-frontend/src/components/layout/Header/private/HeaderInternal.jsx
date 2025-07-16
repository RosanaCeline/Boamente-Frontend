import React from "react";
import { Bell } from "lucide-react";
import styles from "./HeaderInternal.module.css";
import ThemeToggle from "../../../ThemeToggle/ThemeToggle";

export default function HeaderInternal({ pageTitle }) {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>
        {pageTitle}
      </h1>

      <section className={styles.actions}>
        <button aria-label="Notificações" className={styles.iconButton}>
          <Bell size={24} />
        </button>
        <ThemeToggle />
      </section>
    </header>
  );
}