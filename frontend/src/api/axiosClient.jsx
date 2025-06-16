import axios from "axios";
import Cookies from "js-cookie";

// Cấu hình base URL
const baseURL = "http://localhost:8000/api";

// Tạo instance axios
const axiosClient = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Interceptor: Gắn token trước mỗi request
axiosClient.interceptors.request.use((config) => {
    if (config.skipAuth) {
        return config;
    }

    const token = Cookies.get("authToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

// Interceptor: Xử lý response
axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;

        if (status === 401 || status === 403) {
            console.warn("Phiên đăng nhập đã hết hạn hoặc không hợp lệ.");
            // Bạn có thể logout tự động tại đây nếu muốn
            // Ví dụ: window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);

export default axiosClient;
