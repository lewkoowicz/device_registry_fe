import React, {createContext, useCallback, useContext, useEffect, useState} from "react";
import {getCsrfToken} from "../services";

const CsrfContext = createContext<{ csrfToken: string | null }>({csrfToken: null});

export const CsrfProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [csrfToken, setCsrfToken] = useState<string | null>(null);

    const fetchCsrfToken = useCallback(async () => {
        try {
            const token = await getCsrfToken();
            setCsrfToken(token);
        } catch (error) {
            console.error('Error fetching CSRF token:', error);
        }
    }, []);

    useEffect(() => {
        fetchCsrfToken();

        const refreshInterval = setInterval(fetchCsrfToken, 15 * 60 * 1000);

        return () => clearInterval(refreshInterval);
    }, [fetchCsrfToken]);

    return (
        <CsrfContext.Provider value={{csrfToken}}>
            {children}
        </CsrfContext.Provider>
    );
};

export const useCsrf = () => {
    const context = useContext(CsrfContext);
    if (context === undefined) {
        throw new Error('useCsrf must be used within a CsrfProvider');
    }
    return context;
};