import api from "./axios";

export const GamesApi = {
  getAll: () => api.get("/Game/GetAllGames"),

  create: (payload) =>
    api.post("/Game/createGame", payload),

  delete: (gameId) =>
    api.delete(`/Game/DeleteGame/${gameId}`),
};
