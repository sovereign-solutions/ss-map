import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { NotificationToastProps } from '../types';
import { getTestId } from '../utils';
import { BORDER_RADIUS, styles as baseStyles } from './BaseToast.styles';
import { Touchable } from './Touchable';
import { Button, SvgIcon } from '../../../index';

const WIDTH = Dimensions.get('window').width;

export function NotificationToast({
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
    time,
    timeStyle,
    hide,
}: NotificationToastProps)
{
    const { t } = useTranslation();
    return (
        <Touchable
            testID={getTestId('TouchableContainer')}
            activeOpacity={activeOpacity}
            style={[baseStyles.base, styles.base, style]}
            onPress={onPress}
            {...touchableContainerProps}
        >
            <View
                testID={getTestId('ContentContainer')}
                style={[baseStyles.contentContainer, styles.contentContainer, contentContainerStyle]}
                {...contentContainerProps}
            >
                <View style={styles.top}>
                    <View
                        style={styles.center}
                    >
                        <View style={{ borderRadius: 20, padding: 3, backgroundColor: '#37A6FF' }}>
                            <SvgIcon name="bell-o-white" />
                        </View>
                    </View>
                    <View
                        style={[baseStyles.title, styles.title, titleStyle]}
                    >
                        <Text
                            testID={getTestId('title')}
                            numberOfLines={titleNumberOfLines}
                            ellipsizeMode="tail"
                            {...titleProps}
                        >
                            {title ? t(title) : ''}
                        </Text>
                    </View>
                    <View style={styles.center}>
                        <TouchableOpacity
                            style={{
                                padding: 3,
                            }}
                            onPress={() => hide()}
                        >
                            <SvgIcon
                                color={'#929DA8'}
                                name={'close'}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <Text
                    testID={getTestId('message')}
                    style={[baseStyles.message, styles.message, messageStyle]}
                    numberOfLines={messageNumberOfLines}
                    ellipsizeMode="tail"
                    {...messageProps}
                >
                    {message ? t(message) : ''}
                </Text>

                <Text
                    testID={getTestId('message')}
                    style={[styles.time, timeStyle]}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    {time ? t(time) : 'in seconds'}
                </Text>
            </View>
        </Touchable>
    );
}

const styles = StyleSheet.create({
    base: {
        flexShrink: 1,
        height: 100,
        // paddingHorizontal: 3,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0,
        shadowRadius: BORDER_RADIUS,
        padding: 0,
        width: WIDTH * 0.95,
        borderWidth: 1,
        borderColor: '#37A6FF',
    },
    center: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
    },
    contentContainer: {
        paddingHorizontal: 16, // In case of RTL, the text will start from the right
        paddingVertical: 0, // In case of RTL, the text will start from the right
    },
    message: {
        color: '#000',
        fontSize: 14,
        // fontWeight: 'bold',
    },
    time: {
        color: '#979797',
        fontSize: 12,
        width: '100%', // Fixes: https://github.com/calintamas/react-native-toast-message/issues/130
    },
    title: {
        flexShrink: 1,
        paddingLeft: 12,
        width: '90%',
        // height: '100%',
        // alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        fontSize: 14,

    },
    top: {
        borderBottomWidth: 1,
        'borderColor': '#E5E9EF',
        display: 'flex',
        flexDirection: 'row',
        flexShrink: 1,
        marginBottom: 4,
        paddingBottom: 4,
        width: '100%',
    },
});
