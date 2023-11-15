import React, { useCallback, useState } from 'react'
import {
    FlatList,
    Image,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native'
import { CustomText, Wrapper, SearchBox } from '../../components'
import { ThemeColors } from '../../constants/ThemeColors'
import { useApi } from '../../context/ApiContext'
import { GridIcon, ListIcon } from '../../assets'
interface ItemProps {
    title: any
    image?: any
    ownerName?: string
}

const LibraryScreen = () => {
    const { currentUserPlaylist, user } = useApi()
    const [view, setView] = useState('list')
    const [filteredCategories, setFilteredCategories] = useState(
        currentUserPlaylist?.items
    )
    const handleView = (view: string) => {
        setView(view)
    }

    //To prevent retriggering the render every time the user types
    // something in the SearchBox component, we  use
    //the useCallback hook to memoize the handleSearch function.
    const handleSearch = useCallback(
        (searchText: string) => {
            const filteredData = currentUserPlaylist?.items.filter(
                (item: any) =>
                    item.name.toLowerCase().includes(searchText.toLowerCase())
            )
            setFilteredCategories(filteredData)
        },
        [currentUserPlaylist]
    )

    const ItemList = ({ title, image, ownerName }: ItemProps) => {
        return (
            <View style={styles.itemParentView}>
                <Image
                    source={{
                        uri: image
                    }}
                    style={styles.itemImageStyling}
                />
                <View style={styles.itemContentView}>
                    <CustomText
                        numberOfLines={1}
                        fontSize="h6"
                        fontWeight="700"
                        style={{
                            margin: 5
                        }}
                    >
                        {title}
                    </CustomText>
                    <CustomText
                        numberOfLines={1}
                        color="lightGrey"
                        fontWeight="400"
                        style={{ marginLeft: 5 }}
                    >
                        Playlist - {ownerName}
                    </CustomText>
                </View>
            </View>
        )
    }
    const ItemGrid = ({ title, image, ownerName }: ItemProps) => {
        return (
            <View style={[styles.itemParentGridView]}>
                <Image
                    source={{
                        uri: image
                    }}
                    style={styles.itemImageGridStyling}
                />
                <CustomText
                    numberOfLines={1}
                    fontSize="h6"
                    fontWeight="700"
                    style={{
                        marginTop: 5,
                        marginBottom: 5
                    }}
                >
                    {title}
                </CustomText>
                <CustomText
                    numberOfLines={1}
                    color="lightGrey"
                    fontWeight="400"
                    style={{ marginBottom: 5 }}
                >
                    Playlist - {ownerName}
                </CustomText>
            </View>
        )
    }

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
                            <CustomText fontSize="h4" fontWeight="bold">
                                Your Library
                            </CustomText>
                        </View>
                        {view === 'list' && (
                            <View style={styles.changeLayoutIcon}>
                                <TouchableOpacity
                                    onPress={() => handleView('grid')}
                                >
                                    <GridIcon />
                                </TouchableOpacity>
                            </View>
                        )}
                        {view === 'grid' && (
                            <View style={styles.changeLayoutIcon}>
                                <TouchableOpacity
                                    onPress={() => handleView('list')}
                                >
                                    <ListIcon />
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </View>
                <View style={{ paddingBottom: 10 }}>
                    <SearchBox
                        onSearch={handleSearch}
                        placeholder="Playlists..."
                    />
                </View>
                {view === 'list' ? (
                    <FlatList
                        key={'#'}
                        data={[...filteredCategories]}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => {
                            return (
                                <ItemList
                                    title={item?.name}
                                    image={item?.images[0].url}
                                    ownerName={item?.owner.display_name}
                                />
                            )
                        }}
                    />
                ) : (
                    <FlatList
                        key={'_'}
                        data={[...filteredCategories]}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => {
                            return (
                                <ItemGrid
                                    title={item?.name}
                                    image={item?.images[0].url}
                                    ownerName={item?.owner.display_name}
                                />
                            )
                        }}
                        numColumns={2}
                    />
                )}
            </Wrapper>
        </SafeAreaView>
    )
}

export default LibraryScreen
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
        height: 40,
        width: 40,
        borderRadius: 100,
        alignSelf: 'center',
        marginRight: '2%'
    },
    headertext: {
        alignSelf: 'center'
    },
    changeLayoutIcon: {
        alignSelf: 'center',
        marginLeft: 'auto'
    },
    //item List Styling
    itemParentView: {
        flex: 1,
        flexDirection: 'row',
        margin: 5
    },
    itemContentView: {
        flex: 1,
        borderRadius: 8
    },
    itemImageStyling: {
        width: 70,
        height: 70,
        borderRadius: 5
    },
    //itemGridStyling
    itemParentGridView: {
        flex: 1,
        margin: 5
    },
    itemImageGridStyling: {
        height: 150,
        flex: 1,
        borderRadius: 8,
        flexDirection: 'column'
    }
})
