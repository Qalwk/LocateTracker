import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3001/api",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// Добавляем интерцептор для автоматической отправки токена авторизации
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export interface FlightsResponse {
  flights: any[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
}

export const fetchFlights = async ({
  offset = 0,
  limit = 10,
}): Promise<FlightsResponse> => {
  const response = await axiosInstance.get("/flights", {
    params: { offset, limit },
  });
  return response.data;
};

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      // Нет ответа от сервера (offline, CORS, timeout)
      error.message = "Нет соединения с сервером";
    } else if (error.response.status === 401) {
      error.message = "Ошибка авторизации. Пожалуйста, войдите заново.";
    } else if (error.response.status === 403) {
      error.message = "Нет доступа к ресурсу.";
    } else if (error.response.status >= 500) {
      error.message = "Ошибка сервера. Попробуйте позже.";
    }
    return Promise.reject(error);
  },
);
