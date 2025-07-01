import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import style from "./ConfigurationPage.module.css";
import ButtonSubmit from '../../components/ButtonSubmit/ButtonSubmit';
import LabelInput from "../../components/LabelInput/LabelInput";

export default function ConfigurationPage() {
    const navigate = useNavigate()
    const { register, handleSubmit, formState } = useForm({ mode: 'onChange' })
    const { errors, isDirty } = formState

    const onSubmit = (data) => {
        console.log("Dados salvos:", data)
        alert("Informações salvas!")
    };

    const handleCancel = () => {
        if (isDirty) {
        const confirmExit = window.confirm("Você tem alterações não salvas. Deseja sair mesmo assim?")
        if (!confirmExit) return;
        }
        navigate('/dashboardgeral');
    };

    useEffect(() => {
        const handleBeforeUnload = (e) => {
        if (isDirty) {
            e.preventDefault()
            e.returnValue = ''
        }
        };
        window.addEventListener('beforeunload', handleBeforeUnload)
        return () => window.removeEventListener('beforeunload', handleBeforeUnload)
    }, [isDirty])

    const [isInactive, setIsInactive] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)

    const handleInactivateClick = () => {
        setShowConfirm(true);
    }

    const confirmInactivate = () => {
        setIsInactive(true);
        setShowConfirm(false);
    }

    const cancelInactivate = () => {
        setShowConfirm(false);
    }

    const handleReactivateClick = () => {
        alert('Para reativar sua conta, por favor envie um email para suporte@seusite.com');
    }

    return (
        <main className={style.container}>
            <section className={style.headerSection}>
                <h2 className={style.title}>Informações Pessoais</h2>
                <p className={style.subtitle}>Atualize seus dados pessoais aqui.</p>
            </section>

            <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
                <LabelInput
                id="nome"
                name="nome"
                type="text"
                placeholder="Seu nome completo"
                label="Nome"
                register={register}
                required
                errors={errors}
                />
                <LabelInput
                id="email"
                name="email"
                type="email"
                placeholder="exemplo@email.com"
                label="E-mail"
                register={register}
                required
                errors={errors}
                />
                <LabelInput
                id="senha"
                name="senha"
                type="password"
                placeholder="Senha atual"
                label="Senha Atual"
                register={register}
                required
                errors={errors}
                />
                <LabelInput
                id="senhamodificada"
                name="senhamodificada"
                type="password"
                placeholder="Senha Atualizada"
                label="Senha Atualizada"
                register={register}
                required
                errors={errors}
                />

                <div className={style.buttonGroup}>
                    <button type="button" onClick={handleCancel} className={style.cancelButton}>Cancelar</button>
                    <button type="submit" className={style.saveButton}>Salvar</button>
                </div>

                {!isInactive ? (
                <>
                    <button
                        type="button"
                        className={style.inactivateButton}
                        onClick={handleInactivateClick}
                    >
                        Inativar Conta
                    </button>

                    {showConfirm && (
                        <div className={style.confirmModal}>
                        <p>Tem certeza que deseja inativar sua conta?</p>
                        <div className={style.modalButtons}>
                            <button onClick={confirmInactivate}>Sim, inativar</button>
                            <button onClick={cancelInactivate}>Cancelar</button>
                        </div>
                        </div>
                    )}
                </>
                    ) : (
                        <>
                        <p className={style.inactiveMessage}>
                            Sua conta está inativa. Para reativá-la, envie um email para suporteboamente@gmail.com
                        </p>
                        <button
                            type="button"
                            className={style.reactivateButton}
                            onClick={handleReactivateClick}
                        >
                            Reativar Conta
                        </button>
                        </>
                    )}                
            </form>

            <div className={style.goToOtherPages}>
                <ButtonSubmit type="button" onClick={handleCancel} className={style.buttonSubmit}>
                    Ir para dashboards
                </ButtonSubmit>

                <ButtonSubmit type="button" onClick={handleCancel} className={style.buttonSubmit}>
                    Acessar notificações
                </ButtonSubmit>
            </div>      
        </main>
    )
}