import React, { useEffect, useRef } from 'react'
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    Animated,
    Easing
} from 'react-native'
import Modal from 'react-native-modal'
import { usePlayer } from '../../context/PlayerContext'
import { useApi } from '../../context/ApiContext'
import { ThemeColors } from '../../constants/ThemeColors'
import {
    ArrowDownIcon,
    NextSongIcon,
    PlayMusicIcon,
    PreviousSongIcon
} from '../../assets'
import CustomText from '../Text/Text'
import Divider from '../Divider'

const SongModal = () => {
    const { currentPlayingSong, fetchCurrentPlayingSong } = useApi()
    const { setModalVisible, modalVisible } = usePlayer()
    const rotateValue = useRef(new Animated.Value(0)).current

    useEffect(() => {
        const rotateAnimation = Animated.timing(rotateValue, {
            toValue: 1,
            duration: 5000, // Adjust the duration as needed
            easing: Easing.linear,
            useNativeDriver: true,
            isInteraction: false
        })

        const startAnimation = () => {
            rotateValue.setValue(0)
            rotateAnimation.start(startAnimation)
        }

        startAnimation()
    }, [rotateValue])

    const rotate = rotateValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    })
    const songId = currentPlayingSong?.item?.name
    //fetch current song if it changes
    useEffect(() => {
        const fetchData = async () => {
            await fetchCurrentPlayingSong()
        }
        fetchData()
    }, [songId])
    return (
        <View style={{ flex: 1 }}>
            <Modal
                isVisible={modalVisible}
                style={{
                    margin: 0 // Remove default margin
                }}
            >
                <View style={styles.centeredView}>
                    <Image
                        style={{
                            flex: 1,
                            resizeMode: 'cover',
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            opacity: 0.1
                        }}
                        source={require('../../assets/jpg/headPhonesImage.jpg')}
                    />
                    <View style={styles.headerView}>
                        <TouchableOpacity
                            onPress={() => {
                                setModalVisible(false)
                            }}
                            style={{ margin: 5 }}
                        >
                            <ArrowDownIcon />
                        </TouchableOpacity>
                        <View style={styles.textHeaderView}>
                            <CustomText color="mediumGrey">
                                Play List
                            </CustomText>
                            <CustomText
                                color="white"
                                fontSize="h5"
                                fontWeight="700"
                            >
                                {currentPlayingSong?.item?.album?.name ||
                                    'Unknown Album'}
                            </CustomText>
                        </View>

                        <Divider direction="h" size={60} />
                    </View>
                    <Animated.Image
                        style={[
                            styles.imageStyling,
                            { transform: [{ rotate }] }
                        ]}
                        source={{
                            uri:
                                currentPlayingSong?.item?.album?.images[0]
                                    ?.url || 'defaultImageUrl'
                        }}
                    />
                    <View style={{ marginLeft: 20, marginTop: '15%' }}>
                        <CustomText fontWeight="bold" fontSize="h4">
                            Song
                        </CustomText>
                        <CustomText
                            fontWeight="normal"
                            fontSize="h6"
                            color="mediumGrey"
                        >
                            {currentPlayingSong?.item?.name || 'Unknown Song'}{' '}
                            {' \u25CF '}{' '}
                            {currentPlayingSong?.item?.album?.artists[0]
                                ?.name || 'Unknown Artist'}
                        </CustomText>
                    </View>

                    <View
                        style={{
                            marginTop: '50%',
                            flexDirection: 'row',
                            justifyContent: 'space-evenly'
                        }}
                    >
                        <View style={styles.previousAndNextButtons}>
                            <PreviousSongIcon />
                        </View>
                        <View style={styles.stopAndPlayButton}>
                            <PlayMusicIcon />
                        </View>
                        <View style={styles.previousAndNextButtons}>
                            <NextSongIcon />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default SongModal

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        backgroundColor: ThemeColors.lightBlack,
        width: '100%', // Full width
        height: '100%' // Full height
    },
    headerView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: '3%'
    },
    textHeaderView: {
        alignSelf: 'center',
        alignItems: 'center'
    },
    imageStyling: {
        width: 200,
        height: 200,
        borderRadius: 100,
        borderColor: ThemeColors.yellow,
        borderWidth: 5,
        alignSelf: 'center',
        marginTop: '15%'
    },
    previousAndNextButtons: {
        backgroundColor: ThemeColors.darkgrey,
        height: 50,
        width: 50,
        borderRadius: 100,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    stopAndPlayButton: {
        backgroundColor: ThemeColors.yellow,
        padding: 20,
        borderRadius: 100
    }
})
