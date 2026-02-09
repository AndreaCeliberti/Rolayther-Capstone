import api from "./api";

export const PlatformsApi = {
  getAll: () => api.get("/Platform/GetAllPlatforms"),

  create: (payload) =>
    api.post("/Platform/CreatePlatform", payload),

  delete: (platformId) =>
    api.delete(`/Platform/DeletePlatform/${platformId}`),
};
