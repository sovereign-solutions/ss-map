import * as React from 'react';
import { SearchLocationContext } from '../Contexts/searchLocationContext';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { Image } from 'react-native';

const SearchLocationCore: React.FunctionComponent<{}> = () =>
{

    const {
        centerCoordinate,
        fetureCollect,
        showSearchInput,
        onMarkerClick,
    } = React.useContext(SearchLocationContext);


    return (
        <React.Fragment>
            {showSearchInput && (
                <>
                    {
                        centerCoordinate && centerCoordinate.length > 0 && (

                            <MapboxGL.ShapeSource
                                id={'selectPoint'}
                                shape={{ coordinates: centerCoordinate, 'type': 'Point' }}
                            >
                                <MapboxGL.SymbolLayer
                                    layerIndex={99000}
                                    style={{ iconImage: require('../../../images/poi-pink.png'), iconTranslateAnchor: 'map', iconOffset: [0, -15],iconAllowOverlap: true }}
                                    id={'selectPointSymbol'}
                                />
                            </MapboxGL.ShapeSource>

                        )
                    }
                    {
                        Object.keys(fetureCollect).length > 0 && (
                            <MapboxGL.ShapeSource
                                id="shapeSource"
                                shape={fetureCollect}
                                onPress={(fea)=>
                                {
                                    const e: any = fea.features?.[0];
                                    e && onMarkerClick(e);

                                }}
                            >
                                <MapboxGL.SymbolLayer
                                    id="circle"
                                    layerIndex={80}
                                    style={{
                                        iconImage: require('../../../images/poi-cyan.png'),
                                        iconAllowOverlap: true,
                                        iconOffset: [0, -15],
                                    }}
                                    onTouchStart={(e)=>
                                    {
                                    }}
                                />
                            </MapboxGL.ShapeSource>
                        )}
                </>
            )}

        </React.Fragment>
    );
};

export default SearchLocationCore;
