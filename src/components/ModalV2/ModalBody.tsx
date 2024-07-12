import React from 'react';
import { StyleSheet, View } from 'react-native';

export type Props = {
  children: JSX.Element|JSX.Element[];
};


const ModalBody: React.FC<any> = ({
    children,
}) =>
{
    return (
        <View style={styles.container}>{children}</View>
    );
};


const styles = StyleSheet.create({
    container: {
    },
});


export default ModalBody;
