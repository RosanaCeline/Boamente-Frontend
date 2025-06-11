import { AuthService } from './authService';
import { toast } from 'react-toastify';

export const RequestHandlers = {
    registerPatient: async (formData, navigate) => {
        let toastId;
        try {
            const userData = {
                fullName: formData.fullName,
                cpf: formData.cpf.replace(/[.-]/g, ''),
                email: formData.email,
                phoneNumber: formData.phoneNumber,
                gender: formData.gender,
                birthDate: formData.birthDate?.toISOString().split('T')[0],
            };

            const response = await AuthService.apiRequest('/patient/register', 'POST', userData);

            toast.success("Cadastro de paciente realizado com sucesso!", {
                isLoading: false,
                autoClose: 5000,
                navigate: ('/listagemdepacientes'),
            });

            return response;

        } catch (error) {
            let errorMessage = 'Erro inesperado. Tente novamente.';
            
            if (error.message.includes('Network Error')) {
                errorMessage = 'Sem conexão com o servidor. Verifique sua internet.';
            } else if (error.status === 401) {
                errorMessage = 'Não autorizado.';
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