import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { LogBox, Text as RNText } from 'react-native';
import Colors from '../theme/colors';
import { useTranslation } from 'react-i18next';

LogBox.ignoreLogs(['react-i18next:']);

export type Props = {
    title?: string | number;
    fontFamily?: string;
    size?: 'xxs' | 'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | number;
    textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';
    paddingLeft?: number | string;
    paddingTop?: number | string;
    paddingRight?: number | string;
    paddingBottom?: number | string;
    width?: number | string;
    flexShrink?: number;
    numberOfLines?: number;
    selectable?: boolean | undefined;
    colorScheme?: 'Background' | 'Surface' | 'Primary' | 'OnSurface' | 'OnPrimary' | 'PrimaryVariants' | 'OnSurfaceVariants' | 'SurfaceVariants' | 'PrimaryLight' | 'PrimaryVariantsLight' | 'PrimaryVariantSecond' | 'PrimaryVariantsThird' | 'primaryLight2' | String;
    renderNumOfColumn?: (_value: any) => void;
    fontStyle?: string;
};

// const defaultFontFamily = 'Nunito-Regular';
const defaultFontSize = 13;
const defaultTextAlign = 'auto';
const defaultPaddingLeft = 0 || '0%';
const defaultPaddingRight = 0 || '0%';
const defaultPaddingTop = 0 || '0%';
const defaultPaddingBottom = 0 || '0%';
const defaultWidth = 'auto';
const defaultFlexShrink = 1;
const defaultNumberOfLines = 0;
const defaulFontStyle = 'normal';
// const defaultSelectable = true;

const Text: React.FC<Props> = ({
    title,
    fontFamily,
    size,
    textAlign,
    paddingLeft,
    paddingTop,
    paddingRight,
    paddingBottom,
    width,
    flexShrink,
    numberOfLines,
    selectable,
    colorScheme,
    renderNumOfColumn,
    fontStyle,
}) =>
{
    const { t } = useTranslation();
    const fontSize = size === 'xxs' ? 10 : size === 'xs' ? 11 : size === 'sm' ? 12 : size === 'base' ? 13 : size === 'md' ? 14 : size === 'lg' ? 15 : size === 'xl' ? 16 : size === '2xl' ? 17 : size === '3xl' ? 18 : size === '4xl' ? 19 : size === '5xl' ? 26 : defaultFontSize || size ? size : defaultFontSize;

    const onTextLayout = useCallback(e =>
    {
        renderNumOfColumn && renderNumOfColumn(e.nativeEvent.lines.length);
    }, []);
    return (
        <RNText
            style={{
                // fontFamily: fontFamily ? fontFamily : defaultFontFamily,
                fontSize: fontSize,
                textAlign: textAlign ? textAlign : defaultTextAlign,
                paddingLeft: paddingLeft ? paddingLeft : defaultPaddingLeft,
                paddingTop: paddingTop ? paddingTop : defaultPaddingTop,
                paddingRight: paddingRight ? paddingRight : defaultPaddingRight,
                paddingBottom: paddingBottom ? paddingBottom : defaultPaddingBottom,
                width: width ? width : defaultWidth,
                flexShrink: flexShrink ? flexShrink : defaultFlexShrink,
                color: Colors[`${colorScheme}`] ?? colorScheme ?? Colors.OnSurface,
                fontStyle: fontStyle ? fontStyle : defaulFontStyle,
            }}
            numberOfLines={numberOfLines ? numberOfLines : defaultNumberOfLines}
            selectable={selectable ? selectable : false}
            onTextLayout={renderNumOfColumn && onTextLayout}
        >
            {title ? t(title?.toString()) : ''}
        </RNText>
    );
};

Text.propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    colorScheme: PropTypes.oneOfType([PropTypes.oneOf(['Background', 'Surface', 'Primary', 'OnSurface', 'OnPrimary', 'PrimaryVariants', 'OnSurfaceVariants', 'SurfaceVariants', 'PrimaryLight', 'PrimaryVariantsLight', 'PrimaryVariantSecond', 'PrimaryVariantsThird']), PropTypes.string]),
    fontFamily: PropTypes.string,
    textAlign: PropTypes.oneOf(['auto', 'left', 'right', 'center', 'justify']),
    size: PropTypes.oneOf(['xxs', 'xs', 'sm', 'base', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl']) || PropTypes.number,
    paddingLeft: PropTypes.number || PropTypes.string,
    paddingTop: PropTypes.number || PropTypes.string,
    paddingRight: PropTypes.number || PropTypes.string,
    paddingBottom: PropTypes.number || PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    flexShrink: PropTypes.number,
    numberOfLines: PropTypes.number,
    selectable: PropTypes.bool || undefined,
    renderNumOfColumn: PropTypes.func,
};

export default Text;
