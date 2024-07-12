// import React, { useEffect } from 'react';
// import { StyleSheet, View, Pressable, Animated, Image } from 'react-native';
// import PropTypes from 'prop-types';
// import Colors from '../theme/colors';
// import onDuty from '../../images/ON-DUTY.png';
// import offDuty from '../../images/OFF-DUTY.png';

// export type Props = {
//     switched?: boolean;
//     onPress: (boolean) => void;
//     onBackgroundColor?: 'Background'|'Surface'|'Primary'|'OnSurface'|'OnPrimary'|'PrimaryVariants'|'OnSurfaceVariants'|'SurfaceVariants'|'PrimaryLight'|'PrimaryVariantsLight'|'PrimaryVariantSecond'|'PrimaryVariantsThird'| String;
//     offBackgroundColor?: 'Background'|'Surface'|'Primary'|'OnSurface'|'OnPrimary'|'PrimaryVariants'|'OnSurfaceVariants'|'SurfaceVariants'|'PrimaryLight'|'PrimaryVariantsLight'|'PrimaryVariantSecond'|'PrimaryVariantsThird'| String;
//     onBackgroundDotColor?: 'Background'|'Surface'|'Primary'|'OnSurface'|'OnPrimary'|'PrimaryVariants'|'OnSurfaceVariants'|'SurfaceVariants'|'PrimaryLight'|'PrimaryVariantsLight'|'PrimaryVariantSecond'|'PrimaryVariantsThird'| String;
//     offBackgroundDotcolor?: 'Background'|'Surface'|'Primary'|'OnSurface'|'OnPrimary'|'PrimaryVariants'|'OnSurfaceVariants'|'SurfaceVariants'|'PrimaryLight'|'PrimaryVariantsLight'|'PrimaryVariantSecond'|'PrimaryVariantsThird'| String;
//     onBorderDotBackgroundColor?: 'Background'|'Surface'|'Primary'|'OnSurface'|'OnPrimary'|'PrimaryVariants'|'OnSurfaceVariants'|'SurfaceVariants'|'PrimaryLight'|'PrimaryVariantsLight'|'PrimaryVariantSecond'|'PrimaryVariantsThird'| String;
//     offBorderDotBackgroundColor?: 'Background'|'Surface'|'Primary'|'OnSurface'|'OnPrimary'|'PrimaryVariants'|'OnSurfaceVariants'|'SurfaceVariants'|'PrimaryLight'|'PrimaryVariantsLight'|'PrimaryVariantSecond'|'PrimaryVariantsThird'| String;
//     onBordercolor?: 'Background'|'Surface'|'Primary'|'OnSurface'|'OnPrimary'|'PrimaryVariants'|'OnSurfaceVariants'|'SurfaceVariants'|'PrimaryLight'|'PrimaryVariantsLight'|'PrimaryVariantSecond'|'PrimaryVariantsThird'| String;
//     offBordercolor?: 'Background'|'Surface'|'Primary'|'OnSurface'|'OnPrimary'|'PrimaryVariants'|'OnSurfaceVariants'|'SurfaceVariants'|'PrimaryLight'|'PrimaryVariantsLight'|'PrimaryVariantSecond'|'PrimaryVariantsThird'| String;
//     layout?: number;
//     disabled?: boolean
// };

// const SwitchBtn: React.FC<Props> = ({
//     switched,
//     onPress,
//     onBackgroundColor,
//     offBackgroundColor,
//     onBackgroundDotColor,
//     offBackgroundDotcolor,
//     onBorderDotBackgroundColor,
//     offBorderDotBackgroundColor,
//     onBordercolor,
//     offBordercolor,
//     layout,
//     disabled,
// }) =>
// {
//     const modalX = new Animated.Value(switched ? 12 : -2.5);
    
//     useEffect(() =>
//     {
//         SwitchOnOff;
//     }, []);


