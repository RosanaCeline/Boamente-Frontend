import { motion } from "framer-motion";
import styles from "./Sidebar.module.css";
import { useState, useEffect } from "react";
import { User } from "lucide-react"; 
import { NavLink } from "react-router-dom"; 
import { privateRoutes } from '../../../routes/listRoutes'

const iconSize = 25;

export default function Sidebar({ onWidthChange }) {
  const [isHovered, setIsHovered] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Atualiza o tamanho da janela ao redimensionar
  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const widthVw = isHovered ? 15 : 4;
  // Calcula em pixels com base no tamanho atualizado da janela
  const widthPx = (windowWidth * widthVw) / 100;

  // Sempre que o hover ou largura mudar, avisa o parent
  useEffect(() => {
    if (onWidthChange) {
      onWidthChange(widthPx);
    }
  }, [widthPx, onWidthChange]);

  return (
    <div className={styles.sidebarWrapper}  onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <motion.aside className={styles.sidebar}  animate={{ width: `${widthVw}vw` }} transition={{ duration: 0.4 }}>
        <div className={styles.userSection}>
          <User size={iconSize + 5} />
          {isHovered && <span>Olá, Fulano!</span>}
        </div>

        <div className={styles.menu}>
          {privateRoutes.map((route, idx) =>
            route.divider ? (
              <div key={`divider-${idx}`} className={styles.divider} />
            ) : (
              <NavLink
                key={route.path}
                to={route.path}
                className={({ isActive }) =>
                  `${styles.menuItem} ${isActive ? styles.active : ""}`
                }
              >
                {route.icon}
                {isHovered && <span>{route.title}</span>}
              </NavLink>
            )
          )}
        </div>
      </motion.aside>
    </div>
  );
}