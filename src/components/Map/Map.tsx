/* eslint-disable react-native/no-inline-styles */
// react native
import React, { useContext } from 'react';
import { LogBox, Platform, Pressable, StyleSheet, View } from 'react-native';
import { MapContext } from './Contexts/mapContext';

// assets

import mapBoundaryImage from './mapImage/map-style-boundary.png';
import mapDarkImage from './mapImage/map-style-dark.png';
import mapDefaultImage from './mapImage/map-style-default.png';
import mapLightImage from './mapImage/map-style-light.png';
import mapSatelliteImage from './mapImage/map-style-satellite.png';
import mapTerrainImage from './mapImage/map-style-terrain.png';
import hereMapDarkImage from './mapImage/here-map-style-dark.png';
import hereMapLightImage from './mapImage/here-map-style-light.png';

// map style

import lightStyle from './MapStyles/default.json';

// packages
import MapboxGL from '@react-native-mapbox-gl/maps';

// base/mui component,const,enum
import Colors from '../theme/colors';


// app component,const, enum
import { MapProps } from '.';
import { Permission } from '../../services/CheckPermission';
import { MeasureContext } from './Contexts/MeasureContext';
// import OfflineManager from './MapComponent/OfflineManager';
import StyleSwitcher from './MapComponent/StyleSwitch';

// component in same module/view/folder

// services

import PulseCircleLayer from './PulseCircleLayer';

// token
// import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
// import SvgIcon from '../SvgIcon/SvgIcon';
import Text from '../Text/Text';
import Toast from '../Toast/Toast';
import accessToken from './accessToken.json';
import { DirectionContext } from './Contexts/directionContext';
import Geolocation from 'react-native-geolocation-service';
import { SearchLocationContext } from './Contexts/searchLocationContext';
import { MapControlButton } from './MapControlButton';
// import storage from '../storage/mmkv';

LogBox.ignoreLogs(['EventEmitter']);
LogBox.ignoreLogs(['{"PERMISSION_DENIED":']);
LogBox.ignoreLogs(['Mapbox error [HTTP]']);
LogBox.ignoreLogs(['Failed to load tile']);

MapboxGL.setAccessToken(accessToken.token);
class BaseMap extends React.Component<MapProps>
{
    snap: number[] = [];
    PermissionService = new Permission();

    constructor(props: MapProps)
    {
        super(props);
        // global override
        // this.overrideStyle(lightStyle, globalOverride);
        // this.overrideStyle(darkStyle, globalOverride);
        // this.overrideStyle(satelliteStyle, globalOverride);
        // this.overrideStyle(defaultStyle, globalOverride);
        // this.overrideStyle(terrainStyle, globalOverride);
        // this.overrideStyle(boundaryStyle, globalOverride);

        // local override
        // this.overrideStyle(hereLightStyle, hereLightStyleOverride, this.props.overrideParams);
        // this.overrideStyle(hereDarkStyle, hereDarkStyleOverride, this.props.overrideParams);
        // this.overrideStyle(lightStyle, lightStyleOverride, this.props.overrideParams);
        // this.overrideStyle(darkStyle, darkStyleOverride, this.props.overrideParams);
        // this.overrideStyle(defaultStyle, lightStyleOverride, this.props.overrideParams);
        // this.overrideStyle(satelliteStyle, satelliteStyleOverride, this.props.overrideParams);
        // this.overrideStyle(terrainStyle, terrainStyleOverride, this.props.overrideParams);
        // this.overrideStyle(boundaryStyle, boundaryStyleOverride, this.props.overrideParams);

        // console.log('this.props.overrideParams', this.props.overrideParams);

        if (this.props?.overrideParams?.API_KEY !== undefined)
        {
            const changeSource = (style) =>
            {
                for (const key of Object.keys(style.sources))
                {
                    if (style.sources[key].tiles)
                    {
                        style.sources[key].tiles[0] = style.sources[key].tiles[0].replace('{API_KEY}', this.props?.overrideParams?.API_KEY);
                    }
                }

                style.sprite = style.sprite.replace('{API_KEY}', this.props?.overrideParams?.API_KEY);
                style.glyphs = style.glyphs.replace('{API_KEY}', this.props?.overrideParams?.API_KEY);
            }
            changeSource(lightStyle);
        }
        // console.log('lightStyle', JSON.stringify(lightStyle));
        if (this.props.mapKey)
        {
            MapboxGL.addCustomHeader('Authorization', this.props.mapKey);
            global.ss_authorization = this.props.mapKey;
        }
        this.state = {
            // mapType: this.props.mapType ?? storage.getString('THEME_MODE') === 'light2' ? 'light' : 'dark',.
            mapType: 'light',
            name: `${Date.now()}`,
            coordinate: null,
            userLocation: [],
            tracking: false,
            handleSheetLevel: 0,
            zoomLevel: this.props.zoomLevel ?? 13,
            onlineTimeout: false,
            showUserLocation: true,
            firstLoad: true,
            bottomSheetOverlay: false,
            autoStoreMap: false,
            // autoStoreMap: storage.getBoolean('autoStoreMap') ?? false,
            autoSaveInprogress: 100,
            reload: false,
            saveAreaInMap: false,
            RegionAbleChange: true,
            searchFocus: false,
            isMeasuring: false,
            directionState: {
                route: null,
                arrow: [],
                data: [],
                indice: 0,
                routePoints: [],
                isDirection: false,
            },
            showInputSearchState: false,
            heading: 0,
        };
    }

