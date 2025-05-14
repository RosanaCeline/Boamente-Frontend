import React from "react";
import styles from "./Sidebar.module.css";

import iconProfile from "../../../assets/icons/sidebar/icon-Profile.png";
import iconHome from "../../../assets/icons/sidebar/icon-Home.png";
import iconDashboard from "../../../assets/icons/sidebar/icon-Dashboard.png";
import iconRegistro from "../../../assets/icons/sidebar/icon-Registro.png";
import iconLista from "../../../assets/icons/sidebar/icon-Lista.png";
import iconTeclado from "../../../assets/icons/sidebar/icon-Teclado.png";
import iconCadastro from "../../../assets/icons/sidebar/icon-Cadastro.png";
import iconConfig from "../../../assets/icons/sidebar/icon-Config.png";
import iconSair from "../../../assets/icons/sidebar/icon-Sair.png";
import iconSuporte from "../../../assets/icons/sidebar/icon-Suporte.png";
import iconInfo from "../../../assets/icons/sidebar/icon-Info.png";

const menuTop = [
  { 
    label: "Olá, Fulano!", 
    icon: iconProfile 
  },{ 
    separator: true 
  },{ 
    label: "Página Inicial", 
    icon: iconHome, 
    href: "/home" 
  },{ 
    label: "Dashboards", 
    icon: iconDashboard, 
    href: "/dashboards" 
  },{ 
    separator: true 
  },{
    label: "Registros de Sessões", 
    icon: iconRegistro, 
    href: "/registros" 
  },{ 
    label: "Lista de Pacientes", 
    icon: iconLista, 
    href: "/pacientes" 
  },{ 
    label: "Teclado Virtual", 
    icon: iconTeclado, 
    href: "/teclado" 
  },{ 
    separator: true 
  },{ 
    label: "Cadastrar Paciente", 
    icon: iconCadastro, 
    href: "/cadastrarpaciente" 
  }
];

const menuBottom = [
 { 
    label: "Configurações", 
    icon: iconConfig, 
    href: "/config" 
  },{ 
    label: "Sair", 
    icon: iconSair, 
    href: "/logout" 
  },{ 
    separator: true 
  },{ 
    label: "Suporte", 
    icon: iconSuporte, 
    href: "/suporte" 
  },{ 
    label: "Menu Instalação", 
    icon: iconInfo, 
    href: "/instalacao" 
  }
];

export default function Sidebar() {
  const renderItems = (list) =>
    list.map((item, index) => {
      if (item.separator) {
        return (
          <div key={`sep-${index}`} className={styles.barContainer}><div className={styles.barNav}></div></div>
        );
      }

      return (
        <li key={index}>
          <a href={item.href || "#"} {...item.attrs}>
            <div className={styles.icon}><img src={item.icon} alt={`Ícone ${item.label}`} /></div>
            <span className={styles.title}>{item.label}</span>
          </a>
        </li>
      );
    });

  return (
    <nav>
      <div className={styles.sidebar}>
        <ul className={styles.sidebarTop}>{renderItems(menuTop)}</ul>
        <ul className={styles.sidebarBottom}>{renderItems(menuBottom)}</ul>
      </div>
    </nav>
  );
}