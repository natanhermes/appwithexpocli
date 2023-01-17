import { createContext, ReactNode, useEffect, useState } from "react";

import { storageAuthTokenSave, storageAuthTokenGet, storageAuthTokenRemove } from "../storage/storageAuthToken";
import { storageUserSave, storageUserGet, storageUserRemove } from "../storage/storageUser";

import { UserDTO, User } from "../dtos/UserDTO";
import { api } from "../services/api";
import { AppError } from "../utils/AppError";

export type AuthContextDataProps = {
    user: User;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    isLoadingUserStorage: boolean;
}

type AuthContextProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
    const [user, setUser] = useState<User>({} as User);

    const [isLoadingUserStorage, setIsLoadingUserStorage] = useState(true);

    async function userAndTokenUpdate(responseLogin: UserDTO) {
        try {            
            const { access_token, employeeUuid } = responseLogin;
            
            api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

            const { data: userData } = await api.get(`/employees/${employeeUuid}`);

            await storageUserSave(userData);
            setUser(userData);
            
        } catch (err) {
            throw err;
        }
    }

    async function login(email: string, password: string) {
        try {
            const { data } = await api.post('/authentication/login', { email, password });
            
            if (data.access_token && data.employeeUuid) {
                setIsLoadingUserStorage(true);

                await storageAuthTokenSave(data.access_token);

                userAndTokenUpdate(data);
            } else {
                throw new AppError('Erro interno. Entre em contato com o suporte!')
            }
        } catch (err) {
            throw err;
        } finally {
            setIsLoadingUserStorage(false);
        }
    }

    async function logout() {
        try {
            setIsLoadingUserStorage(true);
            setUser({} as User);
            await storageUserRemove();
            await storageAuthTokenRemove();
        } catch (error) {
            throw error;
        } finally {
            setIsLoadingUserStorage(false);
        }
    }

    async function loadUserData() {
        try {
            setIsLoadingUserStorage(true);

            const userLogged = await storageUserGet();
            const token = await storageAuthTokenGet();

            if (token && userLogged) {
                userAndTokenUpdate({access_token: token, employeeUuid: userLogged.uuid});
            }
        } catch (err) {
            throw err;
        } finally {
            setIsLoadingUserStorage(false);
        }
    }

    useEffect(() => {
        loadUserData();
    }, []);

    return (
        <AuthContext.Provider value={{
            user,
            login,
            logout,
            isLoadingUserStorage
        }}>
            {children}
        </AuthContext.Provider>
    )
}
