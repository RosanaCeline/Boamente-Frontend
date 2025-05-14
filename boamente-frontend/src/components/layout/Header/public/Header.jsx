import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import { useState } from 'react';
import logo from '../../../../assets/images/homepage/logo-boamente-upscale.png';

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
            <svg className={styles.buttonNav} viewBox="0 0 60 40" onClick={toggleMenu}>
                <g stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                    <path className={`${styles.line} ${menuVisible ? styles.topActive : ''}`} d="M10,10 L50,10 Z" />
                    <path className={`${styles.line} ${menuVisible ? styles.middleActive : ''}`} d="M10,20 L50,20 Z" />
                    <path className={`${styles.line} ${menuVisible ? styles.bottomActive : ''}`} d="M10,30 L50,30 Z" />
                </g>
            </svg>
            <nav className={`${styles.navegation} ${menuVisible ? styles.active : ''}`}>
                <ul>
                    <li><Link to="/">Visão Geral</Link></li>
                    <li><Link to="/recursos">Recursos</Link></li>
                    <li><Link to="/contato">Contato</Link></li>
                    <li>
                    <button className={styles.btnLogin} onClick={() => window.location.href = '/login'}>Entrar</button>
                    </li>
                    <li>
                    <button className={styles.btnCadastro} onClick={() => window.location.href = '/cadastro'}>Cadastre-se</button>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
