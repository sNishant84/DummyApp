import React, { createContext, useContext, useEffect, useState } from 'react';
import type { JSX, ReactNode } from 'react';
import { demoCredentials } from '../config/credentials';

interface AuthContextType {
    isLogin: boolean;
    setLogin: React.Dispatch<React.SetStateAction<boolean>>;
    login: (email: string, password: string) => boolean;
}

const defaultContextValue: AuthContextType = {
    isLogin: false,
    setLogin: () => {},
    login: () => false
};

const AuthContext = createContext<AuthContextType>(defaultContextValue);

interface AuthProviderProps {
    children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
    const [isLogin, setLogin] = useState<boolean>(() => {
        const savedAuthStatus = localStorage.getItem('isLoggedIn');
        return savedAuthStatus === 'true';
    });

    if (!demoCredentials || demoCredentials.length === 0) {
        console.warn('No demo credentials found in config file');
    }

    const login = (email: string, password: string): boolean => {
        if (!demoCredentials || demoCredentials.length === 0) {
            console.error('No demo credentials available');
            return false;
        }

        const isValid = demoCredentials.some(
            (cred: { email: string; password: string }) => cred.email === email && cred.password === password
        );
        
        if (isValid) {
            setLogin(true);
            return true;
        }
        return false;
    };

    useEffect(() => {
        localStorage.setItem('isLoggedIn', JSON.stringify(isLogin));
    }, [isLogin]);

    return (
        <AuthContext.Provider value={{ isLogin, setLogin, login }}>
            {children}
        </AuthContext.Provider>
    );
}

const useAuth = (): AuthContextType => useContext(AuthContext);

export { AuthProvider, useAuth };
