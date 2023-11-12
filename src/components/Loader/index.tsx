import React from 'react'
import LottieView from 'lottie-react-native'

const AnimationLoader = () => {
    return (
        <LottieView
            style={{ flex: 1, justifyContent: 'center' }}
            source={require('../../assets/musicLoader.json')}
            autoPlay
            loop
        />
    )
}
export default AnimationLoader
