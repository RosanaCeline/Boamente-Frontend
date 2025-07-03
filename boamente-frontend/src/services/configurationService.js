import { AuthService } from "./authService";

export const ConfigurationService = {
  async getConfig() {
    return await AuthService.apiRequest("/api/configuration", "GET");
  },

  async updateData(data) {
    return await AuthService.apiRequest("/api/configuration/update", "PATCH", data);
  },

  async changePassword(data) {
    return await AuthService.apiRequest("/api/configuration/change-password", "PATCH", data);
  },

  async deactivateAccount() {
    return await AuthService.apiRequest("/api/configuration/deactivate-account", "PATCH")
  }
};