/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useContext, useEffect, useLayoutEffect, useState } from 'react';
import {
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    View,
    TextInput,
    ScrollView,
    Text,
    KeyboardAvoidingView,
    Pressable,
    Keyboard,
    NativeSyntheticEvent,
    TextInputChangeEventData,
} from 'react-native';

import Colors from '../../theme/colors';
import { DirectionService } from '../../../services/direction.service';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { useTranslation } from 'react-i18next';
import Geolocation from 'react-native-geolocation-service';
import SvgIcon from '../../SvgIcon/SvgIcon';
import FAIcon from '../../FAIcon/FAIcon';
import ModalV2 from '../../ModalV2/Modal';
import Loading from '../../Loading/Loading';
import { MapContext } from '../Contexts/mapContext';
import { Shadow } from 'react-native-shadow-2';
import { DirectionContext } from '../Contexts/directionContext';
import { debounce } from 'lodash';
import Toast from '../../Toast/Toast';

interface Props
{
    typeVeh: number;
    requestText: any;
    setTypeVeh: (_typeVeh: any) => void;
    setRequestText: (_requestText: any) => void;
    refMap: MapboxGL.MapView | null;
    visible?: boolean;
    drawRoute: (_coord: number[][], _typeVeh: number, _crit: number) => void;
    setAddress: (_address) => void;
    crit: number;
    setCrit: (_crit) => void;
    onReload: () => void;
    whichJustUpdate: number,
    setWhichJustUpdate?: (_whichJustUpdate: number) => void;
    locationSearchFunction?: (_value, _skip, _take, _lat, _long, _lx, _ly, _rx, _ry) => Promise<any>,
}

function useForceUpdate ()
{
    const [value, setValue] = useState(0); // integer state
    value;
    return () => setValue(values => values + 1); // update the state to force render
}

