import React from 'react';
import { Dimensions } from 'react-native';
import { Image, StyleSheet, Pressable, View } from 'react-native';

import Colors from '../../theme/colors';
import Text from '../../Text/Text';
import FAIcon from '../../FAIcon/FAIcon';
import ModalV2 from '../../ModalV2/Modal';
import { useTranslation } from 'react-i18next';

export type StyleSwitcherProps = {
    onStyleChange: (_data: string) => void,
    defaultSelect: string,
    imgMap: any,
    rounded?: boolean,
    size?: number,
    border?: boolean,
    mapLayer?: boolean,
    mapStyleList: any,
}

const StyleSwitcher = (props: StyleSwitcherProps): JSX.Element =>
{
    const [status, setStatus] = React.useState(false);
    const [mapType, setMapType] = React.useState(props.defaultSelect);

    const { onStyleChange, defaultSelect } = props;
    const { t } = useTranslation();

    React.useEffect(() =>
    {
        onStyleChange(mapType);
    }, [mapType]);

    React.useEffect(() =>
    {
        defaultSelect !== mapType && setMapType(defaultSelect);
    }, [defaultSelect]);

    const width = props.size ?? 60;
    const height = props.size ?? 60;

    const capitalizeFirstLetter = (label: string) =>
    {
        return label.charAt(0).toUpperCase() + label.slice(1);
    };

    const mapStyleList = props.mapStyleList ?? Object.keys(props.imgMap).map((key: any, index: number) =>
    {
        if (!isNaN(key))
        {
            return null;
        }

        return {
            id: key,
            label: capitalizeFirstLetter(key),
        };
    }).filter(item => item);

    return (
        <View style={[
            styles.mapSwitcher,
            props.rounded ? { borderRadius: 5 } : { borderRadius: 30 },
            status && styles.openSwitcher,
        ]}
        >
            <Pressable
                style={[
                    styles.selectedSwitcher,
                    { backgroundColor: Colors.Surface },
                    props.rounded ? { borderRadius: 5 } : { borderRadius: 30 },
                    { width: width, height: height },
                    { justifyContent: 'center', alignItems: 'center' },
                ]}
                onPress={() => setStatus(!status)}
            >
                {props.mapLayer && (
                    <FAIcon
                        size={21}
                        icon={'layer-group'}
                        type="light"
                        color={'grey'}
                        backgroundColor={'transparent'}
                    />
                )}
            </Pressable>

            <ModalV2
                isOpen={status}
                size="xl"
                onClose={() => setStatus(false)}
            >
                <ModalV2.Content>
                    <ModalV2.Body>
                        <View style={{ backgroundColor: Colors.Surface }}>
                            <Text
                                title="Select Map Style"
                                // fontFamily="Nunito-ExtraBold"
                                size={'3xl'}
                                paddingLeft={15}
                                paddingTop={10}
                                paddingBottom={10}
                            />
                        </View>
                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: Colors.Surface,
                            }}
                        >
                            <View style={{
                                flexWrap: 'wrap',
                                flexDirection: 'row',
                                justifyContent: 'space-evenly',
                            }}
                            >
                                {mapStyleList.map((item: any, index: number) =>
                                {
                                    const active = item.id === mapType;

                                    return (
                                        <Pressable
                                            key={index}
                                            style={styles.ml_5}
                                            onPress={() =>
                                            {
                                                setMapType(item.id);
                                                setStatus(false);
                                            }}
                                        >
                                            <View style={[
                                                active
                                                    ? { borderWidth: 3, 'borderColor': '#3174fe', padding: 2, justifyContent: 'center', alignItems: 'center' }
                                                    : { borderWidth: 1, 'borderColor': Colors.Surface },
                                                { borderRadius: 15 },
                                            ]}
                                            >
                                                <Image
                                                    source={props.imgMap[item.id] as any}
                                                    style={[
                                                        active ? { width: width - 5, height: height - 5 } : { width: width, height: height },
                                                        styles.SwicthItem,
                                                        { borderRadius: 10 },
                                                    ]}
                                                />
                                            </View>
                                            <Text
                                                title={t(item.label) as string}
                                                colorScheme={active ? '#3174fe' : Colors.OnSurface}
                                                // fontFamily={active ? 'Nunito-Bold' : 'Nunito-SemiBold'}
                                            />
                                        </Pressable>
                                    );
                                })}
                            </View>
                        </View>
                    </ModalV2.Body>
                </ModalV2.Content>
            </ModalV2>
        </View>
    );
};

const styles = StyleSheet.create({
    SwicthItem: {
        overflow: 'hidden',
    },
    mapSwitcher: {
        borderWidth: 0,
        flexDirection: 'row-reverse',
        height: 200,
        position: 'relative',
        'shadowColor': '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
    },
    ml_5: {
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        // width: '100%',
    },
    openSwitcher: {
        height: 200,
        width: Dimensions.get('window').width * 0.3,
    },
    selectedSwitcher: {
        height: 60,
        right: 0, width: 60,
    },
});

export default StyleSwitcher;
