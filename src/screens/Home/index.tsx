import React, { useEffect, useState } from 'react'
import {
    SafeAreaView,
    StyleSheet,
    View,
    Image,
    FlatList,
    ImageBackground,
    TouchableOpacity
} from 'react-native'
import { BlurView } from '@react-native-community/blur'
import { ThemeColors } from '../../constants/ThemeColors'
import {
    CustomText,
    Wrapper,
    AnimatedLoader,
    BottomButtonModal,
    SongModal
} from '../../components'
import { HomePlayIcon } from '../../assets'
import { useApi } from '../../context/ApiContext'
import { ScrollView } from 'react-native-gesture-handler'
import { useAuth } from '../../context/AuthContext'
import { useNavigation } from '@react-navigation/native'

interface ItemProps {
    id?: string
    title: any
    coverImage?: any
    description: string
    onPress: any
}
interface ItemNewReleaseProps {
    title: any
    coverImage?: any
}
interface ItemUserPlaylist {
    title: any
    coverImage?: any
}

const Item = ({ title, description, coverImage, id, onPress }: ItemProps) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={{ flex: 1 }} onPress={() => onPress(id)}>
                <ImageBackground
                    source={{ uri: coverImage }}
                    style={styles.backgroundImage}
                >
                    <BlurView
                        style={styles.absolute}
                        blurType="light"
                        blurAmount={20}
                        reducedTransparencyFallbackColor="white"
                    />
                    <View style={styles.itemCardBluredViewContent}>
                        <View style={styles.leftItemCardBluredViewContent}>
                            <CustomText
                                numberOfLines={1}
                                fontSize="h5"
                                fontWeight="bold"
                                style={styles.titleMostPopularPadding}
                            >
                                {title}
                            </CustomText>
                            <CustomText
                                numberOfLines={1}
                                color="lightGrey"
                                fontWeight="400"
                                style={styles.subtitleMostPopularPadding}
                            >
                                {description}
                            </CustomText>
                        </View>
                        <View style={styles.rightItemCardBluredViewContent}>
                            <View style={styles.playIconView}>
                                <HomePlayIcon />
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        </View>
    )
}

const ItemNewRelease = ({ title, coverImage }: ItemNewReleaseProps) => (
    <View style={styles.container1}>
        <ImageBackground
            source={{ uri: coverImage }}
            style={styles.backgroundImage}
        >
            <BlurView
                style={styles.absolute}
                blurType="light"
                blurAmount={20}
                reducedTransparencyFallbackColor="white"
            />
            <View style={styles.itemCardBluredViewContent}>
                <View style={styles.leftItemCardBluredViewContent}>
                    <CustomText
                        numberOfLines={2}
                        fontSize="h5"
                        fontWeight="bold"
                        style={styles.titleMostPopularPadding}
                    >
                        {title}
                    </CustomText>
                </View>
            </View>
        </ImageBackground>
    </View>
)

const ItemUserPlaylist = ({ title, coverImage }: ItemUserPlaylist) => (
    <View style={styles.container1}>
        <ImageBackground
            source={{ uri: coverImage }}
            style={styles.backgroundImage}
        >
            <BlurView
                style={styles.absolute}
                blurType="light"
                blurAmount={20}
                reducedTransparencyFallbackColor="white"
            />
            <View style={styles.itemCardBluredViewContent}>
                <View style={styles.leftItemCardBluredViewContent}>
                    <CustomText
                        numberOfLines={2}
                        fontSize="h5"
                        fontWeight="bold"
                        style={styles.titleMostPopularPadding}
                    >
                        {title}
                    </CustomText>
                </View>
            </View>
        </ImageBackground>
    </View>
)

