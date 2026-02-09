import api from "./api";

export const MastersApi = {
  getAll: () => api.get("/Master/GetAllMasters"),

  getById: (masterId) =>
    api.get(`/Master/GetMaster/${masterId}`),

  me: () => api.get("/Master/Me"),

  create: (payload) =>
    api.post("/Master/CreateMaster", payload),

  update: (masterId, payload) =>
    api.put(`/Master/UpdateMaster/${masterId}`, payload),

  delete: (masterId) =>
    api.delete(`/Master/DeleteMaster/${masterId}`),
};
