import React, { useEffect, useState } from 'react'

import { SafeAreaView, StyleSheet, Text } from 'react-native'
import { ThemeColors } from '../../constants/ThemeColors'

import apiHelper from '../../utils/apiHelper'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Home = () => {
    const [user, setUser] = useState({})

    const fetchData = async () => {
        try {
            const token: string = (await AsyncStorage.getItem(
                'token'
            )) as string //type assertion
            const result = await apiHelper<string>(
                'get',
                '/me',
                undefined,
                undefined,
                token
            ) // GET request with Bearer token
            setUser(result.data)
        } catch (error) {
            console.error('Request Error:', error)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])
    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <Text>Home</Text>
        </SafeAreaView>
    )
}

export default Home
const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: ThemeColors.lightBlack
    }
})
