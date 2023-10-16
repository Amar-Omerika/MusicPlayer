import React from 'react'
import { SafeAreaView, Text } from 'react-native'
import { CustomText, Wrapper } from '../../components'

const Login = () => {
    return (
        <SafeAreaView>
            <Wrapper>
                <CustomText color="black" fontSize="h1" fontWeight="bold">
                    Rhythms
                </CustomText>
                <CustomText color="black" fontSize="h1">
                    that Shake
                </CustomText>
                <CustomText color="black" fontSize="h1">
                    Your Soul
                </CustomText>
            </Wrapper>
        </SafeAreaView>
    )
}

export default Login
