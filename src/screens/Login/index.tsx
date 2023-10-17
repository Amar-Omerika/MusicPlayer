import React from 'react'
import { SafeAreaView, StyleSheet, Text } from 'react-native'
import { CustomText, Divider, Wrapper } from '../../components'
import { ThemeColors } from '../../constants/ThemeColors'

const Login = () => {
    return (
        <SafeAreaView style={styles.safeAreaContainer}>
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
                <CustomText color="mediumGrey" fontSize="h6" fontWeight="400">
                    Play the music you like,explore
                </CustomText>
                <Divider size={5} />
                <CustomText color="mediumGrey" fontSize="h6" fontWeight="400">
                    songs,listen anytime and anywhere
                </CustomText>
                <Divider size={5} />
                <CustomText color="mediumGrey" fontSize="h6" fontWeight="400">
                    now it's easier
                </CustomText>
            </Wrapper>
        </SafeAreaView>
    )
}

export default Login
const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: ThemeColors.darkBlue
    }
})
