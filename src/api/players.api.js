import api from "./axios";

export const PlayersApi = {
  getAll: () => api.get("/Player/GetAllPlayers"),

  getById: (playerId) =>
    api.get(`/Player/GetPlayer/${playerId}`),
  
  getMe: () => api.get("/Player/Me"),

  create: (payload) =>
    api.post("/Player/CreatePlayer", payload),

  update: (playerId, payload) =>
    api.put(`/Player/UpdatePlayer/${playerId}`, payload),

  delete: (playerId) =>
    api.delete(`/Player/DeletePlayer/${playerId}`),
};
