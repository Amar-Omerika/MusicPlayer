import React, { useEffect, useState } from 'react'

import { SafeAreaView, StyleSheet, Text, View, Image } from 'react-native'
import { ThemeColors } from '../../constants/ThemeColors'

import apiHelper from '../../utils/apiHelper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { CustomText, Wrapper } from '../../components'

const Home = () => {
    const [user, setUser] = useState<any>({})
    const [greetingMessage, setGreetingMessage] = useState<string>('')

    useEffect(() => {
        // Get the current time
        const currentHour = new Date().getHours()

        // Define the time ranges and corresponding greeting messages
        const greetingMessages = {
            morning: 'Good morning!',
            afternoon: 'Good afternoon!',
            evening: 'Good evening!',
            night: 'Good night!'
        }

        // Determine the appropriate greeting message based on the current time
        if (currentHour >= 5 && currentHour < 12) {
            setGreetingMessage(greetingMessages.morning)
        } else if (currentHour >= 12 && currentHour < 17) {
            setGreetingMessage(greetingMessages.afternoon)
        } else if (currentHour >= 17 && currentHour < 20) {
            setGreetingMessage(greetingMessages.evening)
        } else {
            setGreetingMessage(greetingMessages.night)
        }
    }, [])

    const fetchData = async () => {
        const token: string = (await AsyncStorage.getItem('token')) as string //type assertion
        try {
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
            <Wrapper>
                <View style={styles.header}>
                    <View style={styles.contentHeaderView}>
                        {user && user.images && user.images[1] && (
                            <Image
                                source={{ uri: user.images[1].url }}
                                style={styles.imageHeader}
                            />
                        )}

                        <View style={styles.headertext}>
                            <CustomText fontSize="h5" fontWeight="400">
                                {greetingMessage}
                            </CustomText>
                            <CustomText
                                color="mediumGrey"
                                fontSize="h6"
                                fontWeight="400"
                            >
                                Amar
                            </CustomText>
                        </View>
                    </View>
                </View>
            </Wrapper>
        </SafeAreaView>
    )
}

export default Home
const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: ThemeColors.lightBlack
    },
    header: {
        height: '10%',
        marginTop: 20
    },
    contentHeaderView: {
        flex: 1,
        flexDirection: 'row'
    },
    imageHeader: {
        height: 50,
        width: 50,
        borderRadius: 100,
        alignSelf: 'center',
        marginHorizontal: '2%'
    },
    headertext: {
        alignSelf: 'center'
    }
})
