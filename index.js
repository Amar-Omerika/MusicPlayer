/**
 * @format
 */
import { AppRegistry } from 'react-native'
import App from './App'
import { name as appName } from './app.json'
import React, { useEffect } from 'react'
import AuthContextProvider from './src/context/AuthContext'
import ApiContextProvider from './src/context/ApiContext'

const MainApp = () => {
    return (
        <AuthContextProvider>
            <ApiContextProvider>
                <App />
            </ApiContextProvider>
        </AuthContextProvider>
    )
}

AppRegistry.registerComponent(appName, () => MainApp)
