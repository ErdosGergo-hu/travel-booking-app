import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

let isRefreshing = false;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log("Error status:", error.response?.status);
    console.log("Error data:", error.response?.data);
    if (error.response?.status === 401 && !originalRequest._retry) {
      console.log("401 or Retry");
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          console.log("Refresh token time");
          const refreshToken = localStorage.getItem("refreshToken");

          const res = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/auth/refresh`,
            {
              refreshToken,
            },
          );
          console.log("Refresh response: ", res);
          localStorage.setItem("accessToken", res.data.accessToken);
          localStorage.setItem("refreshToken", res.data.refreshToken);
        } catch (err) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          return Promise.reject(err);
        } finally {
          isRefreshing = false;
        }
      }

      const newToken = localStorage.getItem("accessToken");

      originalRequest.headers.Authorization = `Bearer ${newToken}`;

      return api(originalRequest);
    }

    return Promise.reject(error);
  },
);
