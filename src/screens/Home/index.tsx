import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
    SafeAreaView,
    StyleSheet,
    View,
    Image,
    FlatList,
    ImageBackground
} from 'react-native'
import { BlurView } from '@react-native-community/blur'
import { ThemeColors } from '../../constants/ThemeColors'
import apiHelper from '../../utils/apiHelper'
import { CustomText, Wrapper } from '../../components'
import { HomePlayIcon } from '../../assets'

const Home = () => {
    const [user, setUser] = useState<any>({})
    const [greetingMessage, setGreetingMessage] = useState<string>('')
    const [mostPopularPlaylist, setMostPopularPlaylist] = useState<any>()

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
    const fetchUserData = async () => {
        const token: string = (await AsyncStorage.getItem('token')) as string //type assertion
        try {
            const result = await apiHelper<string>(
                'get',
                '/me',
                undefined,
                undefined,
                token
            ) // GET request with Bearer token
            setUser(result.data)
        } catch (error) {
            console.error('Request Error:', error)
        }
    }
    const fetchMostPopularPlaylist = async () => {
        const token: string = (await AsyncStorage.getItem('token')) as string //type assertion
        try {
            const result = await apiHelper<string>(
                'get',
                '/browse/featured-playlists',
                undefined,
                undefined,
                token
            ) // GET request with Bearer token
            setMostPopularPlaylist(result.data)
        } catch (error) {
            console.error('Request Error:', error)
        }
    }
    useEffect(() => {
        fetchUserData()
        fetchMostPopularPlaylist()
    }, [])
    const DATA = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            title: 'First Item'
        },
        {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            title: 'Second Item'
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            title: 'Third Item'
        }
    ]
    interface ItemProps {
        title: any
        coverImage?: any
        description: string
    }

    const Item = ({ title, description, coverImage }: ItemProps) => (
        <View style={styles.container}>
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
        </View>
    )

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <Wrapper>
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
                    {mostPopularPlaylist && mostPopularPlaylist?.message}
                </CustomText>
                <FlatList
                    data={mostPopularPlaylist?.playlists.items}
                    horizontal
                    showsHorizontalScrollIndicator={false} // optional, hide horizontal scrollbar
                    renderItem={({ item }) => (
                        <Item
                            title={item?.name}
                            description={item?.description}
                            coverImage={item?.images[0].url}
                        />
                    )}
                    keyExtractor={item => item.id}
                />
            </Wrapper>
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
    subtitleMostPopularPadding: { paddingLeft: 10 }
})
