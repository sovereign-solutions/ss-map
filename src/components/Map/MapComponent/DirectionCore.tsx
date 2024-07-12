/* eslint-disable react-native/no-inline-styles */
import React, { useContext, useMemo } from 'react';
import { DirectionContext } from '../Contexts/directionContext';

import MapboxGL from '@react-native-mapbox-gl/maps';
import { point } from '@turf/helpers';

import Colors from '../../theme/colors';
import { MapContext } from '../Contexts/mapContext';

import { FAIcon } from '../../../';


const DirectionCore:React.FC<{}> = (): JSX.Element =>
{
    const { route, arrow, indice, data, routePoints, routeSelectedPoints } = useContext(DirectionContext);
    const { mode } = useContext(MapContext);

    const renderPointSelected = useMemo(() =>
    {
        if (routeSelectedPoints?.length > 0 && mode === 'directSelectPoint')
        {
            return routeSelectedPoints.filter(item => item.length > 0).map(x => (
                
                <MapboxGL.PointAnnotation
                    key={`trative-marker-${x[0]}`}
                    id={`trative-marker-id-${x[0]}`}
                    coordinate={x}
                    anchor={{ x: 0.5, y: 1 }}
                    draggable
                >
                    <FAIcon
                        icon="map-marker-alt"
                        color="red"
                        size={30}
                        backgroundColor="transparent"
                    />
                </MapboxGL.PointAnnotation>
            ));
        }
    }, [routeSelectedPoints, mode]);

    return (
        <>
            {route !== null && (
                <MapboxGL.ShapeSource
                    id="routeSource"
                    shape={route}
                >
                    <MapboxGL.LineLayer
                        id="routeFill"
                        style={style.line as any}
                    />
                </MapboxGL.ShapeSource>
            )}
            {arrow.length > 0 && indice < data[0].Steps.Indices.length - 1 && (
                <MapboxGL.ShapeSource
                    id={'arrow-source-blue'}
                    shape={{
                        type: 'FeatureCollection',
                        features: [
                            {
                                'type': 'Feature',
                                'properties': {},
                                'geometry': {
                                    'type': 'Point',
                                    'coordinates': arrow?.[indice]?.[1].des,
                                },
                            },
                        ],
                    }}
                >
                    <MapboxGL.SymbolLayer
                        belowLayerID={'routeFill'}
                        id={'arrow-blue'}
                        minZoomLevel={14}
                        style={{
                            iconImage: require('../../../images/direction-arrow.png'),
                            iconSize: 0.33,
                            iconRotate: arrow?.[indice]?.[1].angle,
                            iconRotationAlignment: 'map',
                            iconAllowOverlap: true,
                        }}
                    />
        
                </MapboxGL.ShapeSource>
            )}

            {arrow.length > 0 && indice < data[0].Steps.Indices.length - 1 && (
                <MapboxGL.ShapeSource
                    id={'arrowSource'}
                    shape={arrow?.[indice]?.[0].geometry}
                >
                    <MapboxGL.LineLayer
                        minZoomLevel={14}
                        aboveLayerID="routeFill"
                        id={'arrowPoin'}
                        style={style.line2 as any}
                    />
                </MapboxGL.ShapeSource>
            )}

            {arrow.length > 0 && indice < data[0].Steps.Indices.length - 1 && (
                <MapboxGL.ShapeSource
                    id={'arrow-source'}
                    shape={{
                        type: 'FeatureCollection',
                        features: [
                            {
                                'type': 'Feature',
                                'properties': {},
                                'geometry': {
                                    'type': 'Point',
                                    'coordinates': arrow?.[indice]?.[1].des,
                                },
                            },
                        ],
                    }}
                >
                    <MapboxGL.SymbolLayer
                        id={'arrow'}
                        minZoomLevel={14}
                        style={{
                            iconImage: require('../../../images/direction-arrow-white.png'),
                            iconSize: 0.3,
                            iconRotate: arrow?.[indice]?.[1].angle,
                            iconRotationAlignment: 'map',
                        }}
                    />
        
                </MapboxGL.ShapeSource>
            )}
            {arrow.length > 0 && indice < data[0]?.Steps.Indices.length - 1 && (
                <MapboxGL.ShapeSource
                    id={'segment-source'}
                    shape={{
                        type: 'FeatureCollection',
                        features: [
                            {
                                'type': 'Feature',
                                'properties': {},
                                'geometry': {
                                    'type': 'Point',
                                    'coordinates': data[0]?.Geometry[data[0]?.Steps.Indices[indice]],
                                },
                            },
                        ],
                    }}
                >
                    <MapboxGL.SymbolLayer
                        id={'segment'}
                        aboveLayerID="routeFill"
                        minZoomLevel={9}
                        maxZoomLevel={14}
                        style={{
                            iconImage: require('../../../images/segment_green.png'),
                            iconSize: 0.6,
                        }}
                    />
                </MapboxGL.ShapeSource>
            )}
            {
                data.length > 0 && (route !== null && route !== undefined) && (
                    routePoints.map((e:any, i: number)=>
                    {
                        if (e.length > 1)
                        {
                            const a:any = e.slice().reverse().map(v=>v);
                            return (
                                <MapboxGL.ShapeSource
                                    key={i}
                                    id={`point-${i}`}
                                    maxZoomLevel={12}
                                    shape={point(a).geometry}
                                >
                                    <MapboxGL.SymbolLayer
                                        aboveLayerID="routeFill"
                                        layerIndex={9000}
                                        style={{ iconImage: i === 0 ? require('../../../images/poi-pink.png') : require('../../../images/poi-green.png'), iconTranslateAnchor: 'map', iconOffset: [0,-12] }}
                                        id={`point-rt-${i}`}
                                    />
                                </MapboxGL.ShapeSource>
                            );
                        }
                    },
                    )
                )
            }
            {renderPointSelected}
        </>
    );
};

const style = { line: { 'lineColor': Colors.PrimaryLight, lineWidth: 10, lineCap: 'round', lineOpacity: 1.84 },
    line2: { 'lineColor': Colors.Background, lineWidth: 8, lineCap: 'round', lineOpacity: 100 } };
    
export default DirectionCore;
