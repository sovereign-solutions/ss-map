import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Text from '../Text/Text';
import Colors from '../theme/colors';
import SvgIcon from '../SvgIcon/SvgIcon';
import { Sleep } from '../debounceClick';
import { FlexAlignType } from 'react-native';
import FAIcon from '../FAIcon/FAIcon';

export type Props = {
    title?: string;
    bgColor?: 'Background'|'Surface'|'Primary'|'OnSurface'|'OnPrimary'|'PrimaryVariants'|'OnSurfaceVariants'|'SurfaceVariants'|'PrimaryLight'|'PrimaryVariantsLight'|'PrimaryVariantSecond'|'PrimaryVariantsThird'|'primaryLight2'| String;
    textColor?: 'Background'|'Surface'|'Primary'|'OnSurface'|'OnPrimary'|'PrimaryVariants'|'OnSurfaceVariants'|'SurfaceVariants'|'PrimaryLight'|'PrimaryVariantsLight'|'PrimaryVariantSecond'|'PrimaryVariantsThird'|'primaryLight2'|String;
    fontFamily?: string;
    borderColor?: 'Background'|'Surface'|'Primary'|'OnSurface'|'OnPrimary'|'PrimaryVariants'|'OnSurfaceVariants'|'SurfaceVariants'|'PrimaryLight'|'PrimaryVariantsLight'|'PrimaryVariantSecond'|'PrimaryVariantsThird'|'primaryLight2'| String;
    onPress?: () => void;
    bdRadius?: number;
    width?: number | string;
    height?: number | string;
    onLongPress?: () => void;
    fontSize?: 'xxs' | 'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | number;
    debounceClick?: number;
    svg?: boolean,
    paddingHorizontal?: number,
    paddingVertical?: number,
    disabled?: boolean,
    alignItems?: FlexAlignType;
    justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly' | undefined;
    children?: any;
    shadow?:boolean;
    faIc?:boolean;
    // fontWeight?: 'bold' | 'normal' | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
    btnColor?: 'default' | 'primary' | 'success' | 'error' | 'warning' | 'variant2' | 'dark' | 'variant';
    btnType?: 'default' | 'solid' | 'none';
    bdRadiusType?: 'none' | 'rounded' | 'normal' | 'full';
    // sizeType?: 'xxs' | 'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
};

const defaultwidth = 'auto';
const defaultheight = 'auto';

const Button: React.FC<Props> = ({
    title,
    onPress,
    onLongPress,
    width,
    height,
    btnColor,
    btnType,
    bdRadiusType,
    fontSize,
    fontFamily,
    faIc,
    svg,
    disabled,
    shadow,
    children,
    // fontWeight,
    debounceClick,
}) =>
{
    // 'default' | 'base' | 'primary' | 'success' | 'error' | 'warning'
    const bgColor = {
        'default': Colors.Surface,
        'primary': '#0066B2',
        'success': '#38b865',
        'error': '#f5212d',
        'warning': '#fa8c16',
        'variant2': '#939393',
        'dark': Colors.OnSurface,
    };

    const borderRadius = {
        'none': 0,
        'normal': 5,
        'rounded': 40,
        'full': 200,
    };

    const backgroundColorType =
    (btnType === undefined || (btnType && btnType === 'default'))
        ? btnColor
                ? bgColor[btnColor]
                : 'transparent'
        : 'transparent';

    const borderColorType =
    (btnType === undefined || (btnType && btnType !== 'none'))
        ? btnColor
                ? bgColor[btnColor]
                : '#0066B2'
        : 'transparent';

    const textColorType =
    (btnType === undefined || (btnType && btnType === 'default') && btnColor)
        ? btnColor === 'default'
                ? Colors.OnSurface
                : '#f4f9ff'
        : (btnType === undefined || (btnType && btnType !== 'default') && btnType !== 'none' && btnColor)
                ? bgColor[btnColor ?? 'primary']
                : Colors.OnSurface;
    // 'none' | 'rounded' | 'normal'
    const borderRadiusType = bdRadiusType
        ? borderRadius[bdRadiusType]
        : 5;

    // const searchAPIDebounced =
    // onPress ? AwesomeDebouncePromise(onPress, debounceClick !== undefined ? debounceClick : 500) : undefined;
    const [executing, setExecuting] = useState(false);

    const handlePress = async () =>
    {
        setExecuting(true); // disable button
        try
        {
            onPress !== undefined && await onPress(); // thực hiện props onPress
        }
        finally
        {
            debounceClick && await Sleep(debounceClick); // bao nhiêu thời gian sẽ click lại được button
            setExecuting(false);
        }
    };

    return (
        <TouchableOpacity
            style={[
                styles.button,
                {
                    // backgroundColor: Colors[`${bgColor}`] ?? bgColor ?? '#0066B2',
                    backgroundColor: backgroundColorType,
                    // borderColor: Colors[`${borderColor}`] ?? borderColor ?? '#0066B2',
                    borderColor: borderColorType,
                    // borderRadius: bdRadius ? bdRadius : defaultbdRadius,
                    borderRadius: borderRadiusType,
                    width: width ?? defaultwidth,
                    height: height ?? defaultheight,
                    // paddingHorizontal: paddingHorizontal !== undefined ? paddingHorizontal : 15,
                    paddingHorizontal: btnType && btnType === 'none' ? 0 : 15,
                    // paddingVertical: paddingVertical !== undefined ? paddingVertical : 6,
                    paddingVertical: btnType && btnType === 'none' ? 0 : 6,
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: disabled ? 0.5 : 1,
                },
                shadow && styles.shadow]
            }
            disabled={executing || disabled}
            onPress={handlePress}
            onLongPress={()=> onLongPress && onLongPress()}
        >
            {faIc
                ? (
                        <FAIcon
                            icon={title ?? ''}
                            size={'18'}
                            color={textColorType}
                            backgroundColor='#faf6f600'
                        />
                    )
                : svg
                    ? <SvgIcon name={title} />
                    : title && (
                        <Text
                            title={title ?? ''}
                            colorScheme={textColorType}
                            fontFamily={fontFamily}
                            size={fontSize !== undefined ? fontSize : 'md'}
                            textAlign={'center'}
                        />
                    )
            }

            {children}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        borderWidth: 1,
    },
    shadow: {
        elevation: 3,
        'shadowColor': '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.3,
    },
});

Button.propTypes = {
    title: PropTypes.string,
    onPress: PropTypes.func,
    fontFamily: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.number,PropTypes.string]),
    height: PropTypes.oneOfType([PropTypes.number,PropTypes.string]),
    onLongPress: PropTypes.func,
    fontSize: PropTypes.oneOf(['xxs','xs' , 'sm' , 'base' , 'md' , 'lg' , 'xl' , '2xl' , '3xl' , '4xl' , '5xl']) || PropTypes.number,
    debounceClick: PropTypes.number,
    children: PropTypes.any,
    shadow: PropTypes.bool,
    faIc: PropTypes.bool,
    // fontWeight: PropTypes.oneOf(['bold' , 'normal' , 100 , 200 , 300 , 400 , 500 , 600 , 700 , 800 , 900]),
    btnColor: PropTypes.oneOf(['default' , 'primary' , 'success' , 'error' , 'warning', 'variant2', 'dark', 'variant']),
    bdRadiusType: PropTypes.oneOf(['none' , 'rounded' , 'normal', 'full']),
    btnType: PropTypes.oneOf(['default', 'solid', 'none']),
};

export default Button;