    // bottom = React.createRef<BottomSheetModalMethods>();
    _map: MapboxGL.Camera | null = null;
    mapRef: MapboxGL.MapView | null = null;

    state = {
        name: `${Date.now()}`,
        mapType: 'default',
        coordinate: null,
        userLocation: [],
        tracking: false,
        handleSheetLevel: 0,
        zoomLevel: this.props.zoomLevel ?? 13,
        onlineTimeout: false,
        showUserLocation: false,
        firstLoad: true,
        bottomSheetOverlay: false,
        autoStoreMap: false,
        // autoStoreMap: storage.getBoolean('autoStoreMap') ?? false,
        autoSaveInprogress: 100,
        reload: false,
        saveAreaInMap: false,
        RegionAbleChange: true,
        searchFocus: false,
        isMeasuring: false,
        directionState: {
            route: null,
            arrow: [],
            data: [],
            indice: 0,
            routePoints: [],
            isDirection: false,
        },
        showInputSearchState: false,
        heading: 0,
    };

    componentDidUpdate(prevProps): void
    {
        if (this.props.enableTracking)
        {
            if (prevProps.enableTracking !== this.props.enableTracking)
            {
                this.state.tracking && this.setState({ tracking: false });
            }
        }
    }

    componentDidMount()
    {
        const { setTypeButton, type } = this.props as any;
        if (type)
        {
            setTypeButton(type);
        }
        Geolocation.watchPosition(
            (position) =>
            {
                this.setState({ userLocation: [position.coords.longitude, position.coords.latitude] });
            },
            (error) =>
            {
                console.log(error.code, error.message);
            },
            { showLocationDialog: false },
        );
    }

    applyParams = (source: any, params?: any) =>
    {
        const stringIteratorRegex = /\${(.*?)}/g;

        const stack = [source];
        while (stack?.length > 0)
        {
            const currentObj = stack.pop();
            Object.keys(currentObj).forEach(key =>
            {
                if (typeof currentObj[key] === 'string')
                {
                    let m;
                    // console.log(`key: ${key}, value: ${currentObj[key]}`);
                    let replacedString = currentObj[key];
                    while ((m = stringIteratorRegex.exec(currentObj[key])) !== null)
                    {
                        // This is necessary to avoid infinite loops with zero-width matches
                        if (m.index === stringIteratorRegex.lastIndex)
                        {
                            stringIteratorRegex.lastIndex++;
                        }

                        if (replacedString && params && params[m[1]])
                        {
                            replacedString = replacedString.replace(m[0], params[m[1]]);
                        }
                    }

                    currentObj[key] = replacedString;
                }
                if (typeof currentObj[key] === 'object' && currentObj[key] !== null)
                {
                    stack.push(currentObj[key]);
                }
            });
        }
    };

