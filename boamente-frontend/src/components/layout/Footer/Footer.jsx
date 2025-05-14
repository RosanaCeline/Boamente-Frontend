import React from 'react';
import styles from './Footer.module.css'
import logoUFDPar from '../../../assets/images/homepage/logo-ufdpar.png';
import logoIFCE from '../../../assets/images/homepage/logo-ifce.png';

export default function Footer () {
    return (
        <footer>
            <div id={styles.logos}>
                <img src={logoUFDPar} alt="Logo da UFDPar" />
                <img src={logoIFCE} alt="Logo do IFCE" />
            </div>
            <div>
                <span>Desenvolvido por Laís Carvalho e Rosana Celine</span>
            </div>
            <div>
                <span>PIBIC e PIBITI</span>
            </div>
        </footer>
    );
}
