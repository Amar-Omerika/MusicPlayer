import React, { useState } from 'react'
import {
    FlatList,
    Image,
    SafeAreaView,
    StyleSheet,
    TextInput,
    View
} from 'react-native'
import { CustomText, Wrapper, SearchBox } from '../../components'
import { ThemeColors } from '../../constants/ThemeColors'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useApi } from '../../context/ApiContext'
interface ItemProps {
    title: any
    image?: any
    backgroundColor?: string // Add this line
}

const SearchScreen = () => {
    const { categories } = useApi()
    const Item = ({ title, image, backgroundColor }: ItemProps) => (
        <View style={[styles.itemParentView, { backgroundColor }]}>
            <View style={styles.itemContentView}>
                <CustomText
                    numberOfLines={2}
                    fontSize="h6"
                    fontWeight="700"
                    style={{
                        margin: 5,
                        width: '60%'
                    }}
                >
                    {title}
                </CustomText>
                <Image
                    source={{
                        uri: image
                    }}
                    style={styles.itemImageStyling}
                />
            </View>
        </View>
    )

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <Wrapper>
                <CustomText
                    fontSize="h3"
                    fontWeight="400"
                    style={{ marginTop: 20 }}
                >
                    Search
                </CustomText>
                <SearchBox />
                <CustomText
                    fontSize="h6"
                    fontWeight="400"
                    style={{ marginTop: 20 }}
                >
                    Browse categories
                </CustomText>
                <FlatList
                    data={categories?.categories.items}
                    showsHorizontalScrollIndicator={false} // optional, hide horizontal scrollbar
                    renderItem={({ item, index }) => (
                        <Item
                            title={item?.name}
                            image={item?.icons[0].url}
                            backgroundColor={
                                index % 2 === 0 ? 'lightblue' : 'lightgreen'
                            }
                        />
                    )}
                    keyExtractor={item => item?.id}
                    numColumns={2}
                />
            </Wrapper>
        </SafeAreaView>
    )
}

export default SearchScreen
const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: ThemeColors.lightBlack
    },
    itemParentView: {
        flex: 1
    },
    itemContentView: {
        height: '20%',
        flex: 1,
        margin: 5,
        borderRadius: 8,
        flexDirection: 'row',
        overflow: 'hidden'
    },
    itemImageStyling: {
        width: 70,
        height: 70,
        marginLeft: '5%',
        marginTop: '20%',
        borderRadius: 5,
        transform: [{ rotate: '110deg' }]
    }
})
