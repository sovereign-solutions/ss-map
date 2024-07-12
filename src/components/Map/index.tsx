import { Geometry, Feature, GeoJsonProperties } from 'geojson';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import React from 'react';

import BaseMap from './Map';

import { DirectionContext, DirectionProvider } from './Contexts/directionContext';
import { MapContext, MapProvider } from './Contexts/mapContext';
import { SearchLocationProvider, SearchLocationContext } from './Contexts/searchLocationContext';
import { MeasureContext, MeasureProvider } from './Contexts/MeasureContext';

// core
import Marker from './MapComponent/Marker';
import { VDBMapRasterLayer } from './MapComponent/VDBMapRasterLayer';
import VBDPointAnotation from './MapComponent/VBDPointAnotation';
import DirectionCore from './MapComponent/DirectionCore';
import MeasureCore from './MapComponent/MeasureCore';
import SearchLocationCore from './MapComponent/SearchLocationCore';

// control
import DirectionControl from './Controls/DirectionControl';
import MeasureControl from './Controls/MeasureControl';
import SearchLocationControl from './Controls/SearchLocation/SearchLocation';
import { AllProvider } from './AllProvider';

export type MapProps = {
    defaultLocation?: number[];
    zoomLevel: number;
    children?: any;
    selectMarker?: (_p) => void;
    mapType?: 'light' | 'dark' | 'default' | 'terrain' | 'satellite' | 'boundary' | 'hereDark' | 'hereLight';
    isConnected?: boolean;
    showBuildInPoint?: boolean;
    cameraRef?: (_ref: any) => void;
    mapRef?: (_ref: any) => void;
    onPress?: (_feature: Feature<Geometry, GeoJsonProperties>) => void;
    onDidFinishLoadingMap?: () => void;
    onUserLocationChange?: (_location) => void;
    bounds?: any;
    hideUserLocation?: boolean;
    searchOptionForm?:boolean;
    locationSearchFunction?: (_value: string, _take: number, _skip: number, _lat: number, _long: number, lx: number, ly: number, rx: number, ry: number) => Promise<any>;
    bearings?: number;
    pitch?: number;
    enableTracking?: boolean;
    floatingMyLocation?: boolean;
    autoLocalStoreMap?: boolean;
    onRegionDidChange?: () => void;
    viewMore?: boolean;
    showButtonSearch?: boolean;
    showInputSearch?: boolean;
    showRuler?: boolean;
    showZoom?: boolean;
    isShowButtonDirection?: boolean;
    isShowButtonMapLayer?: boolean;
    compassViewPosition?: 0 | 1 | 2 | 3,
    compassViewMargins?: { x: any, y: any },
    t?: any;
    type?: number;
    mapStyleList?: any,
    showLayerMap?: () => void;
    onSelectedMapType?: (_mapType: string) => void;
    onVisibilityMapOffline?: (_visibility: boolean) => void
    onTouchStart?: () => void;
    overrideParams?: Record<string, string | number>
    hiddenStyleMap?: boolean
    selectedLayer?: {
        label: string,
        id: string,
        layer: string,
        type: string;
        layerStyle: string,
        config: any,
        [key: string]: string,
    },
    mapKey: string,
}

const Map: React.FC<MapProps> = ({
    defaultLocation,
    zoomLevel,
    children,
    mapType,
    isConnected,
    showBuildInPoint,
    cameraRef,
    mapRef,
    onPress,
    onDidFinishLoadingMap,
    onUserLocationChange,
    bounds,
    bearings,
    hideUserLocation = true,
    searchOptionForm = false,
    locationSearchFunction,
    pitch,
    enableTracking,
    floatingMyLocation,
    autoLocalStoreMap,
    onRegionDidChange,
    viewMore,
    showButtonSearch,
    showInputSearch,
    showRuler,
    showZoom,
    isShowButtonDirection,
    isShowButtonMapLayer,
    compassViewMargins,
    compassViewPosition,
    type = 2,
    mapStyleList,
    showLayerMap,
    onSelectedMapType,
    onVisibilityMapOffline,
    onTouchStart,
    overrideParams,
    hiddenStyleMap,
    selectedLayer,
    mapKey,
}) =>
{
    const { t } = useTranslation();
    return (
        <BaseMap
            defaultLocation={defaultLocation}
            zoomLevel={zoomLevel}
            mapType={mapType ?? 'light'}
            isConnected={isConnected}
            showBuildInPoint={showBuildInPoint}
            cameraRef={cameraRef}
            mapRef={mapRef}
            bounds={bounds}
            hideUserLocation={hideUserLocation}
            searchOptionForm={searchOptionForm}
            t={t}
            // {...locationSearchFunction !== undefined}
            locationSearchFunction={locationSearchFunction}
            bearings={bearings}
            pitch={pitch}
            enableTracking={enableTracking}
            floatingMyLocation={floatingMyLocation}
            autoLocalStoreMap={autoLocalStoreMap}
            viewMore={viewMore}
            showButtonSearch={showButtonSearch}
            showInputSearch={showInputSearch}
            showRuler={showRuler}
            showZoom={showZoom}
            isShowButtonDirection={isShowButtonDirection}
            isShowButtonMapLayer={isShowButtonMapLayer}
            compassViewMargins={compassViewMargins}
            compassViewPosition={compassViewPosition}
            type={type}
            mapStyleList={mapStyleList}
            showLayerMap={showLayerMap}
            selectedLayer={selectedLayer}
            overrideParams={overrideParams}
            hiddenStyleMap={hiddenStyleMap ?? true}
            onPress={onPress}
            onDidFinishLoadingMap={onDidFinishLoadingMap}
            onVisibilityMapOffline={onVisibilityMapOffline}
            onUserLocationChange={onUserLocationChange}
            onRegionDidChange={onRegionDidChange}
            onSelectedMapType={onSelectedMapType}
            onTouchStart={onTouchStart}
            mapKey= {mapKey}
        >
            {children}
        </BaseMap>
    );
};


