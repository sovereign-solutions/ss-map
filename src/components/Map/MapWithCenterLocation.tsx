// basic
import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import Map from './index';

export type MapWithCenterLocationProps = {
    location: number[];
    zoomLevel?: number;
    width?: string | number;
    height?: string | number;
};

const defaultwidth = 'auto';

const MapWithCenterLocation: React.FC<MapWithCenterLocationProps> = ({
    location,
    zoomLevel,
    width,
    height,
}) =>
{
    zoomLevel = zoomLevel || 12;
    return (
        <View style={{ width: width || defaultwidth, height: height || 200 }}>
            <Map
                defaultLocation={location}
                zoomLevel={zoomLevel}
            >
                <MapboxGL.PointAnnotation
                    id={'center-location'}
                    coordinate={location}
                    draggable={false}
                />
            </Map>
        </View>
    );
};

MapWithCenterLocation.propTypes = {
    location: PropTypes.array.isRequired,
    zoomLevel: PropTypes.number,
    width: PropTypes.number || PropTypes.string,
    height: PropTypes.number || PropTypes.string,
};

export default MapWithCenterLocation;
