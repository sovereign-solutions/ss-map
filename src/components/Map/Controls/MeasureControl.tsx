import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import Colors from '../../theme/colors';
import { MeasureContext } from '../Contexts/MeasureContext';
import { MapControlButton } from '../MapControlButton';


const MeasureControl: React.FunctionComponent<{}> = () =>
{

    const {
        isMeasuring,
        setIsMeasuring,
    } = React.useContext(MeasureContext);

    return (
        <View style={styles.ruler}>
            <MapControlButton
                icon='ruler'
                isActive={isMeasuring}
                background={Colors.Surface}
                isRound
                onPress={()=>setIsMeasuring(!isMeasuring)}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    ruler: {
        position: 'absolute',
        right: 15,
        top: 160,
    },
});

export default MeasureControl;
