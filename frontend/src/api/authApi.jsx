import axiosClient from './axiosClient';
import Cookies from 'js-cookie';

const authApi = {
    login: async (data) => {
        const url = '/user/login/';
        try {
            const response = await axiosClient.post(url, data, { skipAuth: true });

            // Lưu token vào cookie nếu cần
            const { access, refresh } = response.data;
            Cookies.set('authToken', access);
            Cookies.set('refreshToken', refresh);

            return response.data;
        } catch (error) {
            throw error;
        }
    },

    register: async (data) => {
        const url = '/user/register/';
        try {
            const response = await axiosClient.post(url, data, { skipAuth: true });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    logout: async () => {
        const url = '/user/logout/';
        const refreshToken = Cookies.get('refreshToken');

        try {
            await axiosClient.post(url, { refresh: refreshToken });

            // Xóa token sau khi logout
            Cookies.remove('authToken');
            Cookies.remove('refreshToken');
        } catch (error) {
            throw error;
        }
    },
};

export default authApi;
