import MapboxGL from '@react-native-mapbox-gl/maps';
import * as React from 'react';
import { CommonHelper } from '../../../helper/common.helper';
import { MeasureContext } from '../Contexts/MeasureContext';
import RenderPopup from '../MapDirectionComponents/popupShowTime';
import { lineString as makeLineString, point } from '@turf/helpers';

const MeasureCore: React.FunctionComponent<{}> = () =>
{

    const {
        routeMap,
        isMeasuring,
    } = React.useContext(MeasureContext);

    return (
        <>
            {isMeasuring && routeMap.length >= 3 && (
                <MapboxGL.ShapeSource
                    id="polygonSource"
                    maxZoomLevel={12}
                    shape={{
                        type: 'Feature',
                        properties: {},
                        geometry: {
                            type: 'Polygon',
                            coordinates: [routeMap],


                        },
                    }}
                >
                    <MapboxGL.FillLayer
                        belowLayerID="line-acreage"
                        id="polygion"
                        style={{
                            fillOpacity: 0.5,
                            'fillColor': '#bbff33',
                            'fillOutlineColor': 'red',
                        }}
                    />
                </MapboxGL.ShapeSource>
            )}

            {isMeasuring && routeMap.length > 1 && (
                routeMap.map((p, i) =>
                {
                    return ((i + 1) !== routeMap.length) && (
                        <RenderPopup
                            key={i}
                            data={{
                                distance: CommonHelper.getFormatDistance(CommonHelper.getDistanceByCoords(p, routeMap[i + 1])),
                            }}
                            coordinate={CommonHelper.getPointBettwenTwoCoordinates(p, routeMap[i + 1])}
                        />
                    );
                },
                )
            )}

            {isMeasuring && routeMap.length > 1 && (
                <MapboxGL.ShapeSource
                    id="lineSource"
                    maxZoomLevel={12}
                    shape={makeLineString(routeMap as any).geometry}
                >

                    <MapboxGL.LineLayer
                        belowLayerID="point-acreage-0"
                        id="line-acreage"
                    />
                </MapboxGL.ShapeSource>
            )}

            {isMeasuring && routeMap.length > 0 && (
                routeMap.map((p, index) => (
                    <MapboxGL.ShapeSource
                        key={index}
                        id={`point-${index}`}
                        maxZoomLevel={12}
                        shape={point(p).geometry}
                    >
                        <MapboxGL.SymbolLayer
                            layerIndex={9000}
                            style={{ iconImage: require('../../../images/poi-blue.png'), iconTranslateAnchor: 'map', iconOffset: [0, -12] }}
                            id={`point-acreage-${index}`}
                        />
                    </MapboxGL.ShapeSource>
                ))
            )}
        </>
    );
};

export default MeasureCore;
