// react native
import React from 'react';
import { StyleSheet, Pressable, Dimensions } from 'react-native';


// packages
import MapboxGL from '@react-native-mapbox-gl/maps';

// base/mui component,const,enum
import Colors from '../../theme/colors';
import SvgIcon from '../../SvgIcon/SvgIcon';
import Text from '../../Text/Text';


export interface Props {
    markerData: any[];
    selectMarker: (_p) => void;
}

const MarkerRender: React.FC<Props> = ({ markerData, selectMarker }) =>
{

    const viewMarker = (marker: any) =>
    {
        selectMarker(marker);
    };

    return (
        <React.Fragment>
            {markerData?.map(marker => (
                <MapboxGL.MarkerView
                    key={marker.id}
                    id="test-marker"
                    coordinate={[marker.lng, marker.lat]}
                >
                    <Pressable
                        style={styles.zoomControl}
                        onPress={() => viewMarker(marker)}
                    >
                        <SvgIcon name="Search" />
                        <Text title={marker.title} />
                    </Pressable>

                </MapboxGL.MarkerView>
            ))}
        </React.Fragment>
    );
};


const blackBoder = 'rgba(0, 0, 0,0.2)';
const styles = StyleSheet.create({
    MylocationBtnView: {
        alignItems: 'center',
        'backgroundColor': 'white',
        borderRadius: 20,
        borderWidth: 0,
        bottom: 20,
        height: 40,
        justifyContent: 'center',
        position: 'absolute',
        right: 20,
        width: 40,
    },
    ScrollHoriontal: {
        height: '100%',
        left: 45,
        position: 'absolute',
        top: 0,
        width: '100%',
    },
    SwicthItem: {
        borderColor: blackBoder,
        borderRadius: 6,
        borderWidth: 1,
        height: 40,
        overflow: 'hidden',
        width: 40,
        zIndex: 99999999,
    },
    hide: {
        display: 'none',
    },
    isConnect: {
        flexDirection: 'row',
        left: 10,
        paddingHorizontal: 8,
        paddingVertical: 3,
        position: 'absolute',
        top: 10,
        zIndex: 10000,
    },
    map: {
        flex: 1,
        height: '100%',
        width: '100%',
    },
    mapSwitcher: {
        borderRadius: 5,
        borderWidth: 0,
        bottom: 20,
        height: 40,
        justifyContent: 'center',
        left: 20,
        position: 'absolute',
        width: 40,
    },
    ml_5: {
        marginLeft: 5,
    },
    openSwitcher: {
        width: '70%',
    },
    searchBtn: {
        alignItems: 'center',
        'backgroundColor': 'white',
        borderRadius: 20,
        bottom: 70,
        height: 40,
        justifyContent: 'center',
        position: 'absolute',
        right: 20,
        width: 40,
        zIndex: 999,
    },
    show: {
        display: 'flex',
    },
    view: {
        flex: 1,
    },
    zoomBtn: {
        alignItems: 'center',
        backgroundColor: Colors.Background,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderTopColor: Colors.OnSurface,
        borderTopWidth: 0.1,
        display: 'flex',
        height: 55,
        justifyContent: 'center',

        textAlign: 'center',
        width: 40,
    },
    zoomBtn1: {
        alignItems: 'center',
        backgroundColor: Colors.Background,
        borderBottomColor: Colors.OnSurface,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderTopWidth: 0.1,
        display: 'flex',
        height: 55,
        justifyContent: 'center',
        textAlign: 'center',
        width: 40,
    },
    zoomControl: {
        'backgroundColor': 'transparent',
        bottom: Dimensions.get('window').height / 2 + 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'absolute',
        right: 20,
        zIndex: 10000 ,
    },
});

export default MarkerRender;
