import React from 'react';
import { StyleSheet, View } from 'react-native';

export type Props = {
  children: JSX.Element|JSX.Element[];
};


const ModalContent: React.FC<any> = ({
    children,
}) =>
{
    return (
        <View style={styles.content}>{children}</View>
    );
};


const styles = StyleSheet.create({
    content: {
        // backgroundColor: 'white',
        borderRadius: 10,
        // borderWidth: 0,
        overflow: 'hidden',
        width: '100%',
    },
});


export default ModalContent;
