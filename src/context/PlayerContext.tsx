import React, { useContext, createContext, useState } from 'react'

const PlayerContext = createContext(null)

export const useAuth = (): any => {
    return useContext(PlayerContext)
}

const PlayerContextProvider = ({ children }: any) => {
    const [modalVisible, setModalVisible] = useState(false)
    const [songId, setSongId] = useState(false)
    const [bottomButtonVisible, setBottomButtomVisible] = useState(true)

    const value: any = {
        modalVisible,
        setModalVisible,
        songId,
        setSongId,
        bottomButtonVisible
    }

    return (
        <PlayerContext.Provider value={value}>
            {children}
        </PlayerContext.Provider>
    )
}

export default PlayerContextProvider
