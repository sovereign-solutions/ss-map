import React from 'react';
import { StyleSheet, View, ViewPropTypes } from 'react-native';
// import { ViewPropTypes } from 'deprecated-react-native-prop-types';
// "deprecated-react-native-prop-types": "5.0.0",

export interface CardProps{
    children?: JSX.Element|JSX.Element[];
    style?: any;
}

const Container: React.FC<CardProps> = (props: CardProps) =>
{
    
    return (
        <View style={{ ...styles.bg,...props.style }}>
            {props.children}
        </View>
    );
};
const bg = '#e6e6e6';
const styles = StyleSheet.create({
    bg: {
        backgroundColor: bg,
    },
});

Container.propTypes = {
    style: ViewPropTypes.style,
};

export default Container;
