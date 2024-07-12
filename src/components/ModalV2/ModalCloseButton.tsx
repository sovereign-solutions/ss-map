import React from 'react';
import { StyleSheet, Text, Pressable } from 'react-native';


const ModalCloseButton: React.FC = () =>
{
    return (
        <Pressable
            style={styles.button}
            // onPress={() => setModalVisible(!modalVisible)}
        >
            <Text style={styles.textStyle}>X</Text>
        </Pressable>
    );
};


const styles = StyleSheet.create({
    button: {
        backgroundColor: 'white',
        borderRadius: 20,
        elevation: 2,
        padding: 5,
        position: 'absolute',
        right: 0,
        top: 0,
        width: 30,
    },
    textStyle: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});


export default ModalCloseButton;
