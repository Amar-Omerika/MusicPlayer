import React from 'react'
import { Alert, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
interface Props {
    modalVisible: boolean
    setModalVisible: any
}
const SongModal = ({ modalVisible, setModalVisible }: Props) => {
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.')
                    setModalVisible(!modalVisible)
                }}
            >
                <View style={styles.centeredView}>
                    <View>
                        <Text>Hello World!</Text>
                        <Pressable
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text>Hide Modal</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setModalVisible(true)}
            >
                <Text>Show Modal</Text>
            </Pressable>
        </View>
    )
}

export default SongModal
const styles = StyleSheet.create({
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