const Home = () => {
    const {
        user,
        mostPopularPlaylist,
        newReleasePlaylist,
        currentUserPlaylist,
        fetchUserData,
        fetchMostPopularPlaylist,
        fetchNewReleasePlaylist,
        fetchCurrentUserPlaylist,
        fetchCategories,
        fetchCurrentPlayingSong,
        currentPlayingSong
    } = useApi()
    const { token } = useAuth()
    const [loading, setLoading] = useState(true)
    const [greetingMessage, setGreetingMessage] = useState<string>('')
    const [modalVisible, setModalVisible] = useState<boolean>(false)

    const songId = currentPlayingSong?.item?.name
    //fetch current song if it changes
    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchCurrentPlayingSong()
            } catch (error) {
                console.error('Error fetching data:', error)
                // Handle the error, show a message, etc.
            } finally {
            }
        }
        fetchData()
    }, [songId])
    //useEffect for greeting message
    useEffect(() => {
        // Get the current time
        const currentHour = new Date().getHours()

        // Define the time ranges and corresponding greeting messages
        const greetingMessages = {
            morning: 'Good morning!',
            afternoon: 'Good afternoon!',
            evening: 'Good evening!',
            night: 'Good night!'
        }

        // Determine the appropriate greeting message based on the current time
        if (currentHour >= 5 && currentHour < 12) {
            setGreetingMessage(greetingMessages.morning)
        } else if (currentHour >= 12 && currentHour < 17) {
            setGreetingMessage(greetingMessages.afternoon)
        } else if (currentHour >= 17 && currentHour < 20) {
            setGreetingMessage(greetingMessages.evening)
        } else {
            setGreetingMessage(greetingMessages.night)
        }
    }, [])
    //useEffect for fetching data
    useEffect(() => {
        if (token) {
            const fetchData = async () => {
                setLoading(true)
                try {
                    // Fetch data for all APIs
                    await Promise.all([
                        fetchUserData(),
                        fetchMostPopularPlaylist(),
                        fetchNewReleasePlaylist(),
                        fetchCurrentUserPlaylist(),
                        fetchCategories()
                    ])
                } catch (error) {
                    console.error('Error fetching data:', error)
                } finally {
                    setLoading(false)
                }
            }
            fetchData()
        }
    }, [token])

    const navigation: any = useNavigation()

    const handlePress = (id: string) => {
        // Navigate to another screen and pass the id as a prop
        navigation.navigate('PlaylistSongs', { itemId: id })
    }
    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            {!loading ? (
                <ScrollView
                    style={{
                        flex: 1
                    }}
                >
                    <Wrapper marginBottom={85}>
                        <View style={styles.header}>
                            <View style={styles.contentHeaderView}>
                                {user && user.images && user.images[1] && (
                                    <Image
                                        source={{ uri: user.images[1].url }}
                                        style={styles.imageHeader}
                                    />
                                )}

                                <View style={styles.headertext}>
                                    <CustomText fontSize="h5" fontWeight="400">
                                        {greetingMessage}
                                    </CustomText>
                                    <CustomText
                                        color="mediumGrey"
                                        fontSize="h6"
                                        fontWeight="400"
                                    >
                                        {user && user.display_name}
                                    </CustomText>
                                </View>
                            </View>
                        </View>
                        <CustomText
                            fontSize="h4"
                            fontWeight="400"
                            style={{ marginTop: 10 }}
                        >
                            {mostPopularPlaylist &&
                                mostPopularPlaylist?.message}
                        </CustomText>
                        <View>
                            <FlatList
                                data={mostPopularPlaylist?.playlists.items}
                                horizontal
                                showsHorizontalScrollIndicator={false} // optional, hide horizontal scrollbar
                                renderItem={({ item }) => (
                                    <Item
                                        title={item?.name}
                                        description={item?.description}
                                        coverImage={item?.images[0].url}
                                        id={item?.id}
                                        onPress={handlePress}
                                    />
                                )}
                                keyExtractor={item => item?.id}
                            />
                        </View>
                        <CustomText
                            fontSize="h4"
                            fontWeight="400"
                            style={{ marginTop: 20 }}
                        >
                            New Release
                        </CustomText>
                        <View>
                            <FlatList
                                data={newReleasePlaylist?.albums.items}
                                horizontal
                                showsHorizontalScrollIndicator={false} // optional, hide horizontal scrollbar
                                renderItem={({ item }) => (
                                    <ItemNewRelease
                                        title={item?.name}
                                        coverImage={item && item?.images[0].url}
                                    />
                                )}
                                keyExtractor={item => item?.id}
                            />
                        </View>
                        <CustomText
                            fontSize="h4"
                            fontWeight="400"
                            style={{ marginTop: 20 }}
                        >
                            My playlists
                        </CustomText>
                        <View style={{ marginBottom: 30 }}>
                            <FlatList
                                data={currentUserPlaylist?.items}
                                horizontal
                                showsHorizontalScrollIndicator={false} // optional, hide horizontal scrollbar
                                renderItem={({ item }) => (
                                    <ItemUserPlaylist
                                        title={item?.name}
                                        coverImage={item?.images[0].url}
                                    />
                                )}
                                keyExtractor={item => item?.id}
                            />
                        </View>
                    </Wrapper>
                    <SongModal />
                </ScrollView>
            ) : (
                <AnimatedLoader />
            )}
            {currentPlayingSong ? <BottomButtonModal /> : null}
        </SafeAreaView>
    )
}

export default Home
const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: ThemeColors.lightBlack
    },
    header: {
        height: '10%',
        marginTop: 20
    },
    contentHeaderView: {
        flex: 1,
        flexDirection: 'row'
    },
    imageHeader: {
        height: 50,
        width: 50,
        borderRadius: 100,
        alignSelf: 'center',
        marginHorizontal: '2%'
    },
    headertext: {
        alignSelf: 'center'
    },
    //most popular flatlist item styling
    container: {
        height: 200,
        width: 280,
        marginRight: 10,
        marginTop: 10,
        borderRadius: 20,
        overflow: 'hidden' // Clip the image and blur within the container
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%'
    },
    absolute: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        right: 0,
        height: 70
    },
    titleText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    },
    itemCardBluredViewContent: {
        flexDirection: 'row',
        width: '100%',
        height: 70,
        position: 'absolute',
        bottom: 0
    },
    leftItemCardBluredViewContent: {
        width: '70%',
        flexDirection: 'column'
    },
    rightItemCardBluredViewContent: {
        width: '30%'
    },
    playIconView: {
        marginTop: '19%',
        marginLeft: '31%',
        backgroundColor: ThemeColors.yellow,
        borderRadius: 100
    },
    titleMostPopularPadding: {
        paddingTop: 10,
        paddingLeft: 10
    },
    subtitleMostPopularPadding: { paddingLeft: 10 },
    //new Release flatlist item styling
    container1: {
        height: 200,
        width: 180,
        marginRight: 10,
        marginTop: 10,
        borderRadius: 20,
        overflow: 'hidden' // Clip the image and blur within the container
    },

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: '#F194FF'
    }
})
