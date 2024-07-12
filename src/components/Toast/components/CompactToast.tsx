import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { BaseToastProps } from '../types';
import { getTestId } from '../utils';
import { BORDER_RADIUS, styles as baseStyles } from './BaseToast.styles';
import { Touchable } from './Touchable';
import { SvgIcon } from '../../../index';

const WIDTH = Dimensions.get('window').width;

export function CompactToast({
    title,
    message,
    onPress,
    activeOpacity,
    style,
    touchableContainerProps,
    contentContainerStyle,
    contentContainerProps,
    titleStyle,
    titleNumberOfLines = 1,
    titleProps,
    messageStyle,
    messageNumberOfLines = 2,
    messageProps,
    hide,
}: BaseToastProps)
{
    const { t } = useTranslation();
    return (
        <Touchable
            testID={getTestId('TouchableContainer')}
            activeOpacity={activeOpacity}
            style={[styles.base, style]}
            onPress={onPress}
            {...touchableContainerProps}
        >
            <Text
                testID={getTestId('message')}
                style={[styles.message, messageStyle]}
                numberOfLines={messageNumberOfLines}
                ellipsizeMode="tail"
                {...messageProps}
            >
                {message ? t(message) : ''}
            </Text>
        </Touchable>
    );
}

const styles = StyleSheet.create({
    base: {
        flexShrink: 1,
        padding: 9,
        paddingHorizontal: 28,
        backgroundColor: '#3A4F62',
        borderRadius: 50,
    },
    message: {
        color: '#FFF',
        fontSize: 14,
        // fontWeight: 'bold',
    },
});
