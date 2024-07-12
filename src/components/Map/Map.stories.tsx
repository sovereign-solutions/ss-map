import React, { useState } from 'react';
import { storiesOf } from '@storybook/react-native';

import Map from '.';
import { RootContainer } from '../..';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { DirectionService } from '../../services/direction.service';


const App = () =>
{
    const direction = new DirectionService();

    const [map,setMap] = useState<MapboxGL.MapView>();
    return (
        <RootContainer>
            <Map
                defaultLocation={[106.66, 10.76]}
                mapRef={setMap}
                zoomLevel={15}
                mapType="satellite"
                locationSearchFunction={async(value: string)=>
                {
                    const bounds = await map.getVisibleBounds();
                    return direction.searchAll(value,bounds[0][0],bounds[0][1],bounds[1][0],bounds[1][1])
                        .then(res=> res)
                        .catch(error=>console.error(error));
                }}
            />
        </RootContainer>
    );
};

storiesOf('Utils', module).add('Map', () => (
    <App />
));
