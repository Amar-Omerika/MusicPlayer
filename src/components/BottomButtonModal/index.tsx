import React, { useEffect } from 'react'
import CustomText from '../Text/Text'
import { Image, StyleSheet, View } from 'react-native'
import { useApi } from '../../context/ApiContext'
import { PlayMusicIcon, StopMusicIcon, AddToFavoritesIcon } from '../../assets'

const BottomButtonModal = () => {
    const { currentPlayingSong } = useApi()

    return (
        <>
            <View style={styles.container}>
                <Image
                    source={{
                        uri: currentPlayingSong?.item.album.images[0].url
                    }}
                    style={styles.imageStyling}
                />

                <View style={{ width: '50%', marginLeft: 5 }}>
                    <CustomText fontWeight="bold">
                        {currentPlayingSong?.item.name} {' \u25CF '}{' '}
                        {currentPlayingSong?.item.album.artists[0]?.name}
                    </CustomText>
                </View>

                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-evenly'
                    }}
                >
                    <AddToFavoritesIcon />
                    <PlayMusicIcon />
                </View>
            </View>
        </>
    )
}

export default BottomButtonModal
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        height: '10%',
        width: '95%',
        backgroundColor: 'rgba(239, 184, 13, 0.9)',
        alignSelf: 'center',
        position: 'absolute',
        bottom: 10,
        borderRadius: 10,
        padding: 5
    },
    imageStyling: {
        height: '100%',
        width: '20%',
        borderRadius: 10,
        alignSelf: 'center'
    }
})