//     const SwitchOnOff = () =>
//     {
//         if (switched === true)
//         {
//             Animated.timing(modalX, {
//                 duration: 1000,
//                 toValue: 12,
//                 useNativeDriver: true,
//             }).start();
//         }
//         else
//         {
//             Animated.timing(modalX, {
//                 duration: 1000,
//                 toValue: -2.5,
//                 useNativeDriver: true,
//             }).start();
//         }
        
//     };
//     const Layout1 = ():JSX.Element =>
//     {
//         return (
//             <Pressable
//                 style={styles.container}
//                 disabled={disabled ?? false}
//                 onPress={onPress}
//             >
//                 <View style={switched
//                     ? [styles.boxSwitchTrue, { backgroundColor: Colors[`${onBackgroundColor}`] ?? onBackgroundColor ?? '#168FE7', borderColor: Colors[`${onBordercolor}`] ?? onBordercolor ?? '#168FE7' }]
//                     : [styles.boxSwitchFalse, { borderColor: Colors[`${offBordercolor}`] ?? offBordercolor ?? '#168FE7', backgroundColor: Colors[`${offBackgroundColor}`] ?? offBackgroundColor ?? 'white' }]}
//                 >
//                     <Animated.View style={[switched
//                         ? [styles.dotRight, {
//                                 backgroundColor: Colors[`${onBackgroundDotColor}`] ?? onBackgroundDotColor ?? 'white',
//                                 borderColor: Colors[`${onBorderDotBackgroundColor}`] ?? onBorderDotBackgroundColor ?? 'white',
//                             }]
//                         : [styles.dotLeft, {
//                                 borderColor: Colors[`${offBorderDotBackgroundColor}`] ?? offBorderDotBackgroundColor ?? '#168FE7',
//                                 backgroundColor: Colors[`${offBackgroundDotcolor}`] ?? offBackgroundDotcolor ?? 'white',
//                             }], {
//                         transform: [{ translateX: modalX }],
//                     }]}
//                     />
//                 </View>
//             </Pressable>
//         );
//     };

//     const Layout2 = ():JSX.Element =>
//     {
//         return (
//             <Pressable
//                 style={styles.container2}
//                 disabled={disabled ?? false}
//                 onPress={onPress}
//             >
//                 <View style={switched
//                     ? [styles.boxSwitchTrue2, { backgroundColor: Colors[`${onBackgroundColor}`] ?? onBackgroundColor ?? '#7BC7FF', borderColor: Colors[`${onBordercolor}`] ?? onBordercolor ?? '#168FE7' }]
//                     : [styles.boxSwitchFalse2, { borderColor: Colors[`${offBordercolor}`] ?? offBordercolor ?? '#168FE7', backgroundColor: Colors[`${offBackgroundColor}`] ?? offBackgroundColor ?? '#CACACA' }]}
//                 >
//                     <Animated.View style={[switched
//                         ? [styles.dotRight2, {
//                                 backgroundColor: Colors[`${onBackgroundDotColor}`] ?? onBackgroundDotColor ?? '#0066B2',
//                                 borderColor: Colors[`${onBorderDotBackgroundColor}`] ?? onBorderDotBackgroundColor ?? 'white',
//                             }]
//                         : [styles.dotLeft2, {
//                                 borderColor: Colors[`${offBorderDotBackgroundColor}`] ?? offBorderDotBackgroundColor ?? '#168FE7',
//                                 backgroundColor: Colors[`${offBackgroundDotcolor}`] ?? offBackgroundDotcolor ?? '#787E81',
//                             }], {
//                         transform: [{ translateX: modalX }],
//                     }]}
//                     />
//                     <View style={switched ? styles.on : styles.off}>
//                         {switched
//                             ? (
//                                     <Image
//                                         source={onDuty}
//                                         style={styles.onDuty}
//                                     />
//                                 )
//                             : (
//                                     <Image
//                                         source={offDuty}
//                                         style={styles.offDuty}
//                                     />
//                                 )}
                        
