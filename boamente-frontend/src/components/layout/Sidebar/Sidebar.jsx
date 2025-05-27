import { motion } from "framer-motion";
import styles from "./Sidebar.module.css";
import { useState, useEffect } from "react";
import {
  User,
  Home,
  LayoutDashboard,
  FileText,
  Users,
  Keyboard,
  UserPlus,
  Settings,
  LogOut,
  Headphones,
  Wrench
} from "lucide-react";

const iconSize = 25;
const menuItems = [
  { icon: <Home size={iconSize} />, label: "Página Inicial" },
  { icon: <LayoutDashboard size={iconSize} />, label: "Dashboards" },
  { divider: true },
  { icon: <FileText size={iconSize} />, label: "Registro de Sessões" },
  { icon: <Users size={iconSize} />, label: "Lista de Pacientes" },
  { icon: <Keyboard size={iconSize} />, label: "Teclado Virtual" },
  { divider: true },
  { icon: <UserPlus size={iconSize} />, label: "Cadastrar Paciente" },
  { icon: <Settings size={iconSize} />, label: "Configurações" },
  { icon: <LogOut size={iconSize} />, label: "Sair" },
  { divider: true },
  { icon: <Headphones size={iconSize} />, label: "Suporte" },
  { icon: <Wrench size={iconSize} />, label: "Menu Instalação" },
];

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
    <motion.aside
      className={styles.sidebar}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{ width: `${widthVw}vw` }}
      transition={{ duration: 0.4 }}
    >
      <div className={styles.userSection}>
        <User size={iconSize + 5} />
        {isHovered && <span>Olá, Fulano!</span>}
      </div>

      <div className={styles.menu}>
        {menuItems.map((item, idx) =>
          item.divider ? (
            <div key={idx} className={styles.divider} />
          ) : (
            <div key={idx} className={styles.menuItem}>
              {item.icon}
              {isHovered && <span>{item.label}</span>}
            </div>
          )
        )}
      </div>
    </motion.aside>
  );
}
