import { motion } from "framer-motion";
import styles from "./Sidebar.module.css";
import { useState, useEffect } from "react";
import { User } from "lucide-react";
import { NavLink } from "react-router-dom";
import { privateRoutes } from '../../../routes/listRoutes';
import { FaBars } from 'react-icons/fa';

const iconSize = 25;

export default function Sidebar({ userName }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [open, setOpen] = useState(!isMobile); // aberto no desktop, fechado no mobile

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      setOpen(!mobile);
      setIsHovered(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setOpen(prev => !prev);

  // Largura da sidebar: no mobile toggle entre 0 e 40vw, no desktop hover entre 4vw e 15vw
  const widthVw = isMobile ? (open ? 40 : 0) : isHovered ? 15 : 4;

  return (
    <>
      {/* Hamburger só aparece no mobile */}
      {isMobile && (
        <button
          className={styles.hamburgerButton}
          onClick={toggleSidebar}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
        >
          <FaBars size={28} />
        </button>
      )}

      {/* Sidebar aparece se aberto ou desktop */}
      {(open || !isMobile) && (
        <div
          className={styles.sidebarWrapper}
          onMouseEnter={() => !isMobile && setIsHovered(true)}
          onMouseLeave={() => !isMobile && setIsHovered(false)}
          onClick={() => isMobile && toggleSidebar()} // clicar fecha no mobile também (opcional)
        >
          <motion.aside
            className={styles.sidebar}
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
