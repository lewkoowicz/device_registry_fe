import axios from "axios";

export const BASE_URL = "http://localhost:3000/api/v1";

export const apiConfig = {
    getHeaders: (language: string, csrfToken: string | null) => {
        return {
            'Accept-Language': language,
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrfToken || ''
        };
    }
};

axios.defaults.withCredentials = true;