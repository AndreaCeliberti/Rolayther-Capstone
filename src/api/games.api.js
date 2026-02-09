import api from "./api";

export const GamesApi = {
  getAll: () => api.get("/Game/GetAllGames"),

  create: (payload) =>
    api.post("/Game/CreateGame", payload),

  delete: (gameId) =>
    api.delete(`/Game/DeleteGame/${gameId}`),
};
