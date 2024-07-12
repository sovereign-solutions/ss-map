import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

import { BaseToastProps } from '../types';
import { getTestId } from '../utils';
import { styles } from './BaseToast.styles';
import { Touchable } from './Touchable';

export function BaseToast({
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
    messageNumberOfLines = 1,
    messageProps,
    renderLeadingIcon,
    renderTrailingIcon,
}: BaseToastProps)
{
    const { t } = useTranslation();
    return (
        <Touchable
            testID={getTestId('TouchableContainer')}
            activeOpacity={activeOpacity}
            style={[styles.base, styles.leadingBorder, style]}
            onPress={onPress}
            {...touchableContainerProps}
        >
            {renderLeadingIcon && renderLeadingIcon()}
            <View
                testID={getTestId('ContentContainer')}
                style={[styles.contentContainer, contentContainerStyle]}
                {...contentContainerProps}
            >
                {title && title.length > 0 && (
                    <Text
                        testID={getTestId('title')}
                        style={[styles.title, titleStyle]}
                        numberOfLines={titleNumberOfLines}
                        ellipsizeMode="tail"
                        {...titleProps}
                    >
                        {t(title)}
                    </Text>
                )}
                {message && message?.length > 0 && (
                    <Text
                        testID={getTestId('message')}
                        style={[styles.message, messageStyle]}
                        numberOfLines={messageNumberOfLines}
                        ellipsizeMode="tail"
                        {...messageProps}
                    >
                        {t(message)}
                    </Text>
                )}
            </View>
            {renderTrailingIcon && renderTrailingIcon()}
        </Touchable>
    );
}
