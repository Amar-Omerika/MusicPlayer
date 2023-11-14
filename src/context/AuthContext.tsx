import React, { useContext, createContext, useState } from 'react'

const AuthContext = createContext(null)

export const useAuth = (): any => {
    return useContext(AuthContext)
}

const AuthContextProvider = ({ children }: any) => {
    const [token, setToken] = useState(null)
    console.log(token)

    const value: any = {
        token,
        setToken
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContextProvider
