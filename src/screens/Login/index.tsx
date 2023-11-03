import React, { useEffect } from 'react'
import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { CustomText, Divider, Wrapper } from '../../components'
import { ThemeColors } from '../../constants/ThemeColors'
import { PersonImage } from '../../assets'
import { authorize } from 'react-native-app-auth'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Login = () => {
    const navigation: any = useNavigation()
    const handleLogin = async () => {
        authenticate()
    }

    useEffect(() => {
        const checkTokenValidity = async () => {
            const accessToken = await AsyncStorage.getItem('token')
            const expirationDate = await AsyncStorage.getItem('expirationDate')
            console.log('acess token', accessToken)
            console.log('expiration date', expirationDate)

            if (accessToken && expirationDate) {
                const currentTime = Date.now()
                if (currentTime < parseInt(expirationDate)) {
                    // here the token is still valid
                    navigation.replace('App')
                } else {
                    // token would be expired so we need to remove it from the async storage
                    AsyncStorage.removeItem('token')
                    AsyncStorage.removeItem('expirationDate')
                }
            }
        }

        checkTokenValidity()
    }, [])

    async function authenticate() {
        const config = {
            issuer: 'https://accounts.spotify.com',
            clientId: '2e5ed778b0fa46c8b43be9a7c76fdf9a',
            redirectUrl: 'com.musicplayer.com://spotify-auth',
            scopes: [
                'user-read-email',
                'user-library-read',
                'user-read-recently-played',
                'user-top-read',
                'playlist-read-private',
                'playlist-read-collaborative',
                'playlist-modify-public' // or "playlist-modify-private"
            ]
        }
        const result = await authorize(config)
        console.log(result)
        if (result.accessToken) {
            const expirationDate = new Date(
                result.accessTokenExpirationDate
            ).getTime()
            AsyncStorage.setItem('token', result.accessToken)
            AsyncStorage.setItem('expirationDate', expirationDate.toString())
            navigation.navigate('App')
        }
    }
    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <ScrollView>
                <Wrapper>
                    <CustomText
                        color="yellow"
                        fontSize="largeCaps"
                        fontWeight="bold"
                    >
                        Rhythms
                    </CustomText>
                    <CustomText
                        color="white"
                        fontSize="largeCaps"
                        fontWeight="bold"
                    >
                        that Shake
                    </CustomText>
                    <CustomText
                        color="white"
                        fontSize="largeCaps"
                        fontWeight="bold"
                    >
                        Your Soul
                    </CustomText>
                    <Divider size={10} />
                    <CustomText
                        color="mediumGrey"
                        fontSize="h6"
                        fontWeight="400"
                    >
                        Play the music you like,explore
                    </CustomText>
                    <Divider size={5} />
                    <CustomText
                        color="mediumGrey"
                        fontSize="h6"
                        fontWeight="400"
                    >
                        songs,listen anytime and anywhere
                    </CustomText>
                    <Divider size={5} />
                    <CustomText
                        color="mediumGrey"
                        fontSize="h6"
                        fontWeight="400"
                    >
                        now it's easier
                    </CustomText>
                    <View style={styles.imageContainer}>
                        <Image
                            source={PersonImage}
                            style={styles.imageStyling}
                        />
                        <TouchableOpacity
                            onPress={handleLogin}
                            style={styles.btnStyling}
                        >
                            <CustomText color="black" fontWeight="bold">
                                Listen Now
                            </CustomText>
                        </TouchableOpacity>
                    </View>
                </Wrapper>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Login
const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: ThemeColors.darkBlue
    },
    imageContainer: {
        alignItems: 'center'
    },
    imageStyling: {
        width: 320,
        height: 340,
        resizeMode: 'contain',
        opacity: 0.5
    },
    btnStyling: {
        backgroundColor: ThemeColors.yellow,
        marginTop: 15,
        width: '100%',
        alignItems: 'center',
        padding: 15,
        borderRadius: 10
    }
})
