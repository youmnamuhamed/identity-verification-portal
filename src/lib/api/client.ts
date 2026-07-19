import axios from "axios";

export const apiClient = axios.create({
  baseURL: "/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10s — prevents requests hanging forever if something goes wrong
});

// Optional: centralize error shape handling here so every call site
// doesn't need to repeat try/catch logic for axios-specific errors.
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message ??
        error.message ??
        "An unexpected error occurred.";
      return Promise.reject(new Error(message));
    }
    return Promise.reject(error);
  },
);
