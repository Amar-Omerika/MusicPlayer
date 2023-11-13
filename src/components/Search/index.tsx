import React, { useState } from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import { SearchInActiveIcon } from '../../assets'

const SearchBox = ({ onSearch }: any) => {
    const [searchText, setSearchText] = useState<string>('')

    const handleSearch = () => {
        // Perform search or pass searchText to a parent component for handling
        onSearch(searchText)
    }

    return (
        <View style={styles.container}>
            <SearchInActiveIcon style={styles.icon} />
            <TextInput
                style={styles.input}
                placeholder="Categories"
                value={searchText}
                onChangeText={text => {
                    setSearchText(text)
                    onSearch(text) // Call the onSearch prop whenever the text changes
                }}
                onSubmitEditing={handleSearch}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: 'white',
        marginTop: 10
    },
    icon: {
        marginRight: 10
    },
    input: {
        flex: 1,
        height: 40
    }
})

export default SearchBox
