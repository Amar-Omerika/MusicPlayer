/**
 * @format
 */
import { AppRegistry } from 'react-native'
import App from './App'
import { name as appName } from './app.json'
import React, { useEffect } from 'react'
import AuthContextProvider from './src/context/AuthContext'

const MainApp = () => {
    return (
        <AuthContextProvider>
            <App />
        </AuthContextProvider>
    )
}

AppRegistry.registerComponent(appName, () => MainApp)
