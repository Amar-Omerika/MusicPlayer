import React, { useEffect } from 'react'
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import { CustomText, Wrapper, Song } from '../../components'
import { ThemeColors } from '../../constants/ThemeColors'

const SongsList = () => {
    useEffect(() => {
        console.log('test')
    }, [])
    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <ScrollView
                style={{
                    flex: 1
                }}
            >
                <Wrapper>
                    <Song />
                </Wrapper>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SongsList
const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: ThemeColors.lightBlack
    }
})
