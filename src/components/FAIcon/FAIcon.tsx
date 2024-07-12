// basic
import React from 'react';
import PropTypes from 'prop-types';
import Svg, { G, Path } from 'react-native-svg';
import FAIconMetaData from '../../assets/fa/icons.json';
// import Se

// mui
import Colors from '../theme/colors';
import { useTranslation } from 'react-i18next';

const defaultType = 'solid';
const defaultSize = 24;
const defaultDisableOpacity = 0.7;

export type FAIconProps = {
    icon: string;
    type?: string;
    size?: number | string;
    color?: string;
    backgroundColor?: string;
    title?: string;
    spin?: boolean;
    disabled? : boolean;
    onClick?: (event?: any) => void;
};

const FAIcon: React.FC<FAIconProps> = ({
    icon,
    type,
    size,
    color,
    backgroundColor,
    title,
    disabled,
    onClick,
}) =>
{
    const { t } = useTranslation();

    type = type || defaultType;
    size = size || defaultSize;
    color = color || Colors.OnSurface;
    backgroundColor = backgroundColor || 'transparent';

    const iconData = FAIconMetaData[icon];

    if (!iconData)
    {
        return (<></>);
    }

    const iconDrawData = iconData.svg[type];

    if (!iconDrawData)
    {
        return (<></>);
    }

    return (
        <Svg
            width={size}
            height={size}
            title={t(title || '')}
            disabled={disabled}
            viewBox={iconDrawData.viewBox.join(' ')}
            style={{ backgroundColor: backgroundColor, opacity: disabled ? defaultDisableOpacity : 1 }}
            onPress={onClick}
        >
            <G
                fill={color}
                stroke={color}
            >
                <Path d={iconDrawData.path} />
            </G>
        </Svg>
    );
};

FAIcon.propTypes = {
    icon: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['solid', 'regular', 'light']),
    size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    backgroundColor: PropTypes.string,
    onClick: PropTypes.func,
    title: PropTypes.string,
    disabled: PropTypes.bool,
};

export default FAIcon;