    overrideStyle = (origin: any, override: any, params?: any): void =>
    {
        if (!override)
        {
            return;
        }

        for (const key in override.sources)
        {
            const source = override.sources[key];
            const originSource = origin.sources[key];
            if (originSource)
            {
                origin.sources[key] = JSON.parse(JSON.stringify(source));
            }
            else
            {
                origin.sources.push(JSON.parse(JSON.stringify(source)));
            }
        }

        for (const layer of override.layers)
        {
            if (layer.add)
            {
                const originLayer = origin.layers.find((l) => l.id === layer.id);
                const afterLayerIndex = origin.layers.findIndex((l) => l.id === layer.after);

                if (!originLayer && afterLayerIndex >= 0)
                {
                    origin.layers.splice(afterLayerIndex, 0, JSON.parse(JSON.stringify(layer)));
                }
            }
            else
            {
                const originLayer = origin.layers.find((l) => l.id === layer.id);

                if (originLayer)
                {
                    this.overrideObject(originLayer, layer);
                }
            }
        }

        if (override.sprite)
        {
            origin.sprite = override.sprite;
        }

        if (override.glyphs)
        {
            origin.glyphs = override.glyphs;
        }

        if (params)
        {
            this.applyParams(origin, params);
        }
    };

    overrideObject = (origin: object, override: object): void =>
    {
        for (const key of Object.keys(override))
        {
            const prop = override[key];

            if (Array.isArray(prop))
            {
                origin[key] = Object.assign([], prop);
            }
            else if (typeof prop !== 'object')
            {
                origin[key] = prop;
            }
            else
            {
                if (typeof origin[key] === 'object')
                {
                    this.overrideObject(origin[key], prop);
                }
                else
                {
                    origin[key] = prop;
                }
            }
        }
    };

    movetoMyLocation = async () =>
    {
        const locationOnTime = await this.PermissionService.checkLocation();
        if (locationOnTime)
        {
            this.setState({ tracking: true, showUserLocation: true });
            this.state.userLocation.length !== 0 && this._map?.setCamera({
                centerCoordinate: this.state.userLocation,
                animationMode: 'flyTo',
                animationDuration: 500,
                zoomLevel: 18,
            });
        }

    };

    onUserLocationUpdate = async (position: MapboxGL.Location): Promise<void> =>
    {
        await this.setState({ userLocation: [position.coords.longitude, position.coords.latitude] }, async () =>
        {
            this.state.userLocation.length !== 0 && this._map?.setCamera({
                centerCoordinate: this.state.userLocation,
                animationMode: 'flyTo',
                animationDuration: 500,
                zoomLevel: 18,
            });
        });
    };

    onUserLocationUpdateCoordinateOnly = async (position: MapboxGL.Location) =>
    {
        await this.setState({ userLocation: [position.coords.longitude, position.coords.latitude] });
    };

    setZoom = async (index: number): Promise<void> =>
    {
        const currentZoom = await this.mapRef?.getZoom() ?? 13;
        const zoomNow = (this.state.saveAreaInMap && currentZoom <= 7)
            ? index === 0 ? currentZoom + 1 : 7
            : index === 0
                ? currentZoom + 1
                : this.state.RegionAbleChange ? currentZoom - 1 : currentZoom;

        this._map?.setCamera({
            zoomLevel: zoomNow,
            animationDuration: 1000,
            animationMode: 'flyTo',
        });

        if (this.state.saveAreaInMap && currentZoom === 7 && this.state.RegionAbleChange && index === 1)
        {
            Toast.show({
                type: 'error',
                title: 'Zoom map failed',
                message: 'The map one-record area limit has been reached',
                visibilityTime: 3000,
                topOffset: Platform.OS === 'android' ? 100 : 150,
            });
        }

        this.setState({ zoomLevel: currentZoom, RegionAbleChange: true });
    };

    saveMap = async () =>
    {
        const zoomLevel: any = await this.mapRef?.getZoom();

        if (parseInt(zoomLevel) >= 10 && this.state.autoSaveInprogress === 100)
        {
            console.log(zoomLevel, 'save Accept');
            const bounds: any = await this.mapRef?.getVisibleBounds();
            const zoom = await this.mapRef?.getZoom();
            const nameType = this.state.mapType;

            MapboxGL.offlineManager.createPack({
                name: Date.now() + '_' + nameType + '_Auto',
                styleURL: `https://thanhdzaz.github.io/j-server/${this.state.mapType}.json`,
                minZoom: zoom ? zoom >= 25 ? 24 : zoom : 20,
                maxZoom: zoom ? zoom >= 20 ? 25 : 20 : 25,
                bounds: [
                    bounds[0],
                    bounds[1],
                ],
            }, this.onDownloadProgress, this.errorListener);
        }
        else
        {
            console.log(zoomLevel, this.state.autoSaveInprogress, 'save Denied');
        }
    };

