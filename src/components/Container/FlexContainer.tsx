import React from 'react';
import PropTypes from 'prop-types';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export type FlexContainerProps = {
    style?: StyleProp<ViewStyle>;
    direction?: 'column' | 'row',
    onPress?: () => void;
};

const FlexContainer: React.FC<FlexContainerProps> = ({
    style,
    direction,
    onPress,
    children,
}) =>
{
    const containerStyle: any = Object.assign({ ...styles.container, flexDirection: direction || 'column' }, style);
    return (
        <TouchableOpacity
            style={containerStyle}
            activeOpacity={1}
            onPress={onPress}
        >
            {children}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
    },
});

FlexContainer.propTypes = {
    style: PropTypes.any,
    direction: PropTypes.oneOf(['column', 'row']),
    onPress: PropTypes.func,
};

export default FlexContainer;
