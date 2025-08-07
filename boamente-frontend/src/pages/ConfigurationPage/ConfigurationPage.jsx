import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { ConfigurationService } from "../../services/configurationService";
import { CheckCircle, AlertCircle, X } from "lucide-react";
import style from "./ConfigurationPage.module.css";
import LabelInput from "../../components/LabelInput/LabelInput";
import editIcon from '../../assets/icons/edit_button.svg';

export default function ConfigurationPage() {
    const { formState, clearErrors, setError } = useForm({ mode: 'onChange' });
    const { errors } = formState;

    const [userData, setUserData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        crpCrm: '',
        uf: ''
    });

    const [editField, setEditField] = useState(null);
    const [tempValues, setTempValues] = useState({
        fullName: '',
        email: '',
        phoneNumber: ''
    });
    const [loading, setLoading] = useState(true);

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordSuccess, setPasswordSuccess] = useState('');
    const [changingPassword, setChangingPassword] = useState(false);

    const [isInactive, setIsInactive] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [deactivateLoading, setDeactivateLoading] = useState(false);
    const [deactivateError, setDeactivateError] = useState('');
    const [deactivateSuccess, setDeactivateSuccess] = useState('');

    useEffect(() => {
        async function fetchUserData() {
            try {
                const data = await ConfigurationService.getConfig();
                setUserData({
                    fullName: data.fullName,
                    email: data.email,
                    phoneNumber: data.phoneNumber,
                    crpCrm: data.crpCrm,
                    uf: data.uf,
                    status: data.status
                });

                setIsInactive(data.status === "INATIVO");

            } catch (err) {
                console.error("Erro ao carregar dados:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchUserData();
    }, []);

    const handleEdit = (field) => {
        setEditField(field);
        setTempValues(prev => ({
            ...prev,
            [field]: userData[field] || ''
        }));
    };

    const handleCancelEdit = () => {
        setEditField(null);
        setTempValues({
            fullName: '',
            email: '',
            phoneNumber: ''
        });
        clearErrors();
    };

    const handleSave = async (field) => {
        clearErrors();
        if (!tempValues[field]) {
            setError(field, { type: 'manual', message: 'Campo obrigatório.' });
            return;
        }

        try {
            const payload = {
                fullName: field === "fullName" ? tempValues.fullName : userData.fullName,
                email: field === "email" ? tempValues.email : userData.email,
                phoneNumber: field === "phoneNumber" ? tempValues.phoneNumber : userData.phoneNumber,
            };

            await ConfigurationService.updateData(payload);

            setUserData(payload);
            setEditField(null);
            setTempValues({ fullName: '', email: '', phoneNumber: '' });
        } catch (err) {
            setError(field, { type: 'manual', message: err.message });
        }
    };

    const handleReactivateClick = () => {
        alert('Para reativar sua conta, por favor envie um email para boamente.oficial@gmail.com');
    };

    const handleChangePassword = async () => {
        setPasswordError('');
        setPasswordSuccess('');

        if (!currentPassword || !newPassword || !confirmPassword) {
            setPasswordError('Preencha todos os campos.');
            return;
        }

        if (newPassword !== confirmPassword) {
            setPasswordError('As novas senhas não coincidem.');
            return;
        }

        setChangingPassword(true);

        try {
            const data = {
                currentPassword,
                newPassword,
                confirmPassword
            };

            await ConfigurationService.changePassword(data);

            setPasswordSuccess('Senha alterada com sucesso!');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (err) {
            setPasswordError(err.message);
        } finally {
            setChangingPassword(false);
        }
    };

    const handleDeactivateAccount = async () => {
    setDeactivateError('');
    setDeactivateSuccess('');
    setDeactivateLoading(true);

    try {
        const response = await ConfigurationService.deactivateAccount();

        setDeactivateSuccess(response);
        setIsInactive(true);
        setShowConfirm(false);
    } catch (err) {
        setDeactivateError('Falha ao desativar a conta.');
    } finally {
        setDeactivateLoading(false);
    }
    };

    if (loading) return <p>Carregando informações...</p>;

    return (
        <main className={style.container}>
            <div className={style.configurationContainer}>
            <section className={style.headerSection}>
                <h2 className={style.title}>Informações Pessoais</h2>
                <p className={style.subtitle}>Atualize seus dados pessoais aqui.</p>
            </section>

            <div className={style.form}>
                <div className={style.fieldRow}>
                    <div className={style.inputAndButtons}>
                        <LabelInput
                            id="fullName"
                            name="fullName"
                            type="text"
                            placeholder="Seu nome completo"
                            label="Nome"
                            register={null}
                            required={true}
                            errors={errors}
                            options={{
                                value: editField === "fullName" ? tempValues.fullName : userData.fullName,
                                onChange: (e) => setTempValues(prev => ({ ...prev, fullName: e.target.value })),
                                readOnly: editField !== "fullName"
                            }}
                        />
                        {editField === "fullName" ? (
                            <>
                                <button onClick={() => handleSave("fullName")} className={style.saveButton}>Salvar</button>
                                <button onClick={handleCancelEdit} className={style.cancelButton}>Cancelar</button>
                            </>
                        ) : (
                            <button onClick={() => handleEdit("fullName")} className={style.editButton}>
                                Editar <img src={editIcon} alt="Ícone editar" style={{ marginLeft: 8, width: 16, height: 16, verticalAlign: "middle" }} />
                            </button>
                        )}
                    </div>
                </div>

                <div className={style.gridTwoColumns}>
                    {["email", "phoneNumber"].map((field) => (
                        <div className={style.inputAndButtons} key={field}>
                            <LabelInput
                                id={field}
                                name={field}
                                type="text"
                                placeholder={field === "email" ? "exemplo@email.com" : "(00) 00000-0000"}
                                label={field === "email" ? "E-mail" : "Telefone"}
                                register={null}
                                required={true}
                                errors={errors}
                                options={{
                                    value: editField === field ? tempValues[field] : userData[field],
                                    onChange: (e) => setTempValues(prev => ({ ...prev, [field]: e.target.value })),
                                    readOnly: editField !== field
                                }}
                            />
                            {editField === field ? (
                                <>
                                    <button onClick={() => handleSave(field)} className={style.saveButton}>Salvar</button>
                                    <button onClick={handleCancelEdit} className={style.cancelButton}>Cancelar</button>
                                </>
                            ) : (
                                <button onClick={() => handleEdit(field)} className={style.editButton}>
                                    Editar <img src={editIcon} alt="Ícone editar" style={{ marginLeft: 8, width: 16, height: 16, verticalAlign: "middle" }} />
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                <div className={style.gridTwoColumns}>
                    <div className={style.fieldRow}>
                        <LabelInput
                            id="crpCrm"
                            name="crpCrm"
                            type="text"
                            placeholder=""
                            label="CRP/CRM"
                            register={null}
                            required={false}
                            errors={errors}
                            options={{
                                value: userData.crpCrm,
                                readOnly: true
                            }}
                        />
                    </div>

                    <div className={style.fieldRow}>
                        <LabelInput
                            id="uf"
                            name="uf"
                            type="text"
                            placeholder=""
                            label="UF"
                            register={null}
                            required={false}
                            errors={errors}
                            options={{
                                value: userData.uf,
                                readOnly: true
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Seção Alterar Senha no padrão LabelInput */}
            <section className={style.headerSection}>
                <h2 className={style.title}>Alterar Senha</h2>
                <p className={style.subtitle}>Atualize sua senha aqui.</p>
            </section>
            <div className={style.form}>
                <div className={style.fieldRow}>
                    <LabelInput
                        id="currentPassword"
                        name="currentPassword"
                        type="password"
                        placeholder="Digite sua senha atual"
                        label="Senha Atual"
                        register={null}
                        required={true}
                        options={{
                            value: currentPassword,
                            onChange: (e) => setCurrentPassword(e.target.value),
                        }}
                    />
                </div>

                <div className={style.fieldRow}>
                    <LabelInput
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        placeholder="Digite a nova senha"
                        label="Nova Senha"
                        register={null}
                        required={true}
                        options={{
                            value: newPassword,
                            onChange: (e) => setNewPassword(e.target.value),
                        }}
                    />
                </div>

                <div className={style.fieldRow}>
                    <LabelInput
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirme a nova senha"
                        label="Confirmar Nova Senha"
                        register={null}
                        required={true}
                        options={{
                            value: confirmPassword,
                            onChange: (e) => setConfirmPassword(e.target.value),
                        }}
                    />
                </div>

                {/* Aqui a mensagem de erro em vermelho */}
                {passwordError && <p className={style.errorMessage}>{passwordError}</p>}
                {passwordSuccess && <p className={style.successMessage}>{passwordSuccess}</p>}

                <div className={style.modalButtons}>
                    <button
                        type="button"
                        onClick={handleChangePassword}
                        disabled={changingPassword}
                        className={style.modalButtons}
                    >
                        {changingPassword ? 'Alterando...' : 'Alterar Senha'}
                    </button>
                </div>
            </div>
            </div>
            
            {!isInactive ? (
            <>
                {/* Botão + mensagens */}
                <button
                type="button"
                className={style.inactivateButton}
                onClick={() => setShowConfirm(true)}
                >
                Inativar Conta
                </button>

                {/* Mensagem de sucesso com ícone */}
                {deactivateSuccess && (
                <p className={style.successMessage}>
                    <CheckCircle size={20} style={{ marginRight: 8, color: '#5cb85c', verticalAlign: 'middle' }} />
                    {deactivateSuccess}
                </p>
                )}

                {/* Modal de confirmação */}
                {showConfirm && (
                <div className={style.confirmModal} onClick={() => setShowConfirm(false)}>
                    <div className={style.modalContent} onClick={e => e.stopPropagation()}>
                    <button 
                        className={style.closeIconBtn} 
                        aria-label="Fechar modal"
                        onClick={() => setShowConfirm(false)}
                    >
                        <X size={20} />
                    </button>

                    <p className={style.headerModal}>Tem certeza que deseja inativar sua conta?</p>

                    <div className={style.modalButtons}>
                        <button
                        onClick={handleDeactivateAccount}
                        disabled={deactivateLoading}
                        >
                        {deactivateLoading ? 'Inativando...' : 'Sim, inativar'}
                        </button>
                        <button onClick={() => setShowConfirm(false)}>Cancelar</button>
                    </div>

                    {/* Mensagem de erro com ícone */}
                    {deactivateError && (
                        <p className={style.errorMessage}>
                        <AlertCircle size={20} style={{ marginRight: 8, color: '#d9534f', verticalAlign: 'middle' }} />
                        {deactivateError}
                        </p>
                    )}

                    {/* Repetir mensagem de sucesso dentro do modal, opcional */}
                    {deactivateSuccess && (
                        <p className={style.successMessage}>
                        <CheckCircle size={20} style={{ marginRight: 8, color: '#5cb85c', verticalAlign: 'middle' }} />
                        {deactivateSuccess}
                        </p>
                    )}
                    </div>
                </div>
                )}
            </>
            ) : (
            <>
                <p className={style.inactiveMessage}>
                Sua conta está inativa. Para reativá‑la, envie um email para boamente.oficial@gmail.com ou abra um ticket de suporte
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
        </main>
    );
}