    onDownloadProgress = (_offlineRegion: MapboxGL.OfflinePack, _offlineRegionStatus: MapboxGL.OfflineProgressStatus) =>
    {
        console.log(_offlineRegionStatus.percentage);
        this.setState({ autoSaveInprogress: _offlineRegionStatus.percentage });

        _offlineRegionStatus.percentage !== 100 ? this.setState({ reload: false }) : this.setState({ reload: true });
    };

    errorListener = (offlinePack: any, err: any) =>
    {
        const nameData = JSON.parse(offlinePack?.pack?.metadata);
        MapboxGL.offlineManager.unsubscribe(nameData?.name);
        this.deletePacks(nameData?.name);
    };

    deletePacks = async (namePack: string) =>
    {
        await MapboxGL.offlineManager.deletePack(namePack).catch((err) =>
        {
            console.error(err);
        });
    };

    render(): React.ReactNode
    {
        enum StyleMap
        {
            // 'hereLight' = JSON.stringify(hereLightStyle) as any,
            // 'hereDark' = JSON.stringify(hereDarkStyle) as any,
            'light' = JSON.stringify(lightStyle) as any,
            // 'dark' = JSON.stringify(darkStyle) as any,
            // 'classic' = JSON.stringify(defaultStyle) as any,
            // 'terrain' = JSON.stringify(terrainStyle) as any,
            // 'satellite' = JSON.stringify(satelliteStyle) as any,
            // 'boundary' = JSON.stringify(boundaryStyle) as any,
        }

        // type map
        enum imgMap
        {
            'hereLight' = hereMapLightImage as any,
            'hereDark' = hereMapDarkImage as any,
            'light' = mapLightImage as any,
            'dark' = mapDarkImage as any,
            'classic' = mapDefaultImage as any,
            'terrain' = mapTerrainImage as any,
            'satellite' = mapSatelliteImage as any,
            'boundary' = mapBoundaryImage as any,
        }

        const {
            zoomLevel,
            hideUserLocation,
            defaultLocation,
            showButtonSearch,
            searchOptionForm,
            showInputSearch,
            viewMore,
            showZoom,
            compassViewMargins,
            compassViewPosition,
            // mapStyleList,
            showLayerMap,
            onSelectedMapType,
        } = this.props;

        const {
            mapType,
            userLocation,
            tracking,
            handleSheetLevel,
            autoStoreMap,
            directionState,
            showInputSearchState,
        } = this.state;

        const {
            isPresent,
            handleClickSearchBtn,
            showSearchInput,
            isShowDirection,
            routePoints,
            setRoutePoints,
            setShowSearchInput,
            setIsShowDirection,
            setSelectedPointCoordinates,
            setRequestText,
            setSearchView,
            mode,
            setMode,
        } = this.props as any;

        const timeoutOnline = () =>
        {
            setTimeout(() =>
            {
                this.setState({ onlineTimeout: true });
            }, 6000);
        };

        const MyLocation = () =>
        {
            return (
                <>
                    {!hideUserLocation && !directionState.isDirection && (
                        <MapControlButton
                            iconComponent="SvgIcon"
                            icon={tracking ? 'my location active' : 'my location'}
                            background={Colors.Surface}
                            iconSize={(this.props.type && this.props.type === 2) ? 14 : 20}
                            btnSize={(this.props.type && this.props.type === 2) ? 50 : 60}
                            isRound={(!(this.props.type && this.props.type === 2))}
                            onPress={() =>
                            {
                                this.props.onRegionDidChange && this.props.onRegionDidChange();

                                if (!this.state.tracking)
                                {
                                    this.movetoMyLocation();
                                }
                                else
                                {
                                    this.setState({ tracking: false, showUserLocation: false });
                                }
                            }}
                        />
                    )}
                </>
            );
        };

        return (
            <>
                <View style={styles.view}>
                    <MapboxGL.MapView
                        ref={(ref) =>
                        {
                            const { setMapRef } = this.props as any;
                            setMapRef && setMapRef(ref);
                            this.props.mapRef && this.props.mapRef(ref);
                            this.mapRef = ref;
                        }}
                        styleURL={StyleMap[mapType]}
                        style={styles.map}
                        compassViewPosition={compassViewPosition ? compassViewPosition : 0}
                        compassViewMargins={compassViewMargins
                            ? compassViewMargins
                            : ((showButtonSearch && showInputSearchState) || (showInputSearch && !directionState.isDirection))
                                    ? { x: 10, y: 90 }
                                    : { x: 10, y: 10 }}
                        logoEnabled={false}
                        attributionEnabled={false}
                        zoomEnabled
                        compassEnabled
                        rotateEnabled
                        onRegionDidChange={async () =>
                        {
                            this.props.onRegionDidChange && this.props.onRegionDidChange();
                            autoStoreMap && this.saveMap();

                            if (this.state.saveAreaInMap)
                            {
                                const zoomlv = await this.mapRef?.getZoom() ?? 0;

                                if (zoomlv < 7)
                                {
                                    this._map?.setCamera({
                                        zoomLevel: 7,
                                        animationDuration: 1000,
                                        animationMode: 'flyTo',
                                    });

                                    Toast.show({
                                        type: 'error',
                                        title: 'Zoom map failed',
                                        message: 'The map one-record area limit has been reached',
                                        visibilityTime: 3000,
                                        topOffset: Platform.OS === 'android' ? 100 : 150,
                                    });
                                }
                            }
                        }}
                        onTouchStart={() =>
                        {
                            this.props.onTouchStart && this.props.onTouchStart();
                            this.setState({ tracking: false });
                        }}
                        onWillStartLoadingMap={() =>
                        {
                            this.setState({ name: `${Date.now()}` });
                        }}
                        onDidFinishLoadingMap={() =>
                        {
                            this.props.onDidFinishLoadingMap && this.props.onDidFinishLoadingMap();
                        }}
                        onPress={(features: any) =>
                        {
                            const {
                                onPlaceNewPoint,
                                isMeasuring: hehe,
                                whichJustUpdate,
                                setRouteSelectedPoints,
                            } = this.props as any;

                            if (hehe)
                            {
                                onPlaceNewPoint(features.geometry.coordinates);
                            }

                            if (mode === 'directSelectPoint')
                            {
                                if (setSelectedPointCoordinates)
                                {
                                    setSelectedPointCoordinates(features.geometry.coordinates);
                                    setRouteSelectedPoints((ro) =>
                                    {
                                        const result = [...ro];
                                        result[whichJustUpdate] = features.geometry.coordinates;
                                        return result;
                                    });
                                }
                            }
                            this.props.onPress && this.props.onPress(features);

                        }}
                    >
                        <MapboxGL.Camera
                            ref={(r) =>
                            {
                                this._map = r;
                                const { setCamera } = this.props as any;
                                setCamera && setCamera(r);
                                this.props.cameraRef && this.props.cameraRef(r);
                            }}
                            pitch={this.props.pitch ?? 0}
                            zoomLevel={zoomLevel ?? 13}
                            centerCoordinate={defaultLocation ?? [77.208889, 28.613889]}
                            animationMode={'flyTo'}
                            animationDuration={500}
                        />

                        {this.props.children}

                        {this.state.showUserLocation && (
                            <MapboxGL.UserLocation
                                animated={false}
                                androidRenderMode={undefined}
                                showsUserHeadingIndicator
                                onUpdate={(_location) =>
                                {
                                    if (this.props.onUserLocationChange)
                                    {
                                        this.props.onUserLocationChange(_location.coords);
                                    }
                                    tracking ? (this.onUserLocationUpdate(_location)) : !hideUserLocation && this.onUserLocationUpdateCoordinateOnly(_location);
                                }}

                            />
                        )}

                        {!hideUserLocation && userLocation.length > 0 && this.state.showUserLocation
                            ? (
                                    <PulseCircleLayer
                                        shape={this.state.userLocation}
                                        heading={this.state.heading}
                                    />
                                )
                            : null
                        }
                    </MapboxGL.MapView>

                    {/* {(this.props.isConnected !== null &&
                        ((!showButtonSearch && !showInputSearchState) || !showInputSearch) && !this.props.isConnected)
                        ? (
                                <View
                                    style={[styles.isConnect, { 'backgroundColor': '#CD0000' }]}
                                    onLayout={() => this.setState({ firstLoad: false })}
                                >
                                    <View style={{ marginTop: 2 }}>
                                        <SvgIcon name="no network" />
                                    </View>
                                    <Text
                                        title={('You are offline now')}
                                        colorScheme="#FFFFFF"
                                        fontFamily="Nunito-Bold"
                                        paddingLeft={5}
                                    />
                                </View>
                            )
                        : (handleSheetLevel !== 2 && !this.state.onlineTimeout && !this.state.firstLoad) && (

                                <View
                                    style={[styles.isConnect, { 'backgroundColor': '#6899FF' }]}
                                    onLayout={() => timeoutOnline()}
                                >
                                    <Text
                                        title={('You are online now')}
                                        colorScheme="#FFFFFF"
                                        fontFamily="Nunito-Bold"
                                    />
                                </View>
                            )} */}
                    {!this.props.hiddenStyleMap && (
                        <View style={[styles.rightContainerIc,
                            (showSearchInput)
                                ? { top: searchOptionForm ? 70 : 20 }
                                : isShowDirection
                                    ? { top: '27%' }
                                    : !this.props.isConnected
                                            ? { top: 40 }
                                            : { top: 20 },
                        ]}
                        >
                            <StyleSwitcher
                                imgMap={imgMap}
                                mapStyleList={this.props.mapStyleList}
                                defaultSelect={mapType}
                                size={(this.props.type && this.props.type === 2) ? 50 : 60}
                                rounded={!!(this.props.type && this.props.type === 2)}
                                border={!!(this.props.type && this.props.type === 2)}
                                mapLayer
                                onStyleChange={(_mapType: string) =>
                                {
                                    this.setState({ name: `${Date.now()}` }, () =>
                                    {
                                        this.setState({ mapType: _mapType });
                                        if (onSelectedMapType)
                                        {
                                            onSelectedMapType(_mapType);
                                        }
                                    });
                                }}
                            />
                        </View>
                    )}

                    <View style={{
                        ...styles.rightContainerIc,
                        top: showSearchInput
                            ? (this.props.type && this.props.type === 2) ? '40%' : 130
                            : (this.props.type && this.props.type === 2) ? '40%' : 70,
                    }}
                    >
                        <View style={styles.h10} />

                        {/* START ZOOM BTN */}
                        {!this.state.searchFocus && showZoom && (
                            <>
                                <View style={styles.zoomControl}>
                                    <Pressable
                                        style={[styles.zoomBtn1, { backgroundColor: Colors.Surface }]}
                                        onPress={() => this.setZoom(0)}
                                    >
                                        <Text
                                            title="+"
                                            size={'3xl'}
                                            colorScheme={'OnSurface'}
                                        />
                                    </Pressable>

                                    <Pressable
                                        style={[styles.zoomBtn, { backgroundColor: Colors.Surface }]}
                                        onPress={() => this.setZoom(1)}
                                    >
                                        <Text
                                            title="-"
                                            size={'3xl'}
                                            colorScheme={'OnSurface'}
                                        />
                                    </Pressable>
                                </View>
                                <View style={styles.h10} />

                            </>
                        )}
                        {/* START ZOOM BTN */}

                        {/* START SEARCHLOCATION */}
                        {(isPresent && (routePoints === undefined || routePoints.length === 0 || mode === 'direct')) && (
                            <>
                                <View style={[
                                    styles.viewMore,
                                    (this.props.type && this.props.type === 2)
                                        ? { width: 50, height: 50 }
                                        : { width: 60, height: 60 }]}
                                >
                                    <MapControlButton
                                        icon="search"
                                        iconSize={(this.props.type && this.props.type === 2) ? 14 : 20}
                                        btnSize={(this.props.type && this.props.type === 2) ? 50 : 60}
                                        isRound={(this.props.type && this.props.type === 2) ? false : true}
                                        isActive={showSearchInput ? true : false}
                                        onPress={() =>
                                        {
                                            if (this.props.isConnected === undefined || this.props.isConnected || showSearchInput)
                                            {
                                                handleClickSearchBtn();
                                                setIsShowDirection && setIsShowDirection(false);
                                                setRoutePoints([]);
                                                setMode(!showSearchInput ? 'search' : '');
                                                this.setState({ tracking: false });
                                            }
                                            else
                                            {
                                                Toast.show({
                                                    type: 'error',
                                                    title: 'Note',
                                                    message: 'This function requires internet connection to work correctly. Please try to connect to the internet.',
                                                    visibilityTime: 2000,
                                                });
                                            }
                                        }}
                                    />
                                </View>
                                <View style={styles.h10} />
                            </>
                        )}
                        {/* END SEARCHLOCATION */}


                        {/* START AUTO STORE MAP OFFLINE */}
                        {/* {this.props.autoLocalStoreMap && (
                            <>
                                <View style={styles.viewMore}>
                                    <MapControlButton
                                        icon="arrow-down"
                                        iconSize={(this.props.type && this.props.type === 2) ? 14 : 20}
                                        btnSize={(this.props.type && this.props.type === 2) ? 50 : 60}
                                        isRound={(!(this.props.type && this.props.type === 2))}
                                        isActive={autoStoreMap}
                                        onPress={() =>
                                        {
                                            const save = storage.getBoolean('autoStoreMap') ?? false;
                                            storage.set('autoStoreMap', !save);
                                            this.setState({ autoStoreMap: !save }, () =>
                                            {
                                                !save && this.saveMap();
                                            });
                                        }}
                                    />
                                </View>
                                <View style={styles.h10} />
                            </>
                        )} */}
                        {/* END AUTO STORE MAP OFFLINE */}

                        {/* START STORE MAP OFFLINE */}
                        {/* {viewMore && (
                            <>
                                <View style={styles.viewMore}>
                                    <MapControlButton
                                        icon="ellipsis-h"
                                        iconSize={(this.props.type && this.props.type === 2) ? 14 : 20}
                                        btnSize={(this.props.type && this.props.type === 2) ? 50 : 60}
                                        isRound={(!(this.props.type && this.props.type === 2))}
                                        onPress={() =>
                                        {
                                            this.bottom.current?.present();
                                            this.setState({ bottomSheetOverlay: true, tracking: false, showUserLocation: false });
                                            setTimeout(() =>
                                            {
                                                this.setState({ reload: false });
                                            }, 10);
                                        }}
                                    />
                                </View>
                                <View style={styles.h10} />
                            </>
                        )} */}
                        {/* END STORE MAP OFFLINE */}

                        <MyLocation />

                        {(mode !== 'directing' && mode !== 'directRoute' && this.props.isShowButtonDirection) && (
                            <>
                                <View style={styles.viewMore}>
                                    <View style={styles.h10} />
                                    <MapControlButton
                                        icon="directions"
                                        background={Colors.Surface}
                                        isActive={isShowDirection}
                                        iconSize={20}
                                        btnSize={this.props.isShowButtonDirection ? 50 : 60}
                                        isRound={!this.props.isShowButtonDirection}
                                        onPress={async () =>
                                        {
                                            await setSelectedPointCoordinates([]);
                                            await setRequestText(['My location', '']);
                                            await setRoutePoints([]);
                                            await setShowSearchInput(false);
                                            await setIsShowDirection(!isShowDirection);


                                            await setMode(!isShowDirection ? 'direct' : '');
                                            setSearchView(true);
                                        }}
                                    />
                                </View>
                            </>
                        )}

                        {this.props.isShowButtonMapLayer && (
                            <View style={styles.viewMore}>
                                <View style={styles.h10} />
                                <MapControlButton
                                    icon="layer-group"
                                    background={Colors.Surface}
                                    iconSize={20}
                                    btnSize={this.props.isShowButtonMapLayer ? 50 : 60}
                                    isRound={!this.props.isShowButtonMapLayer}
                                    isActive={false}
                                    onPress={showLayerMap}
                                />
                            </View>
                        )}
                    </View>
                </View>

                {/* <OfflineManager
                    currentType={mapType}
                    mapRef={this.mapRef as any}
                    setSheetRef={(ref) =>
                    {
                        this.bottom = ref;
                    }}
                    reload={this.state.reload}
                    progress={this.state.autoSaveInprogress}
                    onDeletePack={() => this.setState({ autoSaveInprogress: 100 })}
                    onSelect={(val: any) =>
                    {
                        this.setState({ mapType: val?.metadata?.name.slice(val?.metadata?.name.indexOf('_') + 1) });
                        this._map?.fitBounds(val.bounds[0], val.bounds[1]);
                    }}
                    onChooseAreaToSave={() =>
                    {
                        this.setState({ autoStoreMap: false, saveAreaInMap: true, RegionAbleChange: false });
                        this.setZoom(1);
                    }}
                    onCancelOrSaveAreaByHand={() =>
                    {
                        const save = storage.getBoolean('autoStoreMap') ?? false;
                        storage.set('autoStoreMap', save);
                        this.setState({ autoStoreMap: save });
                    }}
                    onDowloadingMap={(x) => this.setState({ saveAreaInMap: false, autoSaveInprogress: x })}
                    onRefuseDowloadMap={() => this.setState({ saveAreaInMap: false })}
                    onVisibility={(_visibility) =>
                    {
                        this.props.onVisibilityMapOffline && this.props.onVisibilityMapOffline(_visibility);
                    }}
                /> */}
            </>
        );
    }
}

