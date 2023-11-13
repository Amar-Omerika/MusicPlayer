import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, TextInput, View } from 'react-native'
import { CustomText, Wrapper, SearchBox } from '../../components'
import { ThemeColors } from '../../constants/ThemeColors'

const SearchScreen = () => {
    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <Wrapper>
                <CustomText
                    fontSize="h4"
                    fontWeight="400"
                    style={{ marginTop: 20 }}
                >
                    Search
                </CustomText>
                <SearchBox />
            </Wrapper>
        </SafeAreaView>
    )
}

export default SearchScreen
const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: ThemeColors.lightBlack
    }
})
