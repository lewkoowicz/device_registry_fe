import axios from "axios";
import { BASE_URL } from "./apiConfig.ts";

export const getCsrfToken = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/csrf`);
        return response.data.csrf_token;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
        throw new Error('Unknown error');
    }
};