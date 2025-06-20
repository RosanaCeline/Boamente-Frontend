import  React from 'react';
import "../../../style.css";
import { Copy } from 'lucide-react';
import style from "./KeyboardConsentAccept.module.css";
import ButtonSubmit from '../../../components/ButtonSubmit/ButtonSubmit';
import apk from '../../../apk/teclado.jpeg';

export default function KeyboardConsentAccept () {
    const nome = "Adonias";
    const UUID = "123e4567-e89b-12d3-a456-426614174000"

    const handleCopy = () => {
        navigator.clipboard.writeText(UUID)
                            .then(() => {
                                alert("UUID copiado para a área de transferência!");
                            })
                            .catch((err) => {
                                console.error('Erro ao copiar: ', err);
                            });
    }

    return (
        <main className={style.mainKeyboardAccept}>
            <h1 className={style.title}>Instalação do Teclado</h1>
            <h2 className={style.message}>Obrigado por aceitar os termos, {nome}!</h2>

            <section className={style.tutorial}>
                <h3 className={style.subtitle}>Como instalar:</h3>
                <ol>
                    <li>Acesse o arquivo baixado no seu Android.</li>
                    <li>Permita instalação de fontes desconhecidas.</li>
                    <li>Abra o app do teclado.</li>
                    <li>Copie e cole o UUID acima quando solicitado.</li>
                    <li>Pronto! Seu teclado está configurado.</li>
                </ol>
            </section>
            <section className={style.showUUID}>
                <h3 className={style.subtitle}>Seu identificador único (UUID):</h3>
                <div className={style.uuidContainer}>
                    <span className={style.showNumberUUID}>{UUID}</span>
                    <button onClick={handleCopy} className={style.copyButton}> <Copy size={20} /> </button>
                </div>
            </section>
            <section className={style.download}>
                <h3 className={style.subtitle}>Baixar teclado:</h3>
                 <a href={apk} download>
                    <button className={style.btnDownload}>Baixar APK do teclado</button>
                </a>
            </section>

            <ButtonSubmit type="button" > Continuar para Instalação </ButtonSubmit>
        </main>
    )
}