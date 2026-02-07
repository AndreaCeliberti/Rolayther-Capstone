import api from "./axios";

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  res => res,
  async err => {
    const originalRequest = err.config;

    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");
      const response = await api.post("/Auth/refresh", { refreshToken });

      localStorage.setItem("accessToken", response.data.accessToken);
      originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;

      return api(originalRequest);
    }

    return Promise.reject(err);
  }
);

export default api;
