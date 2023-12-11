/**
 * @format
 */
import { AppRegistry } from 'react-native'
import App from './App'
import { name as appName } from './app.json'
import React from 'react'
import AuthContextProvider from './src/context/AuthContext'
import ApiContextProvider from './src/context/ApiContext'
import PlayerContextProvider from './src/context/PlayerContext'

const MainApp = () => {
    return (
        <AuthContextProvider>
            <ApiContextProvider>
                <PlayerContextProvider>
                    <App />
                </PlayerContextProvider>
            </ApiContextProvider>
        </AuthContextProvider>
    )
}

AppRegistry.registerComponent(appName, () => MainApp)
