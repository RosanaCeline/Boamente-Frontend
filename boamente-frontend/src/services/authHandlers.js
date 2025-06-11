import { AuthService } from './authService';
import { toast } from 'react-toastify';

export const AuthHandlers = {
    register: async (formData, navigate) => {
        let toastId;

        try {
            toast.dismiss();
            toastId = toast.loading("Processando cadastro...");

            const userData = {
                fullName: formData.fullName,
                email: formData.email,
                phoneNumber: formData.phoneNumber,
                crpCrm: formData.crpCrm,
                uf: formData.uf,
            };

            const response = await AuthService.apiRequest('/auth/register', 'POST', userData);

            toast.update(toastId, {
                render: (
                    <>
                        Cadastro realizado com sucesso! <br />
                        Redirecionando para login...
                    </>
                ),
                type: "success",
                isLoading: false,
                autoClose: 3000,
                onClose: () => navigate('/login'),
            });

        } catch (error) {
            let errorMessage = 'Erro inesperado. Tente novamente.';
            
            if (error.message.includes('Network Error')) {
                errorMessage = 'Sem conexão com o servidor. Verifique sua internet.';
            } else if (error.status === 400) {
                errorMessage = 'Dados inválidos: ' + (
                    error.message.includes('email') 
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
            } else if (error.message.toLowerCase().includes('timeout')) {
                errorMessage = 'Tempo de conexão esgotado. Tente novamente.';
            } else {
                errorMessage = 'Erro desconhecido. Tente novamente.';
            }

            toast.update(toastId, {
                render: (
                    <>
                        {errorMessage}
                    </>
                ),
                type: 'error',
                isLoading: false,
                autoClose: 5000,
            });
        }
    },

    login: async (formData, navigate) =>  {
        try {
            const userData = ({
                email: formData.email,
                password: formData.password,
            })

            const response = await AuthService.apiRequest('/auth/login', 'POST', userData);

            // Armazena o token
            if (response.token) {
                localStorage.setItem('authToken', response.token);
            } else {
            console.error("Token não recebido no login");
            }

            console.log("Login realizado com sucesso:", response);
            navigate('/dashboardgeral'); // Redireciona para a página após login
            
        } catch (error) {
            let errorMessage = "Erro inesperado. Tente novamente mais tarde.";

            if (error.message.includes('Network Error')) {
                errorMessage = 'Sem conexão com o servidor. Verifique sua internet.';
            } else if (error.status === 400) {
                const mensagem = error.backendMessage.toLowerCase();
                errorMessage = 'Dados inválidos: Verifique todos os campos';
            } else if (error.status === 401 && error.backendMessage === 'Senha incorreta.') {
                errorMessage = 'Senha Incorreta.';
            } else if (error.status === 403) {
                errorMessage = 'Acesso negado. Verifique suas permissões.';
            } else if (error.status === 404 && error.backendMessage == 'Usuário não encontrado.') {
                errorMessage = 'Nenhum usuário encontrado com este e-mail.';
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

    resetPassword: async (formData, navigate) =>  {
        let toastId;
        try {
            const userData = ({
                email: formData.email
            })

            toast.dismiss();
            toastId = toast.loading("Processando redefinição de senha...");

            const response = await AuthService.apiRequest('/auth/resetPassword', 'POST', userData);

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

            const response = await AuthService.apiRequest('/auth/confirmResetPassword', 'POST', userData);

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