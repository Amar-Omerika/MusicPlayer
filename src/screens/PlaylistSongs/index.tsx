import React, { useEffect, useState } from 'react'
import {
    FlatList,
    Image,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import LinearGradient from 'react-native-linear-gradient'
import { CustomText, Wrapper, AnimatedLoader } from '../../components'
import { ThemeColors } from '../../constants/ThemeColors'
import { useApi } from '../../context/ApiContext'
import { BackIcon } from '../../assets'

interface ItemProps {
    id?: string
    title: any
    image?: any
    artistName: string
    onPress?: any
}

const Item = ({ title, artistName, image, id, onPress }: ItemProps) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.btnStyling}
                onPress={() => onPress(id)}
            >
                <View style={styles.contentContainer}>
                    <Image
                        style={styles.itemImageStyling}
                        source={{ uri: image }}
                    />
                    <View
                        style={{
                            margin: 5
                        }}
                    >
                        <CustomText
                            fontSize="h5"
                            fontWeight="bold"
                            ellipsizeMode="tail"
                            numberOfLines={1}
                        >
                            {title}
                        </CustomText>
                        <CustomText color="mediumGrey">
                            Artist: {artistName}
                        </CustomText>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}
const FixedHeader = ({ handleBack }: any) => {
    return (
        <View style={styles.fixedHeaderContainer}>
            <TouchableOpacity onPress={handleBack}>
                <BackIcon style={{ margin: 10 }} />
            </TouchableOpacity>
            {/* Add other components for the fixed header */}
        </View>
    )
}
const PlaylistSongs = () => {
    const { fetchIndividualPlaylist, playlist } = useApi()
    const [loading, setLoading] = useState(true)
    const route = useRoute()
    const routeParams: { itemId?: string } = route?.params || {}
    const { itemId } = routeParams
    const navigation = useNavigation()

    const handlePress = (id: string) => {
        // Here we are going to set id of an track from playlist context
    }

    const handleBack = () => {
        navigation.goBack()
    }
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
            <FixedHeader handleBack={handleBack} />
            <FlatList
                data={playlist?.tracks.items}
                renderItem={({ item }) => (
                    <Item
                        title={item?.track.name}
                        artistName={item?.track.artists[0].name}
                        image={item?.track.album.images[0].url}
                        id={item?.track.id}
                    />
                )}
                keyExtractor={item => item?.track.id}
                ListHeaderComponent={() => (
                    <LinearGradient
                        colors={['#1b242e', 'rgba(239, 184, 13, 0.4)']}
                        start={{ x: 0.5, y: 1 }}
                        end={{ x: 0.5, y: 0 }}
                        style={styles.gradientContainer}
                    >
                        <View style={styles.imageContainer}>
                            <Image
                                source={{ uri: playlist?.images[0].url }}
                                style={styles.backgroundImage}
                            />
                        </View>
                        <View style={styles.contentHeaderContainer}>
                            <CustomText fontSize="h4" fontWeight="700">
                                {playlist?.name}
                            </CustomText>
                            <CustomText color="mediumGrey">
                                {playlist?.description}
                            </CustomText>
                            <View style={{ flexDirection: 'row' }}>
                                <CustomText color="mediumGrey" fontWeight="700">
                                    likes:{' '}
                                </CustomText>
                                <CustomText color="mediumGrey">
                                    {playlist?.followers.total.toLocaleString(
                                        'en-US',
                                        {
                                            style: 'decimal'
                                        }
                                    )}
                                </CustomText>
                            </View>
                        </View>
                    </LinearGradient>
                )}
            />
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
        flex: 1
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
    contentHeaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    backgroundImage: {
        flex: 1,
        borderRadius: 10,
        elevation: 10
    },
    //flatlist Song item styling
    container: {
        flex: 1,
        flexDirection: 'row',
        margin: 5
    },
    itemImageStyling: {
        width: 50,
        height: 50,
        borderRadius: 5
    },
    btnStyling: {
        flex: 1,
        flexDirection: 'row'
    },
    contentContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    fixedHeaderContainer: {
        paddingTop: 20,
        zIndex: 1
        // backgroundColor: ThemeColors.lightBlack
    }
})
