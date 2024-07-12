// import React, { useMemo } from 'react';
// import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
// import { BottomSheetHandleProps } from '@gorhom/bottom-sheet';
// import Animated from 'react-native-reanimated';

// export const transformOrigin = ({ x, y }, ...transformations) =>
// {
//     'worklet';
//     return [
//         { translateX: x },
//         { translateY: y },
//         ...transformations,
//         { translateX: x * -1 },
//         { translateY: y * -1 },
//     ];
// };

// interface HandleProps extends BottomSheetHandleProps {
//   style?: StyleProp<ViewStyle>;
// }

// const Handle: React.FC<HandleProps> = ({ style }) =>
// {

//     // #region styles
//     const containerStyle = useMemo(() => [styles.header, style], [style]);

//     const leftIndicatorStyle = useMemo(
//         () => ({
//             ...styles.indicator,
//             ...styles.leftIndicator,
//         }),
//         [],
//     );

//     const rightIndicatorStyle = useMemo(
//         () => ({
//             ...styles.indicator,
//             ...styles.rightIndicator,
//         }),
//         [],
//     );
//     // render
//     return (
//         <Animated.View
//             style={containerStyle}
//             renderToHardwareTextureAndroid
//         >
//             <Animated.View style={leftIndicatorStyle} />
//             <Animated.View
//                 style={rightIndicatorStyle}
//             />
//         </Animated.View>
//     );
// };

// export default Handle;

// const styles = StyleSheet.create({
//     header: {
//         alignContent: 'center',
//         alignItems: 'center',
//         'backgroundColor': 'white',
//         'borderBottomColor': 'blue',
//         borderBottomWidth: 1,
//         height: 300,
//         justifyContent: 'center',
//         paddingVertical: 14,width: 100,
//     },
//     indicator: {
//         'backgroundColor': '#999',
//         height: 4,
//         position: 'absolute',
//         width: 10,
//     },
//     leftIndicator: {
//         borderBottomStartRadius: 2,
//         borderTopStartRadius: 2,
//     },
//     rightIndicator: {
//         borderBottomEndRadius: 2,
//         borderTopEndRadius: 2,
//     },
// });
