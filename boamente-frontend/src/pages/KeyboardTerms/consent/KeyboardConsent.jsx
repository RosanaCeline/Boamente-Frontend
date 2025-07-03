import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { validateInstallationTokenBackend } from '../../../services/authService';
import "../../../style.css";
import style from "./KeyboardConsent.module.css";
import ButtonSubmit from '../../../components/ButtonSubmit/ButtonSubmit';

export default function KeyboardConsent() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    // Estados
    const [consentimento, setConsentimento] = useState(false);
    const [politica, setPolitica] = useState(false);
    const [error, setError] = useState("");
    const [nome, setNome] = useState("");

    useEffect(() => {
        async function validarToken() {
            const response = await validateInstallationTokenBackend(token);

            if (!response.valid) {
                setError(response.message || "Token inválido ou expirado. Por favor, solicite um novo link.");
            } else {
                // Salva os dados no localStorage para as próximas telas
                localStorage.setItem("authToken", token);
                localStorage.setItem("patientUuid", response.uuid);
                localStorage.setItem("patientName", response.name);
                setNome(response.name);
            }
        }

        validarToken();
    }, [token]);

    const handleSubmit = () => {
        if (consentimento && politica) {
            navigate(`/instalar-teclado?token=${token}`);
        } else {
            setError("Você deve aceitar ambos os termos para continuar.");
        }
    };

    return (
        <main className={style.mainKeyboardConsent}>
            <h1 className={style.title}>Consentimento para Uso do Teclado</h1>
            <h2 className={style.subtitle}>Olá, {nome || 'Paciente'}!</h2>
            <span className={style.instructions}>
                Antes de continuar com a instalação do teclado, é necessário ler e aceitar os termos abaixo:
            </span>

            <section className={style.termBox}>
                <h3>Termo de Consentimento Informado</h3>
                <span>
                    Ao utilizar este teclado, você autoriza a coleta e análise das informações digitadas com a finalidade de acompanhamento clínico. Todos os dados serão usados exclusivamente por profissionais de saúde mental responsáveis pelo seu atendimento. Você poderá revogar este consentimento a qualquer momento.
                </span>
            </section>

            <section className={style.termBox}>
                <h3>Política de Privacidade</h3>
                <span>
                    As informações coletadas serão armazenadas com segurança, não serão compartilhadas com terceiros não autorizados e serão utilizadas apenas para fins médicos e estatísticos. O uso do teclado implica na aceitação desta política.
                </span>
            </section>

            <div className={style.checkboxGroup}>
                <label>
                    <input
                        type="checkbox"
                        checked={consentimento}
                        onChange={() => setConsentimento(!consentimento)}
                    /> Li e aceito o Termo de Consentimento Informado
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={politica}
                        onChange={() => setPolitica(!politica)}
                    /> Li e aceito a Política de Privacidade
                </label>
            </div>

            {error && <div className={style.errorMessage}>{error}</div>}

            <ButtonSubmit type="button" onClick={handleSubmit}>
                Continuar para Instalação
            </ButtonSubmit>
        </main>
    );
}