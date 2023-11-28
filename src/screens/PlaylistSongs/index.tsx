import React, { useEffect, useState } from 'react'
import {
    Image,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View
} from 'react-native'
import { CustomText, Wrapper, Song } from '../../components'
import { ThemeColors } from '../../constants/ThemeColors'
import { useRoute } from '@react-navigation/native'
import { useApi } from '../../context/ApiContext'
import LinearGradient from 'react-native-linear-gradient'

const PlaylistSongs = () => {
    const { fetchIndividualPlaylist, playlist } = useApi()
    const [loading, setLoading] = useState(true)
    const route = useRoute()
    const routeParams: { itemId?: string } = route?.params || {}
    const { itemId } = routeParams

    //useEffect for fetching data
    useEffect(() => {
        if (itemId) {
            const fetchData = async () => {
                setLoading(true)
                try {
                    // Fetch data for all
                    fetchIndividualPlaylist(itemId)
                } catch (error) {
                    console.error('Error fetching data:', error)
                } finally {
                    setLoading(false)
                }
            }
            fetchData()
        }
    }, [itemId])
    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <ScrollView
                style={{
                    flex: 1
                }}
            >
                <LinearGradient
                    colors={['#1b242e', 'rgba(239, 184, 13, 0.4)']} // Yellow to orange gradient colors
                    start={{ x: 0.5, y: 1 }} // Start from the bottom
                    end={{ x: 0.5, y: 0 }} // End at the top
                    style={styles.gradientContainer}
                >
                    <View style={styles.imageContainer}>
                        <Image
                            source={{ uri: playlist?.images[0].url }}
                            style={styles.backgroundImage}
                        />
                    </View>
                    <CustomText fontSize="h4" fontWeight="700">
                        {playlist?.name}
                    </CustomText>
                    <CustomText color="mediumGrey">
                        {playlist?.description}
                    </CustomText>
                    <View style={{ flexDirection: 'row' }}>
                        <CustomText color="mediumGrey" fontWeight="700">
                            followers:{' '}
                        </CustomText>
                        <CustomText color="mediumGrey">
                            {playlist?.followers.total.toLocaleString('en-US', {
                                style: 'decimal'
                            })}
                        </CustomText>
                    </View>
                </LinearGradient>

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
    },
    gradientContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        height: 200,
        width: 200,
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 20,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { width: 0, height: 5 },
                shadowOpacity: 0.3,
                shadowRadius: 4
            },
            android: {
                elevation: 10
            }
        })
    },
    backgroundImage: {
        flex: 1,
        borderRadius: 10,
        elevation: 10
    }
})
