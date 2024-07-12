import React from 'react';
import { storiesOf } from '@storybook/react-native';

import Map from './';
import { View } from 'react-native';
import { DirectionProvider } from './Contexts/directionContext';
import DirectionController from './Controls/DirectionControl';
import { DirectionCore } from './MapComponent/DirectionCore';
import { MapProvider } from './Contexts/mapContext';
import { MeasureProvider } from './Contexts/MeasureContext';
import MeasureControl from './Controls/MeasureControl';
import MeasureCore from './MapComponent/MeasureCore';

const App = () =>
{
    // const direction = new DirectionService();

    return (
        <MapProvider>
            {/* <SearchLocationProvider> */}
            <DirectionProvider>
                <MeasureProvider>
                    <View style={{ 'backgroundColor': 'white',width: '100%',height: '100%',position: 'relative' }}>
                        <Map
                            defaultLocation={[106.66, 10.76]}
                            zoomLevel={15}
                            mapType="Light"

                        >
                            <DirectionCore />
                            {/* <SearchLocationCore /> */}
                            <MeasureCore />
                        </Map>
                        {/* <SearchLocation
                            locationSearchFunction={(_value, _take, _skip, _lat, _long, _lx, _ly, _rx, _ry)=>
                            {
                                return direction.searchAll(_value, _lx, _ly, _rx, _ry)
                                    .then(res=>
                                    {
                                        return res;
                                    })
                                    .catch(error=>console.error(error));
                            }}
                        /> */}
                        <DirectionController />
                        <MeasureControl />
                    </View>
                    {/* </SearchLocationProvider> */}
                </MeasureProvider>
            </DirectionProvider>
        </MapProvider>
        
    );
};

storiesOf('Utils', module).add('Map',()=>(
    <App />
));
