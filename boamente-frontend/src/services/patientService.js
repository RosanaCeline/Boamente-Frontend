import { AuthService } from "./authService";

export const PatientService = {
  async listarPacientes() {
    return await AuthService.apiRequest("/api/patient/listAll", "GET");
  },

  async arquivarPaciente(patientId) {
    return await AuthService.apiRequest(`/api/patient/archive/${patientId}`, "PATCH")
  }
};
