import React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import FAIcon from '../../FAIcon/FAIcon';
import Colors from '../../theme/colors';
interface Props {
    onOk: () => void,
    onCancel: () => void,
    position?: 'top' | 'bottom' | number,
}

class MapActionButtons extends React.Component<Props>
{
    render(): JSX.Element
    {
        return (
            <React.Fragment>
                <View style={styles.mapAction}>
                    <TouchableOpacity
                        style={{
                            ...styles.left,
                            backgroundColor: Colors.Background,
                        }}
                        onPress={this.props.onCancel}
                    >
                        <FAIcon
                            icon="times"
                            backgroundColor="transparent"
                            color={Colors.OnSurface}
                        />
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                        style={{
                            ...styles.right,
                            backgroundColor: Colors.Background,
                        }}
                        onPress={this.props.onOk}
                    >
                        <FAIcon
                            icon="check"
                            backgroundColor="transparent"
                            color={Colors.OnSurface}
                        />
                    </TouchableOpacity>
                </View>
            </React.Fragment>
        );
    }
}


const styles = StyleSheet.create({
    left: {
        borderBottomLeftRadius: 6.5,
        borderTopLeftRadius: 6.5,
        paddingHorizontal: 10,
        paddingVertical: 3,
    },
    mapAction: {
        alignItems: 'center',
        bottom: Dimensions.get('window').height / 100 * 15,
        display: 'flex',
        flexDirection: 'row' ,
        justifyContent: 'center',
        left: Dimensions.get('window').width / 100 * 33.33333333,
        position: 'absolute',
        right: Dimensions.get('window').width / 100 * 33.33333333,
    },
    right: {
        borderBottomRightRadius: 6.5,
        borderTopRightRadius: 6.5,
        paddingHorizontal: 10,
        paddingVertical: 3,
    },
});
export default MapActionButtons;
