import { storiesOf } from '@storybook/react-native';

import React, { useState } from 'react';
import { StyleSheet, Text, Pressable, View } from 'react-native';
import Modal from './Modal';


const App = () =>
{
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <View>

            <Modal
                isOpen={modalVisible}
                size="full"
                onClose={() => setModalVisible(false)}
            >
                <Modal.Content>
                    <Modal.CloseButton />
                    <Modal.Header>Demo Modal</Modal.Header>

                    <Modal.Body>
                        <Text>body 1</Text>
                        <Text>body 2</Text>
                        <Text>body 3</Text>
                        <Text>body 4</Text>
                        <Text>body 5</Text>
                        <Text>body 6</Text>
                    </Modal.Body>

                    <Modal.Footer>
                        <Text>Footer</Text>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>

            <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.textStyle}>Show Modal</Text>
            </Pressable>
        </View>
    );
};


storiesOf('Utils', module).add('Modal', () => (
    <App />
));


const styles = StyleSheet.create({
    button: {
        borderRadius: 20,
        elevation: 2,
        padding: 10,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
