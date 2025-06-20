import { AuthService } from "./authService";

export const PatientService = {
  async listarPacientes() {
    return await AuthService.apiRequest("/api/patient/listAll", "GET");
  },
};
