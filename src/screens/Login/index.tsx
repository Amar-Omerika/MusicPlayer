import React from 'react'
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

const Login = () => {
    const navigation: any = useNavigation()
    const handleLogin = () => {
        navigation.navigate('App')
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
