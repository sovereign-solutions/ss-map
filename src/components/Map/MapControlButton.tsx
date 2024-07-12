import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import FAIcon from '../FAIcon/FAIcon';
import Colors from '../theme/colors';

import { SvgIcon } from '../..';

type MapControlButtonProps = {
    icon: string;
    iconComponent?: 'FAIcon' | 'SvgIcon';
    iconType?: 'solid' | 'regular' | 'light';
    iconSize?: string | number;
    background?: string;
    onPress?: () => void;
    isRound?: boolean;
    isActive?: boolean;
    btnSize?: number;
}

export const MapControlButton = (props: MapControlButtonProps) =>
{
    const { icon,btnSize = 60, iconComponent = 'FAIcon', onPress, isRound, iconType, isActive, iconSize, background } = props;
    return (
        <Pressable
            style={[styles.mapControl, isRound && styles.round, {
                'backgroundColor': isActive ? '#4A6EBB' : background || Colors.Surface,
            },
            btnSize
                ? { width: btnSize, height: btnSize }
                : { width: 60, height: 60 }]}
            onPress={onPress}
        >
            {iconComponent === 'FAIcon'
                ? (
                        <FAIcon
                            size={iconSize}
                            icon={icon}
                            type={iconType}
                            color={isActive ? 'white' : Colors.OnSurface}
                            backgroundColor={isActive ? '#4A6EBB' : background || Colors.Surface}
                        />
                    )
                : (
                        <SvgIcon
                            name={icon}
                            size={iconSize as number}
                            color={isActive ? 'white' : Colors.OnSurface}
                        />
                    )}
            

        </Pressable>
    );
};

const styles = StyleSheet.create({
    mapControl: {
        alignItems: 'center',
        borderRadius: 5,
        display: 'flex',
        elevation: 3,
        // height: 60,
        justifyContent: 'center',
        'shadowColor': '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.3,
        // width: 60,
    },
    
    round: {
        borderRadius: 30,
    },

    
});
