/* eslint-disable max-len */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
// react native
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    Dimensions,
    FlatList,
    Keyboard,
    NativeSyntheticEvent,
    Platform,
    StyleSheet,
    TextInput,
    TextInputChangeEventData,
    TouchableOpacity,
    View,
} from 'react-native';

// base/mui component,const,enum
import Loading from '../../../Loading/Loading';
import Colors from '../../../theme/colors';
import FAIcon from '../../../FAIcon/FAIcon';
import SvgIcon from '../../../SvgIcon/SvgIcon';
import Text from '../../../Text/Text';
import { DirectionContext } from '../../Contexts/directionContext';
import { MapContext } from '../../Contexts/mapContext';
import { SearchLocationContext } from '../../Contexts/searchLocationContext';
import SearchLocationMapLayer from './SearchLocationMapLayer';
// import BottomSheet from '../../../BottomSheet/BottomSheet';
import Toast from '../../../Toast/Toast';
import { SearchService } from '../../../../services/SearchService'; 

export interface MapLayer
{
    label: string,
    id: string,
    layer: string,
    type: string;
    layerStyle: string,
    config: any,

    [key: string]: string,
}

export interface Properties
{
    DisplayName: string,
    ColumnName: string,
    DataType: number,
    Order: number,
    IsSystem: boolean,
    IsView: boolean,
    IsIndex: boolean,
    IsRequire: boolean,
    IsReadOnly: boolean,
    IsHistory: boolean,
    IsInherit: boolean,
    DefaultValue: number,
    Config: string,
    Description: string,
    IsMemoryIndex: boolean,
    IsMemoryLoad: boolean
}

export interface ConfigMapLayer
{
    Caption: string,
    LayerName: string,
    InheritFrom: string,
    Status: number,
    Properties: Properties[],
    LayerId: string,
    SiteId: string,
    CreateUser: number,
    CreateDate: string,
    Version: number
}

