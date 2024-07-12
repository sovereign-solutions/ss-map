import { Platform, Linking, Alert, PermissionsAndroid } from 'react-native';
import { PERMISSIONS, RESULTS, check, request } from 'react-native-permissions';

const PLATFORM_LOCATION_PERMISSION = {
    ios: PERMISSIONS.IOS.LOCATION_ALWAYS,
    android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
};
const PLATFORM_LOCATION2_PERMISSION = {
    ios: PERMISSIONS.IOS.LOCATION_ALWAYS,
    android: PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
};

const REQUEST_PERMISSION_TYPE: any = {
    location: PLATFORM_LOCATION_PERMISSION,
    location2: PLATFORM_LOCATION2_PERMISSION,
};

export class Permission
{
    requestPermission = async (permissions: any): Promise<boolean> =>
    {
        try
        {
            const result = await request(permissions);
            return Promise.resolve(result === RESULTS.GRANTED);
        }
        catch (error)
        {
            return Promise.resolve(false);
        }
    }

    handleOpenSettings = (): void =>
    {
        if (Platform.OS === 'ios')
        {
            Linking.openURL('app-settings:');
        }
        else
        {
            Linking.openSettings();
        }
    };

    checkPermissionAndLog = async (type: string): Promise<any> =>
    {
        const permissions = REQUEST_PERMISSION_TYPE[type][Platform.OS];

        if (!permissions)
        {
            return Promise.resolve(true);
        }

        try
        {
            const result = await check(permissions);

            if (result === RESULTS.GRANTED)
            {
                return Promise.resolve(true);
            }
            else if (result === 'blocked')
            {
                return Promise.resolve('blocked');
            }

            return Promise.resolve(false);
        }
        catch (error)
        {
            return Promise.resolve(false);
        }
    };

    checkPermissionAndRequest = async (type: string): Promise<any> =>
    {
        const permissions = REQUEST_PERMISSION_TYPE[type][Platform.OS];

        if (!permissions)
        {
            return Promise.resolve(true);
        }

        try
        {
            const result = await check(permissions);

            if (result === RESULTS.GRANTED)
            {
                return Promise.resolve(true);
            }
            else if (result === 'blocked')
            {
                return Promise.resolve('blocked');
            }

            return Promise.resolve(this.requestPermission(permissions));
        }
        catch (error)
        {
            return Promise.resolve(false);
        }
    }

    checkLocation = async (): Promise<any> =>
    {
        const CheckLocation = await this.checkPermissionAndLog('location');

        if (CheckLocation === false)
        {
            await this.checkPermissionAndRequest('location').then(async () =>
            {
                const Location = await this.checkPermissionAndLog('location');

                if (Location)
                {
                    return Promise.resolve(true);
                }
                else
                {
                    return Promise.resolve(false);
                }
            });
        }
        else if (CheckLocation === 'blocked')
        {
            Alert.alert('Location permission was blocked', 'You need copyright access the location permission to use the main activity', [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                { text: 'Go to setting', onPress: () => this.handleOpenSettings() },
            ]);
        }
        else
        {
            return Promise.resolve(true);
        }

        return Promise.resolve(false);
    };

    checkLocationAlways = async (app): Promise<any> =>
    {
        const CheckLocation = await this.checkPermissionAndLog('location2');

        if (CheckLocation === false)
        {
            await this.checkPermissionAndRequest('location2').then(async () =>
            {
                const Location = await this.checkPermissionAndLog('location2');

                if (Location)
                {
                    return Promise.resolve(true);
                }
                else
                {
                    return Promise.resolve(false);
                }
            });
        }
        else if (CheckLocation === 'blocked')
        {
            if (!app || app !== 'c4i2')
            {
                Alert.alert('Location permission was blocked', 'You need copyright access the location always permission to use the main activity', [
                    {
                        text: 'Cancel',
                        style: 'cancel',
                    },
                    { text: 'Go to setting', onPress: () => this.handleOpenSettings() },
                ]);
            }
            else
            {
                return Promise.resolve(true);
            }
        }
        else
        {
            return Promise.resolve(true);
        }

        return Promise.resolve(false);
    };

    requestCameraPermission = async (): Promise<boolean> =>
    {
        try
        {
            // TODO: How about IOS?
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'Need more permission',
                    message:
                        'Please grant Camera permission to use this featrue.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'Grant',
                },
            );

            return granted === PermissionsAndroid.RESULTS.GRANTED;
        }
        catch (err)
        {
            console.warn(err);
            return false;
        }
    }
}


