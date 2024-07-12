import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import Colors from '../theme/colors';
import GlobalStyles from '../theme/gloalStyles';

export type Props = {
    children?: React.ReactNode;
    statusBarBgColor?: string;
    statusBarHidden?:boolean;
    statusBarStyle?: string;
    statusTranslucent?: boolean;
};

const RootContainer: React.FC<Props> = ({
    children,
    statusBarBgColor,
    statusBarHidden,
    statusBarStyle,
    statusTranslucent,
}) =>
{
    return (
        <SafeAreaView style={{
            ...GlobalStyles.container,
            backgroundColor: statusBarBgColor ? statusBarBgColor : Colors.Surface,
        }}
        >
            <StatusBar
                backgroundColor={statusBarBgColor ? statusBarBgColor : Colors.Surface}
                hidden={statusBarHidden ?? false}
                // barStyle={statusBarStyle ?? (storage.getString('THEME_MODE') === 'light' || storage.getString('THEME_MODE') === 'light2') ? 'dark-content' : 'light-content'}
                barStyle={statusBarStyle ?? 'light-content'}
                translucent={statusTranslucent ?? false}
            />
            {children}
        </SafeAreaView>
    );
};
export default RootContainer;