const styles = StyleSheet.create({
    h10: {
        height: 10,
    },
    isConnect: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 8,
        paddingVertical: 3,
        position: 'absolute',
        width: '100%',
        zIndex: 1,
    },
    map: {
        flex: 1,
        height: '100%',
        width: '100%',
    },
    rightContainerIc: {
        alignItems: 'center',
        'backgroundColor': '#ffffff00',
        position: 'absolute',
        right: 10,
    },
    view: {
        flex: 1,
        position: 'relative',
    },
    viewMore: {
        alignItems: 'center',
        borderRadius: 20,
        borderWidth: 0,
        justifyContent: 'center',
    },
    zoomBtn: {
        alignItems: 'center',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderTopColor: Colors.OnSurface,
        borderTopWidth: 0.1,
        display: 'flex',
        height: 60,
        justifyContent: 'center',
        textAlign: 'center',
        width: 60,
    },
    zoomBtn1: {
        alignItems: 'center',
        borderBottomColor: Colors.OnSurface,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderTopWidth: 0.1,
        display: 'flex',
        height: 60,
        justifyContent: 'center',
        textAlign: 'center',
        width: 60,
    },
    zoomControl: {
        'backgroundColor': 'transparent',
        // bottom: Dimensions.get('window').height / 2 + 20,
        elevation: 5,
        'shadowColor': '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.3,
        // top: 260,
    },
});

