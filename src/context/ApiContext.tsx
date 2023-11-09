import React, { useContext, createContext, useState } from 'react'

const ApiContext = createContext(null)

export const useApi = (): any => {
    return useContext(ApiContext)
}

const ApiContextProvider = ({ children }: any) => {
    const [user, setUser] = useState(null)
    const [mostPopularPlaylist, setMostPopularPlaylist] = useState()
    const [newReleasePlaylist, setNewReleasePlaylist] = useState()

    const value: any = {
        user,
        setUser,
        mostPopularPlaylist,
        setMostPopularPlaylist,
        newReleasePlaylist,
        setNewReleasePlaylist
    }

    return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>
}

export default ApiContextProvider
