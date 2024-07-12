// import React from 'react';
// import { StyleSheet, TouchableOpacity, View } from 'react-native';
// import PropTypes from 'prop-types';

// import Colors from '../theme/colors';

// export type Props = {
//     value?: number | string | boolean,
//     onPress?: () => void,
//     item?: number | string | boolean,
//     bgColor?: 'Background' | 'Surface' | 'Primary' | 'OnSurface' | 'OnPrimary' | 'PrimaryVariants' | 'OnSurfaceVariants' | 'SurfaceVariants' | 'PrimaryLight' | 'PrimaryVariantsLight' | 'PrimaryVariantSecond' | 'PrimaryVariantsThird' | String;
//     bdColor?: 'Background' | 'Surface' | 'Primary' | 'OnSurface' | 'OnPrimary' | 'PrimaryVariants' | 'OnSurfaceVariants' | 'SurfaceVariants' | 'PrimaryLight' | 'PrimaryVariantsLight' | 'PrimaryVariantSecond' | 'PrimaryVariantsThird' | String;
//     bdSize?:number|string,
// };

// const Radio: React.FC<Props> = ({
//     value,
//     onPress,
//     item,
//     bgColor,
//     bdColor,
//     bdSize,
// }) =>
// {
//     const bdSizeStyle = bdSize ? { width: bdSize,height: bdSize } : {};
//     return (
//         <TouchableOpacity
//             style={{ ...styles.radioCircle, borderColor: Colors[`${bdColor}`] ?? bdColor ?? Colors.OnSurface }}
//             onPress={() => onPress && onPress()}
//         >
//             {value === item && (
//                 <View style={[styles.selectedRb,bdSizeStyle,{ backgroundColor: Colors[`${bgColor}`] ?? bgColor ?? Colors.OnSurface }]} />
//             )}
//         </TouchableOpacity>
//     );
// };

// const styles = StyleSheet.create({
//     radioCircle: {
//         alignItems: 'center',
//         borderRadius: 100,
//         borderWidth: 2,
//         height: 18,
//         justifyContent: 'center',
//         width: 18,
//     },
//     selectedRb: {
//         borderRadius: 50,
//         height: 8,
//         width: 8,
//     },
// });

// Radio.propTypes = {
//     value: PropTypes.string,
//     onPress: PropTypes.func,
//     item: PropTypes.string,
//     bgColor: PropTypes.oneOfType([PropTypes.oneOf(['Background', 'Surface', 'Primary', 'OnSurface', 'OnPrimary', 'PrimaryVariants', 'OnSurfaceVariants', 'SurfaceVariants', 'PrimaryLight', 'PrimaryVariantsLight', 'PrimaryVariantSecond', 'PrimaryVariantsThird']), PropTypes.string]),
//     bdColor: PropTypes.oneOfType([PropTypes.oneOf(['Background', 'Surface', 'Primary', 'OnSurface', 'OnPrimary', 'PrimaryVariants', 'OnSurfaceVariants', 'SurfaceVariants', 'PrimaryLight', 'PrimaryVariantsLight', 'PrimaryVariantSecond', 'PrimaryVariantsThird']), PropTypes.string]),
// };

// export default Radio;