function withContext(Component)
{
    return function WrappedComponent(props)
    {
        const { setMapRef, setCamera: setCam, setSelectedPointCoordinates, mode, setTypeButton, setMode } = useContext(MapContext);
        const { onPlaceNewPoint, isMeasuring } = useContext(MeasureContext);
        const { isPresent, handleClickSearchBtn, showSearchInput, setShowSearchInput } = useContext(SearchLocationContext);
        const {
            isShowDirection,
            routePoints,
            setIsShowDirection,
            setRequestText,
            setSearchView,
            whichJustUpdate,
            setRouteSelectedPoints,
            setRoutePoints } = useContext(DirectionContext);
        return (
            <Component
                {...props}
                setMapRef={setMapRef}
                setCamera={setCam}
                isMeasuring={isMeasuring}
                isPresent={isPresent}
                handleClickSearchBtn={handleClickSearchBtn}
                showSearchInput={showSearchInput}
                setSelectedPointCoordinates={setSelectedPointCoordinates}
                mode={mode}
                setTypeButton={setTypeButton}
                isShowDirection={isShowDirection}
                routePoints={routePoints}
                setRoutePoints={setRoutePoints}
                setShowSearchInput={setShowSearchInput}
                setIsShowDirection={setIsShowDirection}
                setRequestText={setRequestText}
                setSearchView={setSearchView}
                setMode={setMode}
                setRouteSelectedPoints={setRouteSelectedPoints}
                whichJustUpdate={whichJustUpdate}
                onPlaceNewPoint={onPlaceNewPoint}
            />
        );
    };
}

export default withContext(BaseMap);
