// import PropTypes from 'prop-types';
// import React, { useState } from 'react';
// import { StyleSheet, TouchableOpacity, View, Modal as ModalNt } from 'react-native';
// import Text from '../Text/Text';
// import Colors from '../theme/colors';
// import SvgIcon from '../SvgIcon/SvgIcon';

// export type Props = {
//     Header?: JSX.Element|JSX.Element[];
//     Footer?: JSX.Element|JSX.Element[];
//     Body?: JSX.Element|JSX.Element[];
//     onClose?: () => void;
//     visible?: boolean;
//     title?: string;
//     size?: string;
// };

// const Modal: React.FC<Props> = ({
//     Header,
//     Footer,
//     Body,
//     onClose,
//     visible,
//     title,
//     size,
// }) =>
// {
//     return (
//         <ModalNt
//             animationType={'fade'}
//             visible={visible}
//             transparent
//         >
//             <View style={styles.container}>
//                 <View style={[styles.box, size === 'xs'
//                     ? { width: '50%' }
//                     : size === 'sm'
//                         ? { width: '60%' }
//                         : size === 'md'
//                             ? { width: '70%' }
//                             : size === 'lg'
//                                 ? { width: '80%' }
//                                 : size === 'xl'
//                                     ? { width: '95%' }
//                                     : size === 'full'
//                                         ? { width: '100%' }
//                                         : { width: '80%' } ]}
//                 >
//                     {/* {title !== undefined || Header !== undefined && ( */}
//                     <View style={styles.header}>
//                         {title !== undefined && (
//                             <Text
//                                 title={title.charAt(0).toUpperCase() + title.slice(1)}
//                                 colorScheme={Colors.OnSurface}
//                                 size={'xl'}
//                                 fontFamily="Nunito-bold"
//                                 paddingLeft={8}
//                                 paddingRight={8}
//                             />
//                         )}
//                         {Header !== undefined && Header}
//                         {onClose !== undefined && (
//                             <TouchableOpacity
//                                 style={styles.circle}
//                                 onPress={onClose}
//                             ><SvgIcon name={'close'} />
//                             </TouchableOpacity>
//                         )}
//                     </View>


//                     {Body !== undefined && (
//                         <View style={styles.body}>
//                             {Body}
//                         </View>
//                     )}

//                     {Footer !== undefined && (
//                         <View style={styles.footer}>
//                             {Footer}
//                         </View>
//                     )}
//                 </View>
//             </View>
//         </ModalNt>
//     );
// };

// const styles = StyleSheet.create({
//     body: {
//         width: '100%',
//     },
//     box: {
//         backgroundColor: Colors.Surface,
//         borderRadius: 10,
//     },
//     circle: {
//         alignItems: 'center', 'backgroundColor': 'red',
//         borderRadius: 15,
//         height: 22,
//         justifyContent: 'center',
//         marginRight: 7,
//         width: 22,
//     },
//     container: { alignItems: 'center',
//         'backgroundColor': '#bbbbbbab',
//         flex: 1, justifyContent: 'center', width: '100%' },
//     footer: {
//         alignItems: 'center',
//         backgroundColor: Colors.SurfaceVariants,
//         borderBottomLeftRadius: 10,
//         borderBottomRightRadius: 10,
//         // borderTopWidth: 1,
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         padding: 5,
//         width: '100%',
//     },
//     header: {
//         alignItems: 'center',
//         backgroundColor: Colors.PrimaryVariantSecond,
//         borderBottomColor: Colors.OnSurfaceVariants,
//         borderBottomWidth: 1,
//         borderTopLeftRadius: 10,
//         borderTopRightRadius: 10,
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         padding: 7,
//         width: '100%',
//     },
// });

// Modal.propTypes = {
//     Header: PropTypes.any,
//     Footer: PropTypes.any,
//     Body: PropTypes.any,
//     onClose: PropTypes.func,
//     visible: PropTypes.bool,
//     title: PropTypes.string,
//     size: PropTypes.string,
// };

// export default Modal;
