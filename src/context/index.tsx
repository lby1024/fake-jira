import React, { FC } from "react";
import { ILogin, IRegist } from "tools/api";
import { IUser } from "tools/user";

export interface IUserContext {
    userInfo: IUser | null;
    regist: (data: IRegist) => Promise<void>;
    login: (data: ILogin) => Promise<void>;
    logout: () => Promise<void>;
}

export const UserContext = React.createContext<IUserContext|undefined>(undefined)
UserContext.displayName="userContext"

export const UserProvider: FC = ({children}) => {
    const userInfo = null

    const regist = async (data: IRegist) => {}
    const login = async (data: ILogin) => {}
    const logout = async () => {}

    return <UserContext.Provider value={{userInfo, regist, login, logout}} >
        {children}
    </UserContext.Provider>
}
