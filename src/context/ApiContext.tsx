import React, { useContext, createContext, useState } from 'react'

const ApiContext = createContext(null)

export const useApi = (): any => {
    return useContext(ApiContext)
}

const ApiContextProvider = ({ children }: any) => {
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(null)
    const [mostPopularPlaylist, setMostPopularPlaylist] = useState()
    const [newReleasePlaylist, setNewReleasePlaylist] = useState()
    const [currentUserPlaylist, setcurrentUserPlaylist] = useState()

    const value: any = {
        user,
        setUser,
        mostPopularPlaylist,
        setMostPopularPlaylist,
        newReleasePlaylist,
        setNewReleasePlaylist,
        currentUserPlaylist,
        setcurrentUserPlaylist,
        loading,
        setLoading
    }

    return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>
}

export default ApiContextProvider
