// import { useBottomSheet } from '@gorhom/bottom-sheet';
// import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
// import React, { memo, useCallback, useMemo } from 'react';
// import { TouchableWithoutFeedback } from 'react-native';
// import Animated, {
//     Extrapolate,
//     interpolate,
//     useAnimatedStyle,
// } from 'react-native-reanimated';
// import {
//     DEFAULT_APPEARS_ON_INDEX,
//     DEFAULT_DISAPPEARS_ON_INDEX,
//     DEFAULT_OPACITY,
//     DEFAULT_PRESS_BEHAVIOR,
// } from './constants';

// const AnimatedTouchableWithoutFeedback = Animated.createAnimatedComponent(
//     TouchableWithoutFeedback,
// );

// const BottomSheetBackdropComponent = ({
//     animatedIndex,
//     opacity: _providedOpacity,
//     appearsOnIndex: _providedAppearsOnIndex,
//     disappearsOnIndex: _providedDisappearsOnIndex,
//     enableTouchThrough: _providedEnableTouchThrough,
//     pressBehavior = DEFAULT_PRESS_BEHAVIOR,
//     onPress,
//     style,
//     children,
// }: BottomSheetDefaultBackdropProps) =>
// {
//     // #region hooks
//     const { snapToIndex, close } = useBottomSheet();
//     // #endregion

//     // #region defaults
//     const opacity = _providedOpacity ?? DEFAULT_OPACITY;
//     const appearsOnIndex = _providedAppearsOnIndex ?? DEFAULT_APPEARS_ON_INDEX;
//     const disappearsOnIndex =
//     _providedDisappearsOnIndex ?? DEFAULT_DISAPPEARS_ON_INDEX;
//     // #endregion

//     // #region callbacks
//     const handleOnPress = useCallback(() =>
//     {
//         onPress?.();

//         if (pressBehavior === 'close')
//         {
//             close();
//         }
//         else if (pressBehavior === 'collapse')
//         {
//             snapToIndex(disappearsOnIndex as number);
//         }
//         else if (typeof pressBehavior === 'number')
//         {
//             snapToIndex(pressBehavior);
//         }
//     }, [snapToIndex, close, disappearsOnIndex, pressBehavior, onPress]);
//     // #endregion

//     // #region styles
//     const containerAnimatedStyle = useAnimatedStyle(() => ({
//         opacity: interpolate(
//             animatedIndex.value,
//             [-1, disappearsOnIndex, appearsOnIndex],
//             [0, 0, opacity],
//             Extrapolate.CLAMP,
//         ),
//         flex: 1,
//     }));
//     const containerStyle = useMemo(
//         () => [{ backgroundColor: '#101011' }, style, containerAnimatedStyle],
//         [style, containerAnimatedStyle],
//     );
//     // #endregion

//     return (
//         <AnimatedTouchableWithoutFeedback onPress={handleOnPress}>
//             <Animated.View style={containerStyle}>
//                 {children}
//             </Animated.View>
//         </AnimatedTouchableWithoutFeedback>
//     );
// };

// const BottomSheetBackdrop = memo(BottomSheetBackdropComponent);
// BottomSheetBackdrop.displayName = 'BottomSheetBackdrop';

// export default BottomSheetBackdrop;
