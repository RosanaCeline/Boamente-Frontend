import React from "react";
import { Bell } from "lucide-react";
import { motion } from "framer-motion";
import styles from "./HeaderInternal.module.css";
import ThemeToggle from "../../../ThemeToggle/ThemeToggle";


export default function HeaderInternal({ pageTitle, sidebarWidth }) {
  return (
    <motion.header
      className={styles.header}
      animate={{ marginLeft: sidebarWidth }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{ width: "100%" }}
    >
      <h1 className={styles.title} style={{ maxWidth: `calc(100% - 150px)` }}>
        {pageTitle}
      </h1>

      <section className={styles.actions}>
        <button aria-label="Notificações" className={styles.iconButton}>
          <Bell size={24} />
        </button>
        <ThemeToggle />
      </section>
    </motion.header>
  );
}