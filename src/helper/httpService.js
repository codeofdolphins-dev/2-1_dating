import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // Use your base URL from env
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor for adding token automatically
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("jwtToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Common HTTP service
 * @param {string} endpoint - API endpoint (e.g., "/chatrooms")
 * @param {string} method - HTTP method (GET, POST, PUT, DELETE)
 * @param {object} [data] - Request body (for POST/PUT)
 * @param {object} [extraConfig] - Additional Axios config (headers, params etc.)
 * @returns {Promise<any>}
 */
const httpService = async (endpoint, method = "GET", data = {}, extraConfig = {}) => {
  try {
    const response = await api({
      url: endpoint,
      method: method.toLowerCase(),
      data: ["post", "put", "patch"].includes(method.toLowerCase()) ? data : undefined,
      ...extraConfig,
    });

    console.log("response", response);
    
    return response.data;

  } catch (error) {
    console.error(`API ${method} ${endpoint} failed:`, error);
    throw error;
  }
};

export default httpService;
