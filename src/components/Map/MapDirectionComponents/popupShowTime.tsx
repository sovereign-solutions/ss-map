import { StyleSheet, View } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import React from 'react';
import Colors from '../../theme/colors';
import Text from '../../Text/Text';

interface Props{
    data: {
        distance: string,
        duration?: string,
    },
    coordinate: number[],
}

const RenderPopup:React.FC<Props> = (props:Props):JSX.Element =>
{
    return (
        <MapboxGL.MarkerView
            id={Math.floor(Math.random() - Math.random()).toString()}
            coordinate={props.coordinate}
        >
            <View>
                <View style={[styles.popup,{ backgroundColor: Colors.Surface }]}>
                    {/* <View style={[styles.headPopup,{ backgroundColor: Colors.Surface }]}>
                        <SvgIcon name="map-veh-car-active" />
                        <TouchableOpacity onPress={()=>props.oncancelPopup()}>
                           
                            <Text
                                size={'md'}
                                title="x"
                                fontFamily="Nunito-Bold"
                                colorScheme={'OnSurfaceVariants'}
                            />
                        </TouchableOpacity>
                    </View> */}
                    <View style={styles.content}>
                        <Text title={props.data.distance} />
                    </View>
                </View>
                {/* <View style={[styles.triangleDown,{ borderTopColor: Colors.Background }]} /> */}
            </View>
        </MapboxGL.MarkerView>
    );
};

const styles = StyleSheet.create({
    content: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 7,
        paddingTop: 0,
    },
    popup: {
        alignItems: 'center',
        borderRadius: 7,
        height: 'auto',
        width: 75,
        zIndex: 98,
    },

});

export default RenderPopup;
