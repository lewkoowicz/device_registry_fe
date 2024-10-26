import axios from "axios";
import { apiConfig, BASE_URL } from "./apiConfig.ts";
import {getCsrfToken} from "./csrfService.ts";

export const signin = async (email: string, password: string, language: string) => {
    const csrfToken = await getCsrfToken();
    const headers = apiConfig.getHeaders(language, csrfToken);
    try {
        const response = await axios.post(`${BASE_URL}/session`,
            { email, password },
            { headers, withCredentials: true }
        );
        return response.data.user;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
        throw new Error('Unknown error');
    }
};

export const signup = async (email: string, password: string, language: string) => {
    const csrfToken = await getCsrfToken();
    const headers = apiConfig.getHeaders(language, csrfToken);
    try {
        const response = await axios.post(`${BASE_URL}/registration`,
            { user: { email, password, password_confirmation: password } },
            { headers }
        );
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
        throw new Error('Unknown error');
    }
};

export const signout = async (language: string) => {
    const csrfToken = await getCsrfToken();
    const headers = apiConfig.getHeaders(language, csrfToken);
    try {
        const response = await axios.delete(`${BASE_URL}/session`, { headers });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
        throw new Error('Unknown error');
    }
};