Map.propTypes = {
    defaultLocation: PropTypes.array,
    zoomLevel: PropTypes.number.isRequired,
    children: PropTypes.any,
    mapType: PropTypes.oneOf(['light', 'dark', 'default', 'terrain', 'satellite', 'boundary', 'hereDark', 'hereLight']),
    isConnected: PropTypes.bool,
    showBuildInPoint: PropTypes.bool,
    cameraRef: PropTypes.func,
    mapRef: PropTypes.func,
    onPress: PropTypes.func,
    onDidFinishLoadingMap: PropTypes.func,
    bounds: PropTypes.exact({
        zoomLevel: PropTypes.number,
        sw: PropTypes.arrayOf(PropTypes.number),
        ne: PropTypes.arrayOf(PropTypes.number),
        paddingTop: PropTypes.number,
        paddingBottom: PropTypes.number,
        paddingLeft: PropTypes.number,
        paddingRight: PropTypes.number,
    }),
    hideUserLocation: PropTypes.bool,
    searchOptionForm: PropTypes.bool,
    locationSearchFunction: PropTypes.any,
    pitch: PropTypes.number,
    bearings: PropTypes.number,
    enableTracking: PropTypes.bool,
    floatingMyLocation: PropTypes.bool,
    compassViewPosition: PropTypes.oneOf([0, 1, 2, 3]),
    compassViewMargins: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
    }) as any,
    type: PropTypes.oneOf([1, 2]),
    mapStyleList: PropTypes.any,
    onVisibilityMapOffline: PropTypes.func,
};

/**
 * <b>Demo usage</b>
 *    <br />
 * `<MapProvider> // Required
 *           <SearchLocationProvider> // Option
 *               <DirectionProvider> // Option
 *                   <MeasureProvider> // Option
 *                       <View style={{ width: '100%',height: '100%',position: 'relative' }}>
 *                           <Map
 *                               defaultLocation={[106.66, 10.76]}
 *                               zoomLevel={15}
 *                               mapType="light"
 *                           >
 *                               <DirectionCore /> // Option
 *                               <SearchLocationCore /> // Option
 *                               <MeasureCore /> // Option
 *                           </Map>
 *                           <SearchLocation
 *                               locationSearchFunction={(_value, _take, _skip, _lat, _long, _lx, _ly, _rx, _ry)=>
 *                               {
 *                                   return { docs: [] }
 *                           /> // Option
 *                           <DirectionController /> // Option
 *                           <MeasureControl /> // Option
 *                       </View>
 *                   </MeasureProvider>
 *               </DirectionProvider>
 *           </SearchLocationProvider>
 *       </MapProvider>`
 */

export default Object.assign(Map, {
    Marker: Marker,
    VDBMapRasterLayer: VDBMapRasterLayer,
    VBDPointAnotation: VBDPointAnotation,
    // provider
    MapProvider: MapProvider,
    DirectionProvider: DirectionProvider,
    SearchLocationProvider: SearchLocationProvider,
    MeasureProvider: MeasureProvider,
    // context
    MapContext: MapContext,
    DirectionContext: DirectionContext,
    SearchLocationContext: SearchLocationContext,
    MeasureContext: MeasureContext,
    // control
    DirectionControl: DirectionControl,
    SearchLocationControl: SearchLocationControl,
    MeasureControl: MeasureControl,
    // core
    DirectionCore: DirectionCore,
    MeasureCore: MeasureCore,
    SearchLocationCore: SearchLocationCore,

    /** pack all  provider */
    AllProvider: AllProvider,
});
