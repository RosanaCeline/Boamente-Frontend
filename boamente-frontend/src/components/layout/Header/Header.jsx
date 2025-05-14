import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import { useState } from 'react';
import logo from '../../../assets/images/homepage/logo-boamente-upscale.png';

export default function Header() {
    const [menuVisible, setMenuVisible] = useState(false);
    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    return (
        <header>
            <div className={styles.boamente}>
                <img src={logo} alt="Logo Boamente" />
                <span>BOAMENTE</span>
            </div>
            <nav className={styles.navegation}>
                <ul style={{ display: menuVisible ? 'block' : 'none' }}>
                    <li><Link to="/">Visão Geral</Link></li>
                    <li><Link to="/recursos">Recursos</Link></li>
                    <li><Link to="/contato">Contato</Link></li>
                    <li>
                    <button className={`button ${styles.btnLogin}`} onClick={() => window.location.href = '/login'}>Entrar</button>
                    </li>
                    <li>
                    <button className={`button ${styles.btnCadastro}`} onClick={() => window.location.href = '/cadastro'}>Cadastre-se</button>
                    </li>
                </ul>
                <svg className={`${styles.buttonNav} Header__toggle-svg`} viewBox="0 0 60 40" onClick={toggleMenu}>
                    <g stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                    <path id={styles.topLine} d="M10,10 L50,10 Z"></path>
                    <path id={styles.middleLine} d="M10,20 L50,20 Z"></path>
                    <path id={styles.bottomLine} d="M10,30 L50,30 Z"></path>
                    </g>
                </svg>
            </nav>
        </header>
    );
}
