import { Dimensions, StyleSheet } from 'react-native';

export const HEIGHT = 60;
export const WIDTH = Dimensions.get('window').width;
export const BORDER_RADIUS = 6;

export const styles = StyleSheet.create({
    base: {
        backgroundColor: '#FFF',
        borderRadius: BORDER_RADIUS,
        elevation: 2,
        flexDirection: 'row',
        height: HEIGHT,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: BORDER_RADIUS,
        width: WIDTH,
    },
    contentContainer: {
        alignItems: 'flex-start',
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 25, // In case of RTL, the text will start from the right
    },
    leadingBorder: {
        borderLeftColor: '#D8D8D8',
        borderLeftWidth: 5,
    },
    message: {
        color: '#979797',
        fontSize: 10,
        width: '100%', // Fixes: https://github.com/calintamas/react-native-toast-message/issues/130
    },
    title: {
        color: '#000',
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 2,
        width: '100%', // Fixes: https://github.com/calintamas/react-native-toast-message/issues/130
    },
});
