import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export type Props = {
  children: string;
};


const ModalHeader: React.FC<any> = ({
    children,
}) =>
{
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{children}</Text>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        borderBottomColor: '#e1e1e1',
        borderBottomWidth: 1,
        padding: 10,
        width: '100%',
    },
    title: {
        backgroundColor: 'white',
        fontSize: 20,
    },
});


export default ModalHeader;
