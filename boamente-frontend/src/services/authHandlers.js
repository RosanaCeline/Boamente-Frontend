import { AuthService } from './authService';
import { toast } from 'react-toastify';

export const AuthHandlers = {
    register: async (formData, setAlertMessage, setAlertType) => {
    try {
        const userData = {
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        crpCrm: formData.crpCrm,
        uf: formData.uf,
        registerType: formData.registerType,
        };

        await AuthService.apiRequest('/auth/register', 'POST', userData);

        setAlertMessage('Cadastro realizado com sucesso! Logo mandaremos um e-mail com as intruções de acesso.');
        setAlertType('success');

    } catch (error) {
        let errorMessage = 'Erro inesperado. Tente novamente.';

        if (error.message?.includes('Network Error')) {
        errorMessage = 'Sem conexão com o servidor. Verifique sua internet.';
        } else if (error.status === 400) {
        errorMessage = 'Dados inválidos: ' + (
            error.message.includes('E-mail') 
            ? 'E-mail já cadastrado' 
            : error.message.includes('crpCrm') || error.message.includes('CRP/CRM')
            ? 'CRP/CRM já cadastrado'
            : 'Verifique todos os campos'
        );
        } else if (error.status === 401) {
        errorMessage = 'Não autorizado.';
        } else if (error.status === 403) {
        errorMessage = 'Acesso negado. Verifique suas permissões.';
        } else if (error.status === 409) {
        errorMessage = 'Conflito: Usuário já existe.';
        } else if (error.status === 500) {
        errorMessage = 'Erro interno no servidor. Tente mais tarde.';
        } else if (error.message?.toLowerCase().includes('timeout')) {
        errorMessage = 'Tempo de conexão esgotado. Tente novamente.';
        }

        setAlertMessage(errorMessage);
        setAlertType('error');
    }
    },

    login: async (formData, navigate, rememberMe, setAlertMessage, setAlertType) =>  {
        try {
            const userData = {
                email: formData.email,
                password: formData.password,
            };

            const response = await AuthService.apiRequest('/auth/login', 'POST', userData);

            if (response.token) {
                if (rememberMe) {
                    localStorage.setItem('authToken', response.token);
                } else {
                    sessionStorage.setItem('authToken', response.token);
                }
                console.log("Token salvo:", rememberMe ? "localStorage" : "sessionStorage");
            } else {
                console.error("Token não recebido no login");
            }

            console.log("Login realizado com sucesso:", response);
            navigate('/dashboardgeral');
            
        } catch (error) {
            if (error instanceof TypeError) {
                setAlertMessage('Sem conexão com o servidor. Verifique sua internet.');
            } else if (error.message && error.message.toLowerCase().includes('timeout')) {
                setAlertMessage('Tempo de conexão esgotado. Tente novamente.');
            } else if (error.response) {
                const status = error.response.status;
                const backendMsg = error.response.data.message || '';

                switch (status) {
                case 400:
                    setAlertMessage('Dados inválidos: verifique os campos.');
                    break;
                case 401:
                    if (backendMsg.toLowerCase().includes('senha incorreta')) {
                    setAlertMessage('Senha incorreta.');
                    } else {
                    setAlertMessage('Não autorizado. Faça login novamente.');
                    }
                    break;
                case 403:
                    setAlertMessage('Acesso negado. Verifique suas permissões.');
                    break;
                case 404:
                    setAlertMessage('Usuário não encontrado.');
                    break;
                case 500:
                    setAlertMessage('Erro interno no servidor. Tente mais tarde.');
                    break;
                default:
                    setAlertMessage(backendMsg || 'Erro inesperado.');
                }
            } else if (error.message) {
                setAlertMessage(error.message);
            } else {
                setAlertMessage('Erro inesperado. Tente novamente mais tarde.');
            }

            setAlertType('error');
            }
    },

    resetPassword: async (formData, navigate) =>  {
        let toastId;
        try {
            const userData = ({
                email: formData.email
            })

            toast.dismiss();
            toastId = toast.loading("Processando redefinição de senha...");

            await AuthService.apiRequest('/auth/resetPassword', 'POST', userData);

            toast.update(toastId, {
                render: (
                    <>
                        Pedido de redefinição realizado. <br />
                        Se o e-mail estiver cadastrado, enviaremos instruções para redefinir a senha.
                    </>
                ),
                type: "success",
                isLoading: false,
                autoClose: 3000,
                onClose: () => navigate('/login'),
            });
            
            return { success: true, message: 'E-mail de recuperação enviado com sucesso.' };
        } catch (error) {
            let errorMessage = "Erro inesperado. Tente novamente.";
            toast.dismiss();

            if (error.message.includes('Network Error')) {
                errorMessage = 'Sem conexão com o servidor. Verifique sua internet.';
            } else if (error.status === 403) {
                errorMessage = 'Acesso negado. Verifique suas permissões.';
            } else if (error.status === 500) {
                errorMessage = 'Erro interno no servidor. Tente mais tarde.';
            } else if (error.message.toLowerCase().includes('timeout')) {
                errorMessage = 'Tempo de conexão esgotado. Tente novamente.';
            }

            toast.error(errorMessage, {
                isLoading: false,
                autoClose: 5000,
            });
        }
    },

    resetConfirmPassword: async (token, formData, navigate) =>  {
        let toastId;
        try {
            const userData = ({
                token: token,
                newPassword: formData.newPassword,
                confirmPassword: formData.confirmPassword
            })

            toast.dismiss();
            toastId = toast.loading("Processando redefinição de senha...");

            await AuthService.apiRequest('/auth/confirmResetPassword', 'POST', userData);

            navigate('/login');

            toast.update(toastId, {
                render: (
                    <>
                        Senha redefinida com sucesso! <br />
                    </>
                ),
                type: "success",
                isLoading: false,
                autoClose: 3000,
            });

            return { success: true, message: 'E-mail de recuperação enviado com sucesso.' };
        } catch (error) {
            let errorMessage = "Erro inesperado. Tente novamente.";
            toast.dismiss();

            if (error.message.includes('Network Error')) {
                errorMessage = 'Sem conexão com o servidor. Verifique sua internet.';
            } else if (error.status === 403) {
                errorMessage = 'Acesso negado. Verifique suas permissões.';
            } else if (error.status === 500) {
                errorMessage = 'Erro interno no servidor. Tente mais tarde.';
            } else if (error.message.toLowerCase().includes('timeout')) {
                errorMessage = 'Tempo de conexão esgotado. Tente novamente.';
            }

            toast.error(errorMessage, {
                isLoading: false,
                autoClose: 5000,
            });
        }
    }
};