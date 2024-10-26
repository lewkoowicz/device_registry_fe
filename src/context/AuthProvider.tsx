import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {useLanguage} from './LanguageProvider.tsx'
import {signin as apiLogin, signout as apiSignout, signup as apiSignup} from "../services/authService";

interface AuthContextType {
    isSignedIn: boolean;
    signin: (email: string, password: string) => Promise<void>;
    signup: (email: string, password: string) => Promise<void>;
    signout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const {language} = useLanguage();
    const [isSignedIn, setIsSignedIn] = useState<boolean>(() => {
        return localStorage.getItem('isSignedIn') === 'true';
    });

    const signin = async (email: string, password: string) => {
        const user = await apiLogin(email, password, language);
        if (user) {
            setIsSignedIn(true);
            localStorage.setItem('isSignedIn', 'true');
        }
    };

    const signup = async (email: string, password: string) => {
        const user = await apiSignup(email, password, language);
        if (user) {
            setIsSignedIn(true);
            localStorage.setItem('isSignedIn', 'true');
        }
    };

    const signout = async () => {
        await apiSignout(language);
        setIsSignedIn(false);
        localStorage.removeItem('isSignedIn');
        const newUrl = `${window.location.origin}/sign-in`;
        window.location.replace(newUrl);
        setTimeout(() => {
            window.location.reload();
        }, 500);
    };

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const isAuthenticated = localStorage.getItem('isSignedIn') === 'true';
                setIsSignedIn(isAuthenticated);
            } catch (error) {
                console.error('Error checking auth status:', error);
            }
        };

        checkAuthStatus();
    }, []);

    return (
        <AuthContext.Provider value={{isSignedIn, signin, signup, signout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};