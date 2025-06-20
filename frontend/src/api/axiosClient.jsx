import axios from 'axios';
import Cookies from 'js-cookie';

// Cấu hình base URL
const baseURL = "http://localhost:8000/api";

// Tạo instance axiosClient
const axiosClient = axios.create({
    baseURL,
    headers: { 'Content-Type': 'application/json' },
});

// Interceptor request: gắn token vào header Authorization
axiosClient.interceptors.request.use((config) => {
    if (config.skipAuth) return config;

    const token = Cookies.get('authToken');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
}, (error) => Promise.reject(error));

// Hàm refreshAccessToken: gọi API refresh token để lấy access token mới
async function refreshAccessToken() {
    const refreshToken = Cookies.get('refreshToken');
    if (!refreshToken) throw new Error('No refresh token found');

    try {
        // Gọi API /token/refresh/ với refresh token
        const response = await axiosClient.post('/token/refresh/', { refresh: refreshToken }, { skipAuth: true });
        const { access } = response.data;

        // Lưu access token mới vào cookie
        Cookies.set('authToken', access);
        return access;
    } catch (error) {
        throw error;
    }
}

// Interceptor response: xử lý khi bị 401 để tự động refresh token
axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const status = error.response?.status;

        if (status === 401 && !originalRequest._retry) {
            // Nếu request là refresh token thì không retry nữa để tránh vòng lặp
            if (originalRequest.url.includes('/token/refresh/')) {
                // Refresh token lỗi => redirect về login
                window.location.href = '/login';
                return Promise.reject(error);
            }

            originalRequest._retry = true;

            try {
                const newAccessToken = await refreshAccessToken();
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                // Retry lại request gốc với token mới
                return axiosClient(originalRequest);
            } catch (refreshError) {
                // Refresh token lỗi => redirect về login
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosClient;
