import React from 'react'
import { SafeAreaView, StyleSheet, Text } from 'react-native'
import { CustomText, Wrapper } from '../../components'
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
