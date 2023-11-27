import React, { useEffect } from 'react'
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import { CustomText, Wrapper, Song } from '../../components'
import { ThemeColors } from '../../constants/ThemeColors'
import { useRoute } from '@react-navigation/native'

const PlaylistSongs = () => {
    const route = useRoute()
    const routeParams: { itemId?: string } = route?.params || {}
    const { itemId } = routeParams

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

export default PlaylistSongs
const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: ThemeColors.lightBlack
    }
})