const NavigatorComponent: React.FC<Props> = (props) =>
{
    const direction = new DirectionService();

    const [typeVeh, setTypeVeh] = useState(props.typeVeh);
    const [searching, setSearching] = useState(false);
    const [requestText, setRequestText] = useState<string[]>(props.requestText); // ['','']
    const [address, setAddress] = useState<string[]>(['', '']);
    const [visible, setVisible] = useState(false);
    const [status, setStatus] = useState([false, false]);
    const [data, setData] = useState<any>([]);
    const [coord, setCoord] = useState<any>({});
    const [route, setRoute] = useState<number[][]>([[], []]);
    const [crit, setCrit] = useState<number>(props.crit);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [refInput, setRefInput] = useState([{}, {}]);

    const { selectedPointCoordinates, setMode, mode } = useContext(MapContext);
    const { routePoints: routeContext, setRouteSelectedPoints } = useContext(DirectionContext);

    const { t } = useTranslation();

    useEffect(() =>
    {
        props.setAddress(address);
    }, [address]);

    useEffect(() =>
    {
        if (selectedPointCoordinates?.length > 0)
        {
            direction.searchGeoCodeLocation(selectedPointCoordinates[1], selectedPointCoordinates[0]).then(res =>
            {
                const resultAddress = res?.[0]?.address;
                if (resultAddress)
                {
                    const old = requestText;
                    old[props.whichJustUpdate] = resultAddress;

                    const routes: any = [];
                    route.map((e, index) =>
                    {
                        routes.push(props.whichJustUpdate === index ? [res?.[0]?.latitude, res?.[0]?.longitude] : e);
                    });

                    setRoute(routes);
                    setRequestText(old);

                    update();
                }
                else
                {
                    Toast.show({
                        type: 'error',
                        title: 'Navigation failed',
                        message: 'There are no matching routes',
                        visibilityTime: 5000,
                        bottomOffset: 50,
                        position: 'bottom',
                    });
                }
            }).catch((error) =>
            {
                console.log('[NavigatorComponent] searchGeoCodeLocation:', error);
            });
        }
    }, [selectedPointCoordinates]);

    useEffect(() =>
    {
        let emptyRouteItem = 0;

        route.forEach((item: any) =>
        {
            if (item.length === 0)
            {
                emptyRouteItem++;
            }
        });
        if (emptyRouteItem === 0 && route.length > 0)
        {
            props.setRequestText(requestText);
            props.setCrit(crit);
            props.setTypeVeh(typeVeh);
            
            setTimeout(() =>
            {
                props.drawRoute(route, typeVeh, crit);
                setRouteSelectedPoints([[], [], [], [], []]);
            }, 100);

        }


    }, [route, crit, typeVeh]);

    const onClickAddress = async (item: any) =>
    {
        const tmp: any = [];
        const routes: any = [];

        route.map((e, index) =>
        {
            routes.push(props.whichJustUpdate === index ? [item.latitude, item.longitude] : e);
        });

        requestText.map((e, index) =>
        {
            tmp.push(props.whichJustUpdate === index ? item.name : e);
        });

        const addr: any = [];
        address.map((e, index) =>
        {
            addr.push(props.whichJustUpdate === index ? item.address : e);
        });

        setAddress(addr);
        setRoute(routes);
        setRequestText(tmp);
        setVisible(false);
        setRouteSelectedPoints((ro) =>
        {
            const result = [...ro];
            result[props.whichJustUpdate] = [item.longitude, item.latitude];
            return result;
        });
        Keyboard.dismiss();
    };


    useLayoutEffect(() =>
    {
        Geolocation.getCurrentPosition(
            (position: any) =>
            {
                setCoord({ longitude: position?.coords?.longitude, latitude: position?.coords?.latitude });

                const routes = (routeContext && routeContext.length > 0) ? routeContext : [[position?.coords?.latitude, position?.coords?.longitude], []];
                const addr = ['', ''];

                setAddress(addr);
                setRoute(routes);
                setVisible(false);
            },
            (error) =>
            {
                console.error(error);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, showLocationDialog: true },
        );

    }, []);

    const searchDirections = async (value: string) =>
    {
        props.setRequestText(requestText);

        const bounds = await props.refMap?.getVisibleBounds();

        if (bounds)
        {
            const latAndLong = value.split(' ');

            if (props.locationSearchFunction)
            {
                const data_search: any = await props.locationSearchFunction(
                    value,
                    0,
                    50,
                    parseFloat(latAndLong[0]),
                    parseFloat(latAndLong[1]),
                    bounds[0][0],
                    bounds[0][1],
                    bounds[1][0],
                    bounds[1][1],
                );

                setData(data_search.docs);
            }
            else
            {
                direction.searchAll(
                    value,
                    bounds[0][0],
                    bounds[0][1],
                    bounds[1][0],
                    bounds[1][1],
                ).then((res) =>
                {
                    setData(res.docs);
                }).catch(error => console.error(error));
            }
        }

        setSearching(false);
    };


    const clearInput = (index: number) =>
    {
        if (props.setWhichJustUpdate)
        {
            props.setWhichJustUpdate(index);
        }

        if (index === 0)
        {
            setData([{
                ...coord,
                id: 'default',
                name: 'My location',
            }]);
        }
        else
        {
            setData([]);
        }

        setVisible(true);
        setSearching(false);

        const text: any = [];

        requestText.map((e, i: number) =>
        {
            text.push(index === i ? '' : e);
        });

        setRequestText(text);
        props.setRequestText(text);

        const addr: any = [];
        address.map((e, i) =>
        {
            addr.push(props.whichJustUpdate === i ? '' : e);
        });

        setAddress(addr);

        const routes: any = [];
        route.map((e, i: number) =>
        {
            routes.push(index === i ? [] : e);
        });

        setRoute(routes);

        setRouteSelectedPoints((ro) =>
        {
            const result = [...ro];
            result[props.whichJustUpdate] = [];
            return result;
        });
    };

    const setNewInput = async (text: string, index: number): Promise<void> =>
    {
        if (text === '')
        {
            setSearching(false);
        }

        const old = requestText;
        old[index] = text;

        setRequestText(old);
        update();
    };

    const setNewStatus = async (stausN: boolean, index: number): Promise<void> =>
    {
        const old = status;
        old[index] = stausN;
        setStatus(old);
    };

    const addNewPoint = async (_index: number): Promise<void> =>
    {
        const old = requestText;

        const last = old.splice(_index, old.length - 1); // ['']

        old.push('');

        setRequestText(old.concat(last));

        // route
        const oldRouteClone = [...route];
        const r_last = oldRouteClone.splice(_index, old.length - 1); // ['']

        oldRouteClone.push([]);
        setRoute(oldRouteClone.concat(r_last) as any);

        // address
        const addressClone = [...address];

        const a_last = addressClone.splice(_index, old.length - 1); // ''

        addressClone.push();

        setAddress(addressClone.concat(a_last) as any);

        const ref_old = refInput;

        const ref_last = ref_old.splice(_index, old.length - 1); // ''

        ref_old.push({});

        setRefInput(ref_old.concat(ref_last) as any);

        update();
    };

    const removePoint = async (_index: number): Promise<void> =>
    {
        const old = requestText;
        old.splice(_index, 1); // ['']
        setRequestText(old);

        const oldRouteClone = [...route];

        oldRouteClone.splice(_index, 1); // ['']

        setRoute(oldRouteClone);

        const a_old = address;
        a_old.splice(_index, 1); // ['']
        setAddress(a_old as any);

        update();
    };

    const setRef = (index, ref) =>
    {
        refInput[index] = ref;
    };

    const update = useForceUpdate();

    const handleChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) =>
    {
        const value = e.nativeEvent.text;
        setSearching(true);
        setNewInput(value, props.whichJustUpdate);

        !visible && setVisible(true);
        handler(value);
    };

    const handler = debounce(async (e: string) =>
    {
        searchDirections(e);
    }, 300);

    return (
        <Shadow
            sides={['bottom']}
            radius={0}
            corners={['bottomLeft', 'bottomRight']}
            viewStyle={{
                ...styles.search,
                'backgroundColor': Colors.Surface,
                display: (mode === 'directRoute' || mode === 'direct' || mode === 'directSelectPoint') ? 'flex' : 'none',
            }}
        >
            <View style={[styles.typeVeh, { 'backgroundColor': Colors.Surface }]}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                        style={styles.veh}
                        onPress={() =>
                        {
                            setTypeVeh(0);
                            setVisible(false);
                        }}
                    >
                        <SvgIcon name={`map-veh-walk${typeVeh === 0 ? '-active' : ''}`} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.veh}
                        onPress={() =>
                        {
                            setTypeVeh(2);
                            setVisible(false);
                        }}
                    >
                        <SvgIcon name={`map-veh-2w${typeVeh === 2 ? '-active' : ''}`} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.veh}
                        onPress={() =>
                        {
                            setTypeVeh(3);
                            setVisible(false);
                        }}
                    >
                        <SvgIcon name={`map-veh-car${typeVeh === 3 ? '-active' : ''}`} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.veh}
                        onPress={() =>
                        {
                            setTypeVeh(5);
                            setVisible(false);
                        }}
                    >
                        <SvgIcon name={`map-veh-transit${typeVeh === 5 ? '-active' : ''}`} />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    onPress={() => setModalVisible(true)}
                >
                    <SvgIcon
                        name={'option'}
                        size={20}
                        color={Colors.OnSurface}
                    />
                </TouchableOpacity>
            </View>

            <View style={{ 'backgroundColor': Colors.Surface }}>
                {
                    requestText.map((e: string, index: number) => // ['','']
                    {
                        return (
                            <View
                                key={index}
                                style={{ width: '88%', marginTop: 10, marginLeft: '2%' }}
                            >
                                <TextInput
                                    key={index}
                                    ref={(ref) => setRef(index, ref)}
                                    value={requestText[index]}
                                    placeholder={t(index === 0 ? 'Starting point' : ((index === requestText.length - 1) ? 'End point' : 'Passing point'))}
                                    placeholderTextColor={'#939393'}
                                    style={{
                                        'color': Colors.OnSurface,
                                        'borderColor': status[index] ? Colors.PrimaryLight : Colors.OnSurfaceVariants,
                                        borderWidth: 1,
                                        borderRadius: 5,
                                        paddingLeft: 15,
                                        height: 40,
                                        paddingRight: 35,
                                    }}
                                    spellCheck={false}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    onChange={handleChange}
                                    onFocus={() =>
                                    {
                                        if (props.setWhichJustUpdate)
                                        {
                                            props.setWhichJustUpdate(index);
                                        }
                                        setNewStatus(true, index);
                                        if (index === 0 && requestText?.[0] === '')
                                        {
                                            setData([{
                                                ...coord,
                                                id: 'default',
                                                name: 'My location',
                                                address: '',
                                            }]);
                                        }
                                        else
                                        {
                                            setData([]);
                                        }

                                        setTimeout(() =>
                                        {
                                            setVisible(true);
                                            setSearching(false);
                                        }, 100);
                                    }}
                                    onBlur={() =>
                                    {
                                        setNewStatus(false, index);
                                    }}
                                />

                                {requestText?.[index]?.length > 0 && (
                                    <TouchableOpacity
                                        style={{ position: 'absolute', right: 15, top: 10 }}
                                        onPress={() => clearInput(index)}
                                    >
                                        <FAIcon
                                            icon="times"
                                            size={'20'}
                                            color={Colors.OnSurface}
                                            type="light"
                                            backgroundColor={Colors.Surface}
                                        />
                                    </TouchableOpacity>
                                )}

                                {index === (requestText.length - 1) && requestText.length <= 4 && (
                                    <TouchableOpacity
                                        style={{
                                            position: 'absolute',
                                            right: '-7.5%',
                                            top: 10,
                                        }}
                                        onPress={() => addNewPoint(index)}
                                    >
                                        <FAIcon
                                            icon="plus"
                                            size={'18'}
                                            color={Colors.OnSurface}
                                            type="light"
                                            backgroundColor={Colors.Surface}
                                        />
                                    </TouchableOpacity>
                                )}

                                {index !== 0 && requestText.length - 1 !== index && (
                                    <TouchableOpacity
                                        style={{
                                            position: 'absolute',
                                            right: '-7.5%',
                                            top: 10,
                                        }}
                                        onPress={() => removePoint(index)}
                                    >
                                        <FAIcon
                                            icon="minus"
                                            size={'18'}
                                            color={Colors.OnSurface}
                                            type="light"
                                            backgroundColor={Colors.Surface}
                                        />
                                    </TouchableOpacity>
                                )}

                                {index === 0 && (
                                    <View style={styles.swapBtn}>
                                        <Pressable
                                            style={{ flexDirection: 'row' }}
                                            disabled={requestText[0] !== '' && requestText[1] !== '' ? false : true}
                                            onPress={() =>
                                            {
                                                const tmp: any = requestText.slice().reverse().map(d => d);
                                                setRequestText(tmp);
                                                const tmp2: any = route.slice().reverse().map(d => d);
                                                setRoute(tmp2);
                                                const tmp3: any = address.slice().reverse().map(d => d);
                                                setAddress(tmp3);
                                            }}
                                        >
                                            <SvgIcon
                                                name={`up-down${requestText[0] !== '' && requestText[1] !== '' ? '-active' : ''}`}
                                                width={18}
                                                height={18}
                                            />
                                        </Pressable>
                                    </View>
                                )}
                            </View>
                        );
                    })
                }
            </View>

            <KeyboardAvoidingView>
                {visible && data !== undefined && (
                    !searching
                        ? (
                                <>
                                    {(data.length > 0)
                                        ? (
                                                <ScrollView
                                                    style={styles.floating}
                                                    contentContainerStyle={{ paddingHorizontal: 16 }}
                                                    keyboardShouldPersistTaps="handled"
                                                    scrollEnabled
                                                >
                                                    {data.map((
                                                        e: {
                                                            id: React.Key | null | undefined;
                                                            name: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined;
                                                            address: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined;
                                                        },
                                                        index: number,
                                                    ) => (
                                                        <TouchableOpacity
                                                            key={index}
                                                            style={styles.card}
                                                            onPress={() =>
                                                            {
                                                                setMode('directSelectPoint');
                                                                onClickAddress(e);
                                                            }}
                                                        >
                                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                                {e.name === 'My location' && (
                                                                    <View style={{ paddingRight: 10, marginLeft: -1 }}>
                                                                        <SvgIcon
                                                                            name="my location"
                                                                        />
                                                                    </View>
                                                                )}
                                                                <Text style={{ fontSize: 15, color: Colors.OnSurface }}>{e.name === 'My location' ? t('My location') : e.name}</Text>
                                                            </View>
                                                            <Text style={{ fontSize: 12, color: Colors.OnSurfaceVariants }}>{e.address}</Text>
                                                        </TouchableOpacity>
                                                    ))}

                                                </ScrollView>
                                            )
                                        : (requestText?.[props.whichJustUpdate]?.length > 0 && requestText?.[props.whichJustUpdate] !== 'My location' && mode !== 'directRoute') && (
                                                <View style={styles.noData}>
                                                    <Text style={[styles.text, { color: Colors.OnSurface }]}>{t('no data')}</Text>
                                                </View>
                                            )
                                    }

                                    <View style={{
                                        paddingHorizontal: 15,
                                        paddingVertical: 10,
                                        alignItems: 'center',
                                        'borderTopColor': '#dadada',
                                        borderTopWidth: 0.5,
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                    }}
                                    >
                                        <TouchableOpacity
                                            style={{ alignItems: 'center', flexDirection: 'row' }}
                                            onPress={() =>
                                            {
                                                setMode('directSelectPoint');
                                                Keyboard.dismiss();
                                            }}
                                        >
                                            <SvgIcon
                                                name="select point"
                                            />
                                            <Text style={{ paddingLeft: 10, color: Colors.OnSurface }}>{t('Select on map')}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </>
                            )
                        : (
                                <View style={{ height: 50, width: Dimensions.get('window').width, alignItems: 'center', justifyContent: 'center' }}>
                                    <Loading visible />
                                </View>
                            )
                )}
            </KeyboardAvoidingView>

            <ModalV2
                size="full"
                isOpen={modalVisible}
                onClose={() => setModalVisible(false)}
            >
                <ModalV2.Content>
                    <ModalV2.Body>
                        <View style={{ padding: 16 }}>
                            <View style={{ ...styles.modal, width: '100%', paddingHorizontal: 15, height: 130, backgroundColor: Colors.Surface }}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', paddingVertical: 10, color: Colors.OnSurface }}>{t('Route')}</Text>
                                <TouchableOpacity
                                    style={{ ...styles.option, borderBottomWidth: 0.4, borderBottomColor: Colors.OnSurfaceVariants }}
                                    onPress={() =>
                                    {
                                        setCrit(0);
                                        setModalVisible(false);
                                    }}
                                >
                                    <Text style={{ color: Colors.OnSurface }}>{t('Fastest')}</Text>{crit === 0 && check}
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.option}
                                    onPress={() =>
                                    {
                                        setCrit(1);
                                        setModalVisible(false);
                                    }}
                                >
                                    <Text style={{ color: Colors.OnSurface }}>{t('Shortest')}</Text>{crit === 1 && check}
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ModalV2.Body>
                </ModalV2.Content>
            </ModalV2>
        </Shadow>

    );
};

const check = (
    <FAIcon
        type="light"
        icon="check"
        size={'18'}
    />
);

const styles = StyleSheet.create({
    card: {
        height: 'auto',
        paddingTop: 15,
    },
    floating: {
        'backgroundColor': 'transparent',
        'borderTopColor': '#3c3c3c25',
        borderTopWidth: 1,
        marginBottom: 5,
        marginTop: 15,
        maxHeight: Dimensions.get('window').height / 100 * 40,
        width: Dimensions.get('screen').width - 10,
    },
    modal: {
        borderRadius: 10,
    },
    noData: {
        alignItems: 'center',
        paddingVertical: 10,
        width: '100%',
    },
    option: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    search: {
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        minHeight: Dimensions.get('screen').height / 100 * 18,
        padding: 5,
        position: 'absolute',
        'shadowColor': '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        width: '100%',
    },
    swapBtn: {
        position: 'absolute',
        right: '-7.5%',
        top: 10,
    },
    text: {
        // fontFamily: 'Nunito-Bold',
        fontSize: 15,
    },
    typeVeh: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 10,
    },
    veh: {
        paddingHorizontal: 5,
    },
});

export default NavigatorComponent;
