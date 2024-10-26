import axios from "axios";
import {apiConfig, BASE_URL} from "./apiConfig";
import {getCsrfToken} from "./csrfService";

export interface Device {
    id: number;
    serial_number: string;
    assigned_at: string | null;
}

export const getAllDevices = async (language: string) => {
    const csrfToken = await getCsrfToken();
    const headers = apiConfig.getHeaders(language, csrfToken);
    try {
        const response = await axios.get<Device[]>(`${BASE_URL}/devices`, {headers});
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
        throw new Error('Unknown error');
    }
};

export const assignDevice = async (serial_number: string, language: string) => {
    const csrfToken = await getCsrfToken();
    const headers = apiConfig.getHeaders(language, csrfToken);
    try {
        const response = await axios.post(`${BASE_URL}/devices/assign`,
            {serial_number},
            {headers}
        );
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
        throw new Error('Unknown error');
    }
};

export const unassignDevice = async (serial_number: string, language: string) => {
    const csrfToken = await getCsrfToken();
    const headers = apiConfig.getHeaders(language, csrfToken);
    try {
        const response = await axios.post(`${BASE_URL}/devices/unassign`,
            {serial_number},
            {headers}
        );
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
        throw new Error('Unknown error');
    }
};
