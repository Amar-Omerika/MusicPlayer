import React, { useContext, createContext, useState } from 'react'

const PlayerContext = createContext(null)

export const usePlayer = (): any => {
    return useContext(PlayerContext)
}

const PlayerContextProvider = ({ children }: any) => {
    const [modalVisible, setModalVisible] = useState(false)
    const [songId, setSongId] = useState(false)

    const value: any = {
        modalVisible,
        setModalVisible,
        songId,
        setSongId
    }

    return (
        <PlayerContext.Provider value={value}>
            {children}
        </PlayerContext.Provider>
    )
}

export default PlayerContextProvider
