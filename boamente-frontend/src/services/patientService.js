import { AuthService } from "./authService";

export const PatientService = {
  async listarPacientes() {
    return await AuthService.apiRequest("/patient/listAll", "GET");
  },
};