//                     </View>
//                 </View>
//             </Pressable>
//         );
//     };
//     return (
//         <>
//             {(layout === undefined || layout === 1) && <Layout1 />}
//             {(layout !== undefined && layout === 2) && <Layout2 />}
//         </>
//     );
// };

// const styles = StyleSheet.create({
//     boxSwitchFalse: {
//         borderRadius: 10,
//         borderWidth: 2.5,
//         height: 18,
//         justifyContent: 'center',
//         position: 'relative',
//         width: 30,
//     },
//     boxSwitchFalse2: {
//         borderRadius: 20,
//         // borderWidth: 4,
//         height: 30,
//         justifyContent: 'center',
//         position: 'relative',
//         width: 60,
//     },
//     boxSwitchTrue: {
//         borderRadius: 10,
//         borderWidth: 2.5,
//         height: 18,
//         justifyContent: 'center',
//         position: 'relative',
//         width: 30,
//     },
//     boxSwitchTrue2: {
//         borderRadius: 20,
//         // borderWidth: 4,
//         height: 30,
//         justifyContent: 'center',
//         position: 'relative',
//         width: 60,
//     },
//     container: {
//         // 'backgroundColor': 'pink',
//         height: 'auto',
//         width: 30,
//     },
//     container2: {
//         // 'backgroundColor': 'pink',
//         height: 'auto',
//         width: 60,
//     },
//     dotLeft: {
//         borderRadius: 20,
//         borderWidth: 2.5,
//         height: 18,
//         position: 'absolute',
//         width: 18,
//     },
//     dotLeft2: {
//         borderRadius: 20,
//         // borderWidth: 4,
//         height: 25,
//         left: 5,
//         position: 'absolute',
//         width: 25,
//     },
//     dotRight: {
//         borderRadius: 20,
//         height: '95%',
//         position: 'absolute',
//         width: 12,
//     },
//     dotRight2: {
//         borderRadius: 20,
//         height: 25,
//         position: 'absolute',
//         right: 15,
//         width: 25,
//     },
//     off: {
//         alignItems: 'flex-end',
//         display: 'flex',
//         height: '100%',
//         justifyContent: 'center',
//         // marginRight: -20,
//         width: '89%',
//     },
//     offDuty: {
//         height: 19,
//         width: 22,
//     },
//     on: {
//         display: 'flex',
//         height: '100%',
//         justifyContent: 'center',
//         marginLeft: 10,
//         width: '100%',
//     },
//     onDuty: {
//         height: 19,
//         width: 19,
//     },
// });
// const PropTypeColor = PropTypes.oneOf(['Background','Surface','Primary','OnSurface','OnPrimary','PrimaryVariants','OnSurfaceVariants','SurfaceVariants','PrimaryLight','PrimaryVariantsLight','PrimaryVariantSecond','PrimaryVariantsThird']);

// SwitchBtn.propTypes = {
//     switched: PropTypes.bool.isRequired,
//     // onPress: PropTypes.func,
//     onBackgroundColor: PropTypes.oneOfType([PropTypeColor,PropTypes.string]),
//     offBackgroundColor: PropTypes.oneOfType([PropTypeColor,PropTypes.string]),
//     onBackgroundDotColor: PropTypes.oneOfType([PropTypeColor,PropTypes.string]),
//     offBackgroundDotcolor: PropTypes.oneOfType([PropTypeColor,PropTypes.string]),
//     onBorderDotBackgroundColor: PropTypes.oneOfType([PropTypeColor,PropTypes.string]),
//     offBorderDotBackgroundColor: PropTypes.oneOfType([PropTypeColor,PropTypes.string]),
//     onBordercolor: PropTypes.oneOfType([PropTypeColor,PropTypes.string]),
//     offBordercolor: PropTypes.oneOfType([PropTypeColor,PropTypes.string]),
//     layout: PropTypes.oneOf([1,2]),
//     disabled: PropTypes.bool,
// };
// export default SwitchBtn;