export type Props = {
    locationSearchFunction: (_value, _skip, _take, _lat, _long, _lx, _ly, _rx, _ry) => Promise<any>;
    clear?: () => void;
    onFocus?: () => void;
    onBlur?: () => void;
    onClose?: () => void;
    heightTxtInput?: number;
    rounded?: boolean;
    isShowSearch?: boolean;
    displayButton?: boolean;
    bgColor?: string;
    borderTxtInputColor?: string;
    searchThisArea?: boolean;
    navigation?: (coordinate: any[]) => void;
    navigationMode?: boolean;
    handleSearchLocation?: (value: any) => void;
    selectedLayer?: MapLayer[],
    locationSearchMapLayer?: (_value, _lat, _long, _layer, _filter) => Promise<any>;
    getLayerConfig?: (_layer: string) => Promise<any>;
    isSearchInMapLayer?: boolean
};
30;
const SearchLocation: React.FC<Props> = ({
    locationSearchFunction,
    clear,
    onFocus,
    onBlur,
    onClose,
    heightTxtInput,
    rounded,
    displayButton,
    bgColor,
    borderTxtInputColor,
    searchThisArea,
    navigation,
    navigationMode,
    handleSearchLocation,
    selectedLayer,
    locationSearchMapLayer,
    getLayerConfig,
    isSearchInMapLayer,
}) =>
{
    const { t } = useTranslation();

    const { camera, mapRef, setMode, mode } = useContext(MapContext);

    const {
        handleClick,
        showSearchInput,
        handleShowBtnSearch,
        setSearchInput,
        setFutureCollect,
        setCenter,
        valueInput,
        setValueInput,
        setShowSearchInput,
        dataSearch,
        setDataSearch,
        scroll,
    } = useContext(SearchLocationContext);

    const {
        setRequestText,
        setIsShowDirection,
        setRoutePoints,
    } = useContext(DirectionContext);

    const [searchValue, setSearchValue] = useState('');
    const [showSuggest, setShowSuggest] = useState(true);
    const [focus, setFocus] = useState(false);
    const [tmpListCoor, settmpListCoor] = useState<any[]>([]);
    const [typeView, setTypeView] = useState<'map-layer' | 'location'>('location');
    // const [bottomSheet, setBottomSheet] = useState<any>();
    const [selected, setSelected] = useState<MapLayer>();
    const [dataSearchInMapLayer, setDataSearchInMapLayer] = useState<any[]>([]);
    const [dataInMapLayer, setDataInMapLayer] = useState<any[]>([]);
    const [dataMapLayerSelected, setDataMapLayerSelected] = useState<MapLayer[]>([]);
    const [configLayer, setConfigLayer] = useState<ConfigMapLayer>();
    const [loading, setLoading] = useState(false);

    const snapPoints = useMemo(() => ['60%'], []);

    const searchService = new SearchService();
    useEffect(() =>
    {
        handleShowBtnSearch(displayButton ?? false);
        setSearchInput(displayButton ? false : true);
    }, []);

    useEffect(() =>
    {
        if (selectedLayer && selectedLayer.length > 0)
        {
            const selectedMapLayer = selectedLayer.find(item => `${item.id}` === `${selected?.id}`);
            if (selectedMapLayer)
            {
                setSelected(selectedMapLayer);
            }
            else
            {
                setSelected(undefined);
            }
            setDataMapLayerSelected(selectedLayer);
        }
        else
        {
            setSelected(undefined);
            setDataMapLayerSelected([]);
            clearSearch();
        }
    }, [selectedLayer, selected]);

    useEffect(() =>
    {
        const handleSetValueInput = () =>
        {
            setSearchValue('');
            setValueInput(false);
        };
        if (valueInput === true)
        {
            handleSetValueInput();
        }
    }, [valueInput]);

    useEffect(() =>
    {
        showSearchInput === false && clearSearch();
    }, [showSearchInput]);

    useEffect(() =>
    {
        if (typeView === 'map-layer')
        {
            const field_map = configLayer?.Properties?.find(item => item.DataType === 7);
            if (field_map)
            {
                const new_data = dataSearchInMapLayer?.filter(item => field_map && item[field_map.ColumnName]);
                if (new_data && new_data.length > 0)
                {
                    setDataInMapLayer(new_data);
                    const setFeture = () =>
                    {
                        setFutureCollect({
                            type: 'FeatureCollection',
                            features:
                                new_data.map((x: any, i: number) => ({
                                    type: 'Feature',
                                    id: x.id,
                                    properties: {},
                                    geometry: typeof x[field_map?.ColumnName] === 'string' ? JSON.parse(x[field_map?.ColumnName]) : x[field_map?.ColumnName],
                                })),
                        });
                    };
                    setFeture();
                    const tmpListCoor2: any[] = [];
                    new_data.map((x: any) =>
                    {
                        const coor: {
                            type: string,
                            coordinates: number[]
                        } = typeof x[field_map?.ColumnName] === 'string' ? JSON.parse(x[field_map?.ColumnName]) : x[field_map?.ColumnName];
                        tmpListCoor2.push(coor.coordinates);
                    });

                    settmpListCoor(tmpListCoor2);
                }
            }
        }
        else
        {
            const setFeture = () =>
            {
                setFutureCollect({
                    type: 'FeatureCollection',
                    features:
                        dataSearch?.docs.length !== 0
                            ? dataSearch?.docs.map((x: any, i: number) => ({
                                type: 'Feature',
                                id: x.id,
                                properties: {},
                                geometry: {
                                    type: 'Point',
                                    coordinates: [x.longitude, x.latitude],
                                },
                            }))
                            : [],
                });
            };
            setFeture();
            const tmpListCoor2: any[] = [];
            dataSearch?.docs.map((x: any) =>
            {
                tmpListCoor2.push([x.longitude, x.latitude]);
            });

            settmpListCoor(tmpListCoor2);
        }

        setTimeout(() =>
        {
            setLoading(false);
        }, 500);
    }, [dataSearch, typeView, dataSearchInMapLayer, configLayer]);

    const clearSearch = () =>
    {
        setSearchValue('');
        setDataSearch({ docs: [] });
        setShowSuggest(false);
        setCenter([]);
        setTypeView('location');
        setDataSearchInMapLayer([]);
    };

    const caculatorBound = (arr: any) =>
    {
        const myCoords = arr;
        setCenter(arr[0]);
        if (arr && arr.length !== 0)
        {
            let x0: any,
                x1: any,
                y0: any,
                y1: any;

            for (let i = 0; i < myCoords.length; i++)
            {
                if (x0 == null)
                {
                    x0 = x1 = myCoords[i][0];
                    y0 = y1 = myCoords[i][1];
                }
                else
                {
                    if (myCoords[i][0] > x1!)
                    {
                        x1 = myCoords[i][0];
                    }
                    if (myCoords[i][0] < x0)
                    {
                        x0 = myCoords[i][0];
                    }
                    if (myCoords[i][1] > y1!)
                    {
                        y1 = myCoords[i][1];
                    }
                    if (myCoords[i][1] < y0!)
                    {
                        y0 = myCoords[i][1];
                    }
                }
            }
            const NE2: any[] = [];
            const SW2: any[] = [];
            NE2.push(x1);
            NE2.push(y1);
            SW2.push(x0);
            SW2.push(y0);
            camera?.current?.fitBounds(NE2, SW2, [150, 50, 150, 50], 1000);
        }
    };

    const _handleSearchLocation = (value: any) =>
    {
        if (handleSearchLocation)
        {
            handleSearchLocation(value);
        }
        else
        {
            console.log('handleSearchLocation', value);
        }
    };
    const renderData = useMemo(() =>
    {
        const renderItemSearch = (x: any, index: number) =>
        {
            return (
                <TouchableOpacity
                    key={index}
                    style={styles.card}
                    onPress={() =>
                    {
                        (navigationMode === false && handleSearchLocation) &&
                        handleSearchLocation({ lat: x.latitude, long: x.longitude });
                        Keyboard.dismiss();
                        setShowSuggest(false);
                        scroll.current?.scrollToIndex({ animated: true, index: index });
                        handleClick([x.longitude, x.latitude]);
                        setCenter([x.longitude, x.latitude]);
                    }}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={styles.wordContainer}>
                            <Text
                                title={x.name ?? ''}
                                size={'xl'}
                                colorScheme={Colors.OnSurface}
                            />
                            <Text
                                title={x.address ?? x.longitude + ', ' + x.latitude + ' (Vietbando)'}
                                size={'base'}
                                colorScheme={Colors.OnSurfaceVariants}
                            />
                        </View>
                    </View>
                </TouchableOpacity>
            );
        };

        if (typeView === 'location')
        {
            if (dataSearch?.docs.length > 0)
            {
                return (
                    <FlatList
                        data={dataSearch?.docs ?? []}
                        keyExtractor={(_e, index) => index.toString()}
                        renderItem={({ item, index }) => renderItemSearch(item, index)}
                        initialNumToRender={1000000}
                        keyboardShouldPersistTaps="always"
                    />
                );
            }
            else
            {
                return (
                    <View style={styles.coverNoData}>
                        <SvgIcon
                            name={'data empty'}
                            size={150}
                        />
                        <Text
                            title={'no data'}
                            size={'2xl'}
                            // fontFamily="Nunito-Bold"
                            paddingBottom={5}
                            paddingTop={5}
                        />
                    </View>
                );
            }
        }
        else if (typeView === 'map-layer')
        {
            if (dataSearchInMapLayer.length > 0)
            {
                return (
                    <SearchLocationMapLayer
                        data={dataSearchInMapLayer}
                        handleClickItem={(_item: any, index: number) =>
                        {
                            const field_map = configLayer?.Properties?.find(item => item.DataType === 7);
                            if (field_map)
                            {
                                if (_item[field_map.ColumnName])
                                {
                                    const coor: {
                                        type: string,
                                        coordinates: number[]
                                    } = typeof _item[field_map.ColumnName] === 'string' ? JSON.parse(_item[field_map.ColumnName]) : _item[field_map.ColumnName];
                                    const indexOfInScroll = dataInMapLayer.findIndex(item => `${item.Id}` === `${_item.Id}`);

                                    if (navigationMode === false && handleSearchLocation)
                                    {
                                        handleSearchLocation({ lat: coor.coordinates[1], long: coor.coordinates[0] });
                                    }
                                    Keyboard.dismiss();
                                    setShowSuggest(false);
                                    handleClick(coor.coordinates);
                                    setCenter(coor.coordinates);
                                    scroll.current?.scrollToIndex({ animated: true, index: indexOfInScroll !== -1 ? indexOfInScroll : 0 });
                                }
                                else
                                {
                                    Toast.show({
                                        type: 'error',
                                        title: 'Note',
                                        message: 'No data on the map',
                                    });
                                }
                            }
                        }}
                    />
                );
            }
            else
            {
                return (
                    <View style={styles.coverNoData}>
                        <SvgIcon
                            name={'data empty'}
                            size={150}
                        />
                        <Text
                            title={'no data'}
                            size={'2xl'}
                            // fontFamily="Nunito-Bold"
                            paddingBottom={5}
                            paddingTop={5}
                        />
                    </View>
                );
            }
        }
        else
        {
            return <View />;
        }
    }, [typeView, dataSearch, dataSearchInMapLayer]);

    const renderBtnViewMap = useMemo(() =>
    {
        if (typeView === 'map-layer')
        {
            if ((navigationMode === undefined || navigationMode === true) && dataSearchInMapLayer.length > 0 && (searchThisArea === undefined || !searchThisArea) && !loading)
            {
                const field_map = configLayer?.Properties?.find(item => item.DataType === 7);
                const new_data = dataSearchInMapLayer?.filter(item => field_map && item[field_map.ColumnName]);
                if (new_data && new_data.length > 0 && field_map)
                {
                    return (
                        <TouchableOpacity
                            style={{ ...styles.viewAll, backgroundColor: Colors.Surface }}
                            onPress={() =>
                            {
                                const first_data = new_data[0];
                                const coor: {
                                    type: string,
                                    coordinates: number[]
                                } = typeof first_data[field_map.ColumnName] === 'string' ? JSON.parse(first_data[field_map.ColumnName]) : first_data[field_map.ColumnName];
                                Keyboard.dismiss();
                                setCenter(coor.coordinates);
                                scroll.current?.scrollToIndex({ animated: true, index: 0 });
                                setShowSuggest(false);
                                caculatorBound(tmpListCoor);
                            }}
                        >
                            <Text
                                size="sm"
                                title={'View map'}
                                colorScheme={'#1D9AFE'}
                                textAlign="center"
                                // fontFamily="Nunito-ExtraBold"
                            />
                        </TouchableOpacity>
                    );
                }
                else
                {
                    return <></>;
                }
            }
        }
        else
        {
            if ((navigationMode === undefined || navigationMode === true) && dataSearch?.docs?.length > 0 && (searchThisArea === undefined || !searchThisArea) && !loading)
            {
                return (
                    <TouchableOpacity
                        style={{ ...styles.viewAll, backgroundColor: Colors.Surface }}
                        onPress={() =>
                        {
                            Keyboard.dismiss();
                            setCenter([dataSearch?.docs[0].longitude, dataSearch?.docs[0].latitude]);
                            scroll.current?.scrollToIndex({ animated: true, index: 0 });
                            setShowSuggest(false);
                            caculatorBound(tmpListCoor);
                        }}
                    >
                        <Text
                            size="sm"
                            title={'View map'}
                            colorScheme={'#1D9AFE'}
                            textAlign="center"
                            // fontFamily="Nunito-ExtraBold"
                        />
                    </TouchableOpacity>
                );
            }
        }
    }, [navigationMode, dataSearch, typeView, searchThisArea, dataSearchInMapLayer, configLayer, tmpListCoor, loading]);

    const RenderSearchResult = (): JSX.Element =>
    {
        return (
            <>
                {/* {isSearchInMapLayer && (
                    <View style={{ 'backgroundColor': Colors.Surface, flexDirection: 'row', width: '100%', paddingVertical: 3 }}>
                        <TouchableOpacity
                            style={{
                                width: '50%',
                                borderRightWidth: 0.5,
                                'borderRightColor': Colors.OnSurface,
                                alignItems: 'center',
                                justifyContent: 'center',
                                paddingVertical: 5,
                            }}
                            onPress={() => setTypeView('location')}
                        >
                            <Text
                                title={'Location'}
                                textAlign="center"
                                fontFamily="Nunito-Bold"
                                colorScheme={typeView === 'location' ? Colors.OnSurface : '#929DA8'}
                            />
                        </TouchableOpacity>
                    
                        <TouchableOpacity
                            style={{ width: '50%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 5 }}
                            onPress={() =>
                            {
                                setTypeView('map-layer');
                                if (selected)
                                {
                                    filterQueryAndSearchData(selected);
                                }
                            }}
                        >
                            <Text
                                title={selected ? `${selected.label}` : 'Map Layer'}
                                textAlign="center"
                                fontFamily="Nunito-Bold"
                                paddingRight={10}
                                colorScheme={typeView === 'map-layer' ? Colors.OnSurface : '#929DA8'}
                            />
                            <TouchableOpacity
                                style={{ padding: 10 }}
                                onPress={() =>
                                {
                                    bottomSheet?.current?.present();
                                }}
                            >
                                <SvgIcon
                                    name="down arrow small"
                                />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    </View>
                )} */}

                {renderBtnViewMap}

                {loading
                    ? (
                            <Loading
                                size="large"
                                visible
                            />
                        )
                    : renderData
                }
            </>
        );
    };

    const flyToDes = async (coor: number[]) =>
    {
        camera?.current?.setCamera({
            centerCoordinate: coor,
            animationMode: 'flyTo',
            animationDuration: 1000,
        });
    };

    const locationSearchApi = async (searchKey: string, skip: number, take: number,
        lat: number, long: number, _lx: number, _ly: number, _rx: number, _ry: number) =>
    {
        if (typeof locationSearchFunction === 'function')
        {
            console.log('locationSearchFunction');
            return locationSearchFunction(searchKey, skip, take, lat, long, _lx, _ly, _rx, _ry)
        }
        else
        {
            return searchService.searchGeoLocation(searchKey, skip, take, lat, long, _lx, _ly, _rx, _ry)
        }
    }
    const callSearchLocationApi = async (value: string) =>
    {
        setLoading(true);
        if (mapRef?.current && mapRef.current.getVisibleBounds)
        {
            const b: any = await mapRef.current.getVisibleBounds();
            const latAndLong = searchValue?.includes(',') ? searchValue.split(',') : searchValue.split(' ');
            const data: any = await locationSearchApi(value, 0, 20, parseFloat(latAndLong[0]), parseFloat(latAndLong[1]), b[0][0], b[0][1], b[1][0], b[1][1]);
            setDataSearch(data?.docs ? data : { docs: []});
        }
    };

    const handleChange = async (e: NativeSyntheticEvent<TextInputChangeEventData>) =>
    {
        const value = e.nativeEvent.text;
        if (value === '' && selected)
        {
            if (typeView === 'map-layer')
            {
                filterQueryAndSearchData(selected);
            }
            else
            {
                callSearchLocationApi('');
            }
        }
        setSearchValue(value);
    };

    // const handleSelectedMapLayer = async (item: MapLayer) =>
    // {
    //     await bottomSheet?.current?.close();
    //     setSelected(item);

    //     if (getLayerConfig)
    //     {
    //         const config_layer: ConfigMapLayer | undefined = await getLayerConfig(item.layer);
    //         setConfigLayer(config_layer);
    //     }
    //     filterQueryAndSearchData(item);
    // };

    const filterQueryAndSearchData = (item: MapLayer) =>
    {
        const conditionQueryFields = item.config?.conditionQueryFields;
        let splitData: string[] = [];
        if (conditionQueryFields)
        {
            if (typeof conditionQueryFields === 'string')
            {
                splitData = conditionQueryFields?.trim()?.split('AND');
            }
            else if (typeof conditionQueryFields === 'object')
            {
                splitData = JSON.stringify(conditionQueryFields)?.trim()?.split('AND');
            }
        }
        else
        {
            splitData = [];
        }

        if (splitData.length > 0)
        {
            const newDataFilter = splitData.map(fl =>
            {
                const split_arr = fl?.trim()?.split('=');
                const perfix = split_arr[0];
                const suffix = `(${split_arr[split_arr.length - 1]})`;
                return `${perfix}:${suffix}`;
            }).join(' AND ');
            const bodyFilter = {
                'filterQuery': [`${newDataFilter}`],
                'take': -1,
            };
            handleSearchInMapLayer(item.layer, bodyFilter);
        }
        else
        {
            handleSearchInMapLayer(item.layer);
        }
    };

    const handleSearchInMapLayer = async (layer: string, filter?: any) =>
    {
        const latAndLong = searchValue?.includes(',') ? searchValue.split(',') : searchValue.split(' ');
        if (locationSearchMapLayer)
        {
            setLoading(true);
            const data: any = await locationSearchMapLayer(searchValue, parseFloat(latAndLong[0]), parseFloat(latAndLong[1]), layer, filter);

            setDataSearchInMapLayer(data?.data);
            setShowSuggest(true);
            setLoading(false);
        }
    };

    const renderDataHorizontal = () =>
    {
        if ((navigationMode === undefined || navigationMode === true) && showSearchInput === true)
        {
            if (typeView === 'map-layer' && configLayer)
            {
                const field_map = configLayer?.Properties?.find(item => item.DataType === 7);
                if (dataInMapLayer.length > 0 && mode !== 'direct' && mode !== 'directing' && mode !== 'directRoute' && field_map)
                {
                    return (
                        <View style={styles.flatListH}>
                            <FlatList
                                ref={scroll}
                                data={dataInMapLayer}
                                keyExtractor={(_e, index) => index.toString()}
                                showsHorizontalScrollIndicator={false}
                                renderItem={({ item, index }) =>
                                {
                                    if (item[field_map?.ColumnName])
                                    {
                                        const coor: {
                                            type: string,
                                            coordinates: number[]
                                        } = typeof item[field_map?.ColumnName] === 'string' ? JSON.parse(item[field_map?.ColumnName]) : item[field_map?.ColumnName];

                                        return (
                                            <View
                                                key={index}
                                                style={{ ...styles.selected, backgroundColor: Colors.Surface }}
                                            >
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                    <TouchableOpacity
                                                        style={{ display: 'flex', width: '80%', flexDirection: 'row', height: '100%', alignItems: 'center' }}
                                                        onPress={() =>
                                                        {
                                                            handleClick(coor.coordinates);
                                                        }}
                                                    >
                                                        <View>
                                                            <Text
                                                                size="xl"
                                                                title={item.Title || ''}
                                                                numberOfLines={2}
                                                            />
                                                            <View style={[styles.flexRowOnly, { justifyContent: 'center', alignItems: 'center' }]}>
                                                                <SvgIcon name={'marker Location'} />
                                                                <Text
                                                                    title={`${coor.coordinates}`}
                                                                    paddingLeft={5}
                                                                    numberOfLines={2}
                                                                    size={'sm'}
                                                                />
                                                            </View>
                                                        </View>
                                                    </TouchableOpacity>
                                                    {/* <TouchableOpacity
                                                        style={{ display: 'flex', paddingHorizontal: 5, height: '100%', alignItems: 'center', justifyContent: 'center' }}
                                                        onPress={() =>
                                                        {
                                                            if (setShowSearchInput === undefined || setRequestText === undefined || setRoutePoints === undefined || setIsShowDirection === undefined || setMode === undefined)
                                                            {
                                                                const routes = [
                                                                    [item?.Title],
                                                                    coor.coordinates,
                                                                ];
                                                                navigation && navigation(routes);
                                                            }
                                                            else
                                                            {
                                                                setShowSearchInput(false);
                                                                const result = ['My location', `${item?.Title}`];
                                                                setRequestText(result);

                                                                Geolocation.getCurrentPosition(
                                                                    (position: any) =>
                                                                    {
                                                                        const routes = [
                                                                            [position?.coords?.latitude, position?.coords?.longitude],
                                                                            coor.coordinates,
                                                                        ];

                                                                        setRoutePoints(routes);
                                                                        setIsShowDirection(true);
                                                                        setMode('direct');
                                                                    },
                                                                    (error) =>
                                                                    {
                                                                        console.error(error);
                                                                    },
                                                                    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, showLocationDialog: true },
                                                                );
                                                            }
                                                        }}
                                                    >
                                                        <SvgIcon name={'direction2'} />
                                                        <Text
                                                            title="Navigation"
                                                            fontFamily={'Nunito-Bold'}
                                                            colorScheme={'#0066B2'}
                                                            size={'sm'}
                                                        />
                                                    </TouchableOpacity> */}
                                                </View>
                                            </View>
                                        );
                                    }
                                    else
                                    {
                                        return <></>;
                                    }
                                }}
                                initialNumToRender={1000000}
                                pagingEnabled
                                horizontal
                                onMomentumScrollEnd={(event) =>
                                {
                                    const index = event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width;
                                    const roundIndex = Math.round(index);

                                    const dataCoor = dataInMapLayer[roundIndex][field_map.ColumnName];
                                    const coor: { type: string, coordinates: number[] } = typeof dataCoor === 'string' ? JSON.parse(dataCoor) : dataCoor;

                                    setCenter(coor.coordinates);

                                    flyToDes(coor.coordinates);
                                }}
                            />
                        </View>
                    );
                }
            }
            else
            {
                if (dataSearch?.docs.length > 0 && mode !== 'direct' && mode !== 'directing' && mode !== 'directRoute')
                {
                    return (
                        <View style={styles.flatListH}>
                            <FlatList
                                ref={scroll}
                                data={dataSearch?.docs}
                                keyExtractor={(_e, index) => index.toString()}
                                showsHorizontalScrollIndicator={false}
                                renderItem={({ item, index }) =>
                                {
                                    return (
                                        <View
                                            key={index}
                                            style={{ ...styles.selected, backgroundColor: Colors.Surface }}
                                        >
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <TouchableOpacity
                                                    style={{ display: 'flex', width: '80%', flexDirection: 'row', height: '100%', alignItems: 'center' }}
                                                    onPress={() =>
                                                    {
                                                        handleClick([item.longitude, item.latitude]);
                                                    }}
                                                >
                                                    <View>
                                                        <Text
                                                            size="xl"
                                                            title={item.name || ''}
                                                            numberOfLines={2}
                                                        />
                                                        <View style={[styles.flexRowOnly, { justifyContent: 'center', alignItems: 'center' }]}>
                                                            <SvgIcon name={'marker Location'} />
                                                            <Text
                                                                title={item.address ?? item.longitude + ', ' + item.latitude}
                                                                paddingLeft={5}
                                                                numberOfLines={2}
                                                                size={'sm'}
                                                            />
                                                        </View>
                                                    </View>
                                                </TouchableOpacity>
                                                {/* <TouchableOpacity
                                                    style={{ display: 'flex', paddingHorizontal: 5, height: '100%', alignItems: 'center', justifyContent: 'center' }}
                                                    onPress={() =>
                                                    {
                                                        if (
                                                            setShowSearchInput === undefined ||
                                                            setRequestText === undefined ||
                                                            setRoutePoints === undefined ||
                                                            setIsShowDirection === undefined ||
                                                            setMode === undefined
                                                        )
                                                        {
                                                            const routes = [
                                                                [item.name],
                                                                [item.latitude, item.longitude],
                                                            ];
                                                            navigation && navigation(routes);
                                                        }
                                                        else
                                                        {
                                                            setShowSearchInput(false);
                                                            const result = ['My location', `${item?.name}`];
                                                            setRequestText(result);

                                                            Geolocation.getCurrentPosition(
                                                                (position: any) =>
                                                                {
                                                                    const routes = [
                                                                        [position?.coords?.latitude, position?.coords?.longitude],
                                                                        [item.latitude, item.longitude],
                                                                    ];

                                                                    setRoutePoints(routes);
                                                                    setIsShowDirection(true);
                                                                    setMode('direct');
                                                                },
                                                                (error) =>
                                                                {
                                                                    console.error(error);
                                                                },
                                                                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, showLocationDialog: true },
                                                            );
                                                        }
                                                    }}
                                                >
                                                    <SvgIcon name={'direction2'} />
                                                    <Text
                                                        title="Navigation"
                                                        fontFamily={'Nunito-Bold'}
                                                        colorScheme={'#0066B2'}
                                                        size={'sm'}
                                                    />
                                                </TouchableOpacity> */}
                                            </View>
                                        </View>
                                    );
                                }}
                                initialNumToRender={1000000}
                                pagingEnabled
                                horizontal
                                onMomentumScrollEnd={(event) =>
                                {
                                    const index = event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width;
                                    const roundIndex = Math.round(index);
                                    const coor = [dataSearch?.docs[roundIndex]?.longitude, dataSearch?.docs[roundIndex]?.latitude];

                                    setCenter(coor);

                                    flyToDes(coor);
                                }}
                            />
                        </View>
                    );
                }
            }
        }
    };

    const handleSearchMapLayerLocal = (value: string) =>
    {
        const newData = dataMapLayerSelected.filter(item => `${item.label}`.trim().toLocaleLowerCase().includes(`${value}`.toLocaleLowerCase()));
        setDataMapLayerSelected(newData);
    };

    // const renderBottomSheet = useMemo(() =>
    // {
    //     return (
    //         <BottomSheet
    //             handleOpenBottomSheetModal={(bottomSheetModalRef) => setBottomSheet(bottomSheetModalRef)}
    //             snapPoints={snapPoints}
    //             type="flatList"
    //             data={{
    //                 data: dataMapLayerSelected,
    //                 renderItem: ({ item, index }: any) => (
    //                     <TouchableOpacity
    //                         key={index}
    //                         style={styles.viewSort}
    //                         onPress={() => handleSelectedMapLayer(item)}
    //                     >
    //                         <Text
    //                             size={'xl'}
    //                             title={`${item?.label || ''}`}
    //                         />
    //                         {`${selected?.id}` === `${item?.id}`
    //                             ? (
    //                                     <View style={styles.radius}>
    //                                         <View style={styles.select} />
    //                                     </View>
    //                                 )
    //                             : <View style={styles.radius} />
    //                         }
    //                     </TouchableOpacity>
    //                 ),
    //                 inputSearch: (selectedLayer && selectedLayer.length > 0) ? true : false,
    //                 handleSearch: (value: string) =>
    //                 {
    //                     if (value !== '' && dataMapLayerSelected.length > 0)
    //                     {
    //                         handleSearchMapLayerLocal(value);
    //                     }
    //                     else
    //                     {
    //                         setDataMapLayerSelected(selectedLayer || []);
    //                     }
    //                 },
    //             }}
    //             enablePanDownToClose
    //             closeAble
    //         />
    //     );
    // }, [bottomSheet, dataMapLayerSelected, selected, searchValue, selectedLayer]);

    return (
        <>
            <View style={[
                styles.resultContainer,
                Platform.OS === 'ios' && styles.resultContainerIOS,
                showSuggest ? {} : { display: 'none' },
                { 'backgroundColor': Colors.Background },
            ]}
            >
                <RenderSearchResult />
                {/* {renderBottomSheet} */}
            </View>
            {renderDataHorizontal()}
            
            <View style={styles.container}>
                {((displayButton && showSearchInput) || !displayButton) && (
                    <View style={{ ...styles.content, 'backgroundColor': showSuggest ? Colors.Surface : 'transparent' }}>
                        <View style={[styles.flexRowOnly, styles.SearchBox]}>
                            <TextInput
                                style={[
                                    { ...styles.input, color: Colors.OnSurface },
                                    showSuggest ? { backgroundColor: Colors.SurfaceVariants } : { backgroundColor: Colors.Surface },
                                    rounded ? { borderRadius: 25 } : { borderRadius: 5 },
                                    focus ? { borderWidth: 1, 'borderColor': '#4f87f7' } : { borderWidth: 1, 'borderColor': 'white' },
                                ]}
                                placeholder={t('Location name or address')}
                                value={searchValue}
                                placeholderTextColor={Colors.OnSurfaceVariants}
                                autoCapitalize="none"
                                autoCorrect={false}
                                onChange={handleChange}
                                onFocus={() =>
                                {
                                    setFocus(true);
                                    searchValue.length > 0 && setShowSuggest(true);
                                    onFocus && onFocus();
                                }}
                                onBlur={() =>
                                {
                                    setFocus(false);

                                    onBlur && onBlur();
                                }}
                            />
                            <TouchableOpacity
                                style={styles.iconSearch}
                                onPress={() =>
                                {
                                    console.log('onSearch');
                                    if (!searchValue) {return;}
                                    Keyboard.dismiss();
                                    if (typeView === 'location')
                                    {
                                        callSearchLocationApi(searchValue);
                                        setShowSuggest(true);
                                    }
                                    else
                                    {
                                        if (selected)
                                        {
                                            filterQueryAndSearchData(selected);
                                        }
                                        else
                                        {
                                            Toast.show({
                                                type: 'error',
                                                title: 'Note',
                                                message: 'That no layer is selected',
                                            });
                                        }
                                    }
                                }}
                            >
                                <FAIcon
                                    icon={'search'}
                                    backgroundColor="rgba(255, 255, 255, 0)"
                                    color={'gray'}
                                    size={17}
                                />
                            </TouchableOpacity>
                            {searchValue.length !== 0 && !loading && (
                                <TouchableOpacity
                                    style={styles.iconClear}
                                    onPress={() =>
                                    {
                                        clearSearch();
                                        clear !== undefined && clear();
                                    }}
                                >
                                    <SvgIcon name={'clear'} />
                                </TouchableOpacity>
                            )}
                            {loading && !showSuggest && (
                                <View style={styles.iconLoading}>
                                    <Loading
                                        size="small"
                                        visible
                                    />
                                </View>
                            )}
                        </View>
                        {(navigationMode === undefined || navigationMode === true) && !showSuggest && dataSearch?.docs.length > 0 && (
                            (
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <TouchableOpacity
                                        style={[{ backgroundColor: Colors.Surface, borderRadius: 20 }, styles.shadow]}
                                        onPress={() =>
                                        {
                                            setShowSuggest(true);
                                            callSearchLocationApi(searchValue);
                                        }}
                                    >
                                        <Text
                                            title={'View list'}
                                            size={'lg'}
                                            paddingTop={5}
                                            paddingBottom={5}
                                            paddingLeft={10}
                                            paddingRight={10}
                                        />
                                    </TouchableOpacity>
                                </View>
                            )
                        )}
                    </View>
                )}
            </View>
        </>
    );
};
const styles = StyleSheet.create({
    SearchBox: {
        alignItems: 'center',
    },

    card: {
        height: 'auto',
        paddingHorizontal: 10,
        paddingTop: 15,
    },
    container: {
        elevation: 5,
        flex: 1,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        width: '100%',
        zIndex: 9999,
        // paddingTop: Platform.OS === 'ios' ? 44 : 0,
    },
    content: {
        justifyContent: 'space-between',
        marginTop: 5,
        paddingHorizontal: 10,
        zIndex: 2,
    },
    coverNoData: {
        alignItems: 'center',
        marginTop: 270,
    },
    flatListH: {
        bottom: 10,
        position: 'absolute',
        width: Dimensions.get('window').width,
        zIndex: 2,
    },
    flexRowOnly: {
        flexDirection: 'row',
    },
    iconClear: {
        alignItems: 'center',
        height: 40,
        justifyContent: 'center',
        position: 'absolute',
        right: 40,
        width: 40,
        zIndex: 9999,
    },
    iconLoading: {
        alignItems: 'center',
        height: 40,
        justifyContent: 'center',
        position: 'absolute',
        right: 25,
        width: 40,
        zIndex: 9999,
    },

    iconSearch: {
        alignItems: 'center',
        height: 40,
        justifyContent: 'center',
        position: 'absolute',
        right: 0,
        width: 40,
        zIndex: 9999,
    },

    input: {
        height: 50,
        marginVertical: 5,
        paddingLeft: 15,
        paddingRight: 40,
        paddingVertical: 15,
        width: '100%',
        zIndex: 999,
    },

    radius: {
        alignItems: 'center',
        'borderColor': '#dadada',
        borderRadius: 20,
        borderWidth: 1.5,
        height: 23,
        justifyContent: 'center',
        width: 23,
    },

    resultContainer: {
        borderBottomEndRadius: 5,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        height: '100%',
        paddingTop: 65,
        position: 'absolute',
        top: 0,
        width: '100%',
        zIndex: 10,
    },
    resultContainerIOS: {
        maxHeight: Dimensions.get('window').height,
    },
    select: {
        'backgroundColor': '#37A6FF',
        borderRadius: 20,
        height: 15,
        width: 15,
    },

    selected: {
        alignItems: 'center',
        borderRadius: 10,
        elevation: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        marginHorizontal: 10,
        paddingHorizontal: 10,
        paddingVertical: 4,
        'shadowColor': '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 1,
        width: Dimensions.get('window').width - 20, // 20 is margin left and right
    },
    shadow: {
        elevation: 3,
        'shadowColor': 'red',
        shadowOffset: {
            width: 1,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4.41,
    },
    viewAll: {
        borderRadius: 50,
        bottom: 20,
        elevation: 3,
        padding: 10,
        position: 'absolute',
        right: 15,
        'shadowColor': '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        zIndex: 9999,
    },
    viewSort: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 2,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },

    wordContainer: {
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingHorizontal: 10,
        width: '100%',
    },
});
export default SearchLocation;
