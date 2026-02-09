import api from "./api";

export const GenresApi = {
  getAll: () => api.get("/Genre/GetAllGenres"),

  create: (payload) =>
    api.post("/Genre/CreateGenre", payload),

  delete: (genreId) =>
    api.delete(`/Genre/DeleteGenre/${genreId}`),
};
