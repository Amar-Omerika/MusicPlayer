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
import { ThemeColors } from '../../constants/ThemeColors'
import { ArrowDownIcon } from '../../assets'
import CustomText from '../Text/Text'
import Divider from '../Divider'

const SongModal = () => {
    const { setModalVisible } = usePlayer()
    var modalVisible = true
    const rotateValue = useRef(new Animated.Value(0)).current

    useEffect(() => {
        const rotateAnimation = Animated.timing(rotateValue, {
            toValue: 1,
            duration: 8000, // Adjust the duration as needed
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
    return (
        <View style={{ flex: 1 }}>
            <Modal
                isVisible={modalVisible}
                style={{
                    margin: 0 // Remove default margin
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.headerView}>
                        <TouchableOpacity style={{ margin: 5 }}>
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
                                Phonk
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
                            uri: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bXVzaWN8ZW58MHx8MHx8fDA%3D'
                        }}
                    />
                    {/* Add the content of your modal here */}
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
    }
})
