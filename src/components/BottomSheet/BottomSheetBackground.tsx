// import React, { memo } from 'react';
// import { StyleSheet, View } from 'react-native';
// import Colors from '../theme/colors';

// interface Props {
//     contentBackgroundColor?: string,
//     noBackground?: boolean,
//     isRadius?: boolean,
//     toIndexSt: number | undefined
// }

// const BottomSheetBackgroundComponent: React.FC<Props> = (props) =>
// {
//     const { contentBackgroundColor, noBackground, isRadius, toIndexSt } = props;

//     const renderBackgroundComponent = () =>
//     {
//         const contentContainer = {
//             ...styles.contentContainer,
//             backgroundColor: contentBackgroundColor ? contentBackgroundColor : Colors.Background,
//         };
//         const contentContainerFull = {
//             ...styles.contentContainerFull,
//             backgroundColor: contentBackgroundColor ? contentBackgroundColor : Colors.Background,
//         };
//         if (noBackground)
//         {
//             return <View style={isRadius ? contentContainer : contentContainerFull} />;
//         }
//         if (toIndexSt === 3)
//         {
//             return <View style={contentContainerFull} />;
//         }
//         else
//         {
//             return <View style={contentContainer} />;
//         }
//     };

//     return renderBackgroundComponent();
// };

// const BottomSheetBackground = memo(BottomSheetBackgroundComponent);
// BottomSheetBackground.displayName = 'BottomSheetBackground';

// export default BottomSheetBackground;

// const styles = StyleSheet.create({
//     contentContainer: {
//         ...StyleSheet.absoluteFillObject,
//         borderTopLeftRadius: 15,
//         borderTopRightRadius: 15,
//     },

//     contentContainerFull: {
//         ...StyleSheet.absoluteFillObject,
//     },
// });
