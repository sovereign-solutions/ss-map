// import PropTypes from 'prop-types';
// import React, { useState } from 'react';
// import { StyleSheet, TouchableOpacity, View } from 'react-native';
// import Text from '../Text/Text';
// import Colors from '../theme/colors';
// import SvgIcon from '../SvgIcon/SvgIcon';
// import { Sleep } from '../debounceClick';

// export type Props = {
//     title: string;
//     onPress?: () => void;
//     type?: string;
//     color?: 'Primary'|'Danger'|'Success'|'Background'|'Surface'|'OnSurface'|'OnPrimary'|'PrimaryVariants'|'OnSurfaceVariants'|'SurfaceVariants'|'PrimaryLight'|'PrimaryVariantsLight'|'PrimaryVariantSecond'|'PrimaryVariantsThird'| String;
//     svgIcon?: string;
//     bdColor?: string;
//     textColor?: string;
//     fontFamily?: string;
//     debounceClick?: number;
//     svgColor?: string;
// };

// // const defaultwidth = 'auto';
// // const defaultbdRadius = 0;

// const MultiTypeButton: React.FC<Props> = ({
//     title,
//     onPress,
//     type,
//     svgIcon,
//     color,
//     bdColor,
//     textColor,
//     fontFamily,
//     debounceClick,
//     svgColor,
// }) =>
// {
//     const [executing, setExecuting] = useState(false);

//     const handlePress = async () =>
//     {
//         setExecuting(true); // disable button
//         try
//         {
//             onPress !== undefined && await onPress(); // thực hiện props onPress
//         }
//         finally
//         {
//             debounceClick && await Sleep(debounceClick); // bao nhiêu thời gian sẽ click lại được button
//             setExecuting(false);
//         }
//     };

//     const BtnType = ():JSX.Element =>
//     {
//         return type === 'Circle'
//             ? (
//                     <TouchableOpacity
//                         style={styles.BtnCircle}
//                         disabled={executing}
//                         onPress={handlePress}
//                     >
//                         <View style={
//                             [
//                                 styles.IconCircle,
//                                 color === 'Primary' ? { backgroundColor: Primary } : color === 'Danger' ? { backgroundColor: Danger } : color === 'Success' ? { backgroundColor: Success } : { backgroundColor: Colors[`${color}`] ?? color ?? Primary },
//                                 { borderColor: bdColor },
//                             ]
//                         }
//                         >
//                             {svgIcon !== undefined && (
//                                 <SvgIcon
//                                     name= {svgIcon}
//                                     color={svgColor && svgColor}
//                                 />
//                             )}
//                         </View>
//                         <Text
//                             title={title}
//                             colorScheme={textColor === 'Primary' ? Primary : textColor === 'Danger' ? Danger : textColor === 'Success' ? Success : Colors[`${textColor}`] ?? textColor ?? Primary}
//                             textAlign="center"
//                             fontFamily={fontFamily}
//                         />
//                     </TouchableOpacity>
//                 )
//             : (
//                     <TouchableOpacity
//                         style={
//                             [
//                                 styles.BtnSquare,
//                                 color === 'Primary' ? { backgroundColor: Primary } : color === 'Danger' ? { backgroundColor: Danger } : color === 'Success' ? { backgroundColor: Success } : { backgroundColor: Colors[`${color}`] ?? color ?? Primary },

//                             ]
//                         }
//                         disabled={executing}
//                         onPress={handlePress}
//                     >
//                         <Text
//                             title={title}
//                             colorScheme={'PrimaryVariants'}
//                             textAlign="center"
//                         />
//                     </TouchableOpacity>
//                 );
//     };
//     return (
//         <BtnType />
//     );
// };
// const Primary = '#5C8AEA';
// const Danger = '#d9534f';
// const Success = '#5cb85c';

// const styles = StyleSheet.create({
//     BtnCircle: {
//         alignItems: 'center',
//         justifyContent: 'center',
//         width: 'auto',
//     },
//     BtnSquare: {
//         alignItems: 'center',
//         alignSelf: 'center',
//         borderRadius: 16,
//         borderWidth: 0,
//         paddingHorizontal: 18,
//         paddingVertical: 8,
//         width: 'auto',
//     },
//     IconCircle: {
//         alignItems: 'center',
//         borderRadius: 22,
//         borderWidth: 1,
//         height: 43,
//         justifyContent: 'center',
//         textAlign: 'center',
//         width: 43,
//     },
// });

// MultiTypeButton.propTypes = {
//     title: PropTypes.string.isRequired,
//     onPress: PropTypes.func,
//     type: PropTypes.string,
//     color: PropTypes.oneOfType([PropTypes.oneOf(['Primary','Danger','Success','Background','Surface','OnSurface','OnPrimary','PrimaryVariants','OnSurfaceVariants','SurfaceVariants','PrimaryLight','PrimaryVariantsLight','PrimaryVariantSecond','PrimaryVariantsThird']),PropTypes.string]),
//     svgIcon: PropTypes.string,
//     bdColor: PropTypes.string,
//     textColor: PropTypes.string,
//     fontFamily: PropTypes.string,
//     debounceClick: PropTypes.number,
//     svgColor: PropTypes.string,
// };

// export default MultiTypeButton;
