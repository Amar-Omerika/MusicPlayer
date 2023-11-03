import React from 'react'

import { SafeAreaView, StyleSheet, Text } from 'react-native'
import { ThemeColors } from '../../constants/ThemeColors'

const Home = () => {
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
