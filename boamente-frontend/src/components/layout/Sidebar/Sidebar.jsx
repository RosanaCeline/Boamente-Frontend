import { motion } from "framer-motion";
import styles from "./Sidebar.module.css";
import { useState, useEffect } from "react";
import { User } from "lucide-react"; 
import { NavLink } from "react-router-dom"; 
import { privateRoutes } from '../../../routes/listRoutes'
import { FaBars } from 'react-icons/fa';

const iconSize = 25;

export default function Sidebar({ onWidthChange, userName }) {
  const [isHovered, setIsHovered] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Controle para mobile toggle
  const [isMobile, setIsMobile] = useState(false);
  const [open, setOpen] = useState(true); // aberto desktop, fechado mobile inicialmente

  // Atualiza estado mobile e open ao redimensionar
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      setOpen(!mobile);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Se mobile e sidebar fechado, largura zero para o motion animar
  const widthVw = isMobile ? (open ? Math.min(40, 15) : 0) : isHovered ? 15 : 4; 
  // 40vw max largura no mobile, else seu controle original
  // calcula pixels para callback parent (não altera)
  const widthPx = (windowWidth * widthVw) / 100;

  // Callback para parent
  useEffect(() => {
    if (onWidthChange) {
      onWidthChange(widthPx);
    }
  }, [widthPx, onWidthChange]);

  const toggleSidebar = () => setOpen((prev) => !prev);

  return (
    <>
      {isMobile && (
        <button
          className={styles.hamburgerButton}
          onClick={toggleSidebar}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
        >
          <FaBars size={28} />
        </button>
      )}

       {(open || !isMobile) && (
        <div
          className={styles.sidebarWrapper}
          onMouseEnter={() => setIsHovered(true)}  
          onMouseLeave={() => setIsHovered(false)} 
        >
          <motion.aside
            className={`${styles.sidebar} ${isMobile ? styles.sidebarMobileOpen : ""}`}
            animate={{ width: `${widthVw}vw` }}
            transition={{ duration: 0.4 }}
          >
            <div className={styles.userSection}>
              <User size={iconSize + 5} />
              {(isHovered || isMobile) && <span>Olá, {userName}!</span>}
            </div>

            <div className={styles.menu}>
              {privateRoutes.map((route, idx) =>
                route.divider ? (
                  <div key={`divider-${idx}`} className={styles.divider} />
                ) : route.visible !== false ? (
                  route.path ? (
                    <NavLink
                      key={route.path}
                      to={route.path}
                      className={({ isActive }) =>
                        `${styles.menuItem} ${isActive ? styles.active : ""}`
                      }
                    >
                      {route.icon}
                      {(isHovered || isMobile) && <span>{route.title}</span>}
                    </NavLink>
                  ) : route.action ? (
                    <button
                      key={`action-${idx}`}
                      onClick={route.action}
                      className={styles.menuItem}
                      type="button"
                    >
                      {route.icon}
                      {(isHovered || isMobile) && <span>{route.title}</span>}
                    </button>
                  ) : null
                ) : null
              )}
            </div>
          </motion.aside>
        </div>
      )}
    </>
  );
}
