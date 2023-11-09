import React, { useEffect } from 'react'
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import Navigator from './src/navigation'
import { useAuth } from './src/context/AuthContext'
import AsyncStorage from '@react-native-async-storage/async-storage'

const App = () => {
    const { token, setToken } = useAuth()
    useEffect(() => {
        const checkTokenValidity = async () => {
            const accessToken = await AsyncStorage.getItem('token')
            const expirationDate = await AsyncStorage.getItem('expirationDate')
            // console.log('acess token', accessToken)
            // console.log('expiration date', expirationDate)

            if (accessToken && expirationDate) {
                const currentTime = Date.now()
                if (currentTime < parseInt(expirationDate)) {
                    // here the token is still valid
                    setToken(accessToken)
                } else {
                    // token would be expired so we need to remove it from the async storage
                    AsyncStorage.removeItem('token')
                    AsyncStorage.removeItem('expirationDate')
                    setToken(null)
                }
            }
        }

        checkTokenValidity()
    }, [])

    return (
        <NavigationContainer>
            <Navigator />
        </NavigationContainer>
    )
}
export default App
