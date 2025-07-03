import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import "../../../style.css";
import { Copy } from 'lucide-react';
import style from "./KeyboardConsentAccept.module.css";
import ButtonSubmit from '../../../components/ButtonSubmit/ButtonSubmit';
import apk from '../../../apk/app-release.apk';
import { validateInstallationTokenBackend } from '../../../services/authService';

export default function KeyboardConsentAccept () {
    const location = useLocation();
    const [nome, setNome] = useState('');
    const [uuid, setUuid] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const token = queryParams.get('token');

        if (!token) {
            setError("Token não encontrado na URL.");
            return;
        }

        async function validateToken() {
            const result = await validateInstallationTokenBackend(token);

            if (!result.valid) {
                setError(result.message || "Token inválido ou expirado.");
                // Redireciona se quiser: navigate('/');
                return;
            }

            // Salva no localStorage para outras páginas, se necessário
            localStorage.setItem('authToken', token);
            localStorage.setItem('patientUuid', result.uuid);
            localStorage.setItem('patientName', result.name);

            setNome(result.name);
            setUuid(result.uuid);
        }

        validateToken();
    }, [location.search]);

    const handleCopy = () => {
        if (!uuid) return;

        navigator.clipboard.writeText(uuid)
            .then(() => {
                alert("UUID copiado para a área de transferência!");
            })
            .catch((err) => {
                console.error('Erro ao copiar: ', err);
            });
    };

    if (error) {
        return <div className={style.errorMessage}>{error}</div>;
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
                    <span className={style.showNumberUUID}>{uuid}</span>
                    <button onClick={handleCopy} className={style.copyButton}>
                        <Copy size={20} />
                    </button>
                </div>
            </section>

            <section className={style.download}>
                <h3 className={style.subtitle}>Baixar teclado:</h3>
                <a href={apk} download>
                    <button className={style.btnDownload}>Baixar APK do teclado</button>
                </a>
            </section>

            <ButtonSubmit type="button">Continuar para Instalação</ButtonSubmit>
        </main>
    );
}
