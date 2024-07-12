// import PropTypes from 'prop-types';
// import React, { useState } from 'react';
// import { ActivityIndicator, StyleSheet, TouchableOpacity, View, Image } from 'react-native';
// import Text from '../Text/Text';
// import Colors from '../theme/colors';
// import SvgIcon from '../SvgIcon/SvgIcon';
// import { Sleep } from '../debounceClick';
// import avt from '../../images/avt.png';
// import FAIcon from '../FAIcon/FAIcon';

// export type Props = {
//     avatar?: any;
//     name?: string;
//     isConnected?: boolean;
//     onPressAvt?: () => void;
//     layout?: number;
//     disabled?: boolean
// };

// const Avatar: React.FC<Props> = ({
//     avatar,
//     name,
//     isConnected,
//     onPressAvt,
//     layout,
//     disabled,
// }) =>
// {
//     const [loading, setLoading] = useState(false);
//     const LoadingView = () =>
//     {
//         return (
//             <View style={styles.container}>
//                 <ActivityIndicator
//                     size="small"
//                     color="#FFD700"
//                 />
//             </View>
//         );
//     };

//     const handleClickAvatar = () =>
//     {
//         onPressAvt !== undefined ? onPressAvt() : console.log('undefined');
//         Sleep(2000);
//     };

//     const Layout1 = ():JSX.Element =>
//     {
//         return (
//             <View style={styles.viewAvatar}>
//                 <Text
//                     title={name !== undefined ? name : ' '}
//                     fontFamily={'Nunito-Italic'}
//                     colorScheme={'OnSurfaceVariants'}
//                     paddingRight={4}
//                 />
//                 <TouchableOpacity
//                     disabled={disabled ?? false}
//                     onPress={handleClickAvatar}
//                 >
//                     <View style={styles.coverAvatar}>
//                         {isConnected !== undefined && isConnected === false
//                             ? (
//                                     <View style={styles.dotGray} />
//                                 )
//                             : (
//                                     <View style={styles.dotGreen} />
//                                 )
//                         }
//                         {avatar !== undefined && avatar !== null
//                             ? (
//                                     <View>
//                                         <Image
//                                             source={avatar}
//                                             style={styles.avatarPicker}
//                                         />
//                                         {loading && LoadingView()}
//                                     </View>
//                                 )
//                             : (
                                            
//                                     <View style={styles.avatar}>
//                                         <SvgIcon
//                                             name="avata"
//                                             width={35}
//                                             height={35}
//                                         />
//                                     </View>
//                                 )
//                         }
//                     </View>
//                 </TouchableOpacity>
//             </View>
//         );
//     };

//     const Layout2 = ():JSX.Element =>
//     {
      
//         return (
//             <View style={styles.viewAvatar}>
//                 <TouchableOpacity
//                     disabled={disabled ?? false}
//                     onPress={handleClickAvatar}
//                 >
//                     <View style={styles.coverAvatar2}>
//                         {isConnected !== undefined && isConnected === false
//                             ? (
//                                     <View style={styles.dotGray2} />
//                                 )
//                             : (
//                                     <View style={styles.dotGreen2} />
//                                 )
//                         }
//                         {avatar !== undefined && avatar !== null
//                             ? (
//                                     <View>
//                                         <Image
//                                             source={avatar}
//                                             style={styles.avatarPicker2}
//                                         />
//                                         {loading && LoadingView()}
//                                     </View>
//                                 )
//                             : (
                                            
//                                     <View style={styles.borderAvt}>
//                                         <Image
//                                             source={avt}
//                                             style={styles.avatarPickerClone2}
//                                         />
                                        
//                                         {loading && LoadingView()}
//                                     </View>
//                                 )
//                         }
//                     </View>
//                 </TouchableOpacity>
//             </View>
//         );
//     };

//     const Layout3 = ():JSX.Element =>
//     {
//         return (
//             <View style={styles.viewAvatar}>
//                 <TouchableOpacity
//                     disabled={disabled ?? false}
//                     onPress={handleClickAvatar}
//                 >
//                     <View style={styles.coverAvatar2}>
//                         {isConnected !== undefined && isConnected === false
//                             ? (
//                                     <View style={styles.dotGray2} />
//                                 )
//                             : (
//                                     <View style={styles.dotGreen2} />
//                                 )
//                         }
//                         {avatar !== undefined && avatar !== null
//                             ? (
//                                     <View>
//                                         <Image
//                                             source={avatar}
//                                             style={styles.avatarPicker2}
//                                         />
//                                         {loading && LoadingView()}
//                                     </View>
//                                 )
//                             : (
                                            
//                                     <View style={styles.borderAvt}>
//                                         <View style={styles.avatar_layout3}>
//                                             <FAIcon
//                                                 icon="user"
//                                                 backgroundColor={'transparent'}
//                                                 color="#c4c5c6"
//                                                 size={30}
//                                             />
//                                         </View>
//                                         {loading && LoadingView()}
//                                     </View>
//                                 )
//                         }
//                     </View>
//                 </TouchableOpacity>
//             </View>
//         );
//     };

//     const NameAndAvatar = ():JSX.Element =>
//     {
//         return (
//             <>
//                 {(layout === undefined || layout === 1) && <Layout1 />}
//                 {(layout !== undefined && layout === 2) && <Layout2 />}
//                 {(layout !== undefined && layout === 3) && <Layout3 />}
//             </>
//         );
//     };
    
    
//     return (
//         <>
//             <NameAndAvatar />
//         </>
//     );
// };

// const styles = StyleSheet.create({
//     avatar: {
//         // marginLeft: 10,
//     },
//     avatarPicker: {
//         borderRadius: 10,
//         height: 35,
//         // marginLeft: 10,
//         width: 35,
//     },
//     avatarPicker2: {
//         borderRadius: 10,
//         height: 40,
//         // marginLeft: 10,
//         width: 40,
//         // backgroundColor
//     },
//     avatarPickerClone2: {
//         borderRadius: 10,
//         height: 36,
//         // marginLeft: 10,
//         width: 36,
//         // backgroundColor
//         // justifyContent: 'center',
//         // alignItems: 'center',
//     },
//     avatar_layout3: {
//         alignItems: 'center',
//         marginTop: 5,
//     },
//     borderAvt: {
//         borderColor: Colors.OnSurface,
//         borderRadius: 10,
//         borderWidth: 2,
//         height: 40,
//         width: 40,
//     },
//     container: {
//         alignItems: 'center',
//         bottom: 0,
//         justifyContent: 'center',
//         left: 0,
//         opacity: 0.7,
//         position: 'absolute',
//         right: 0,
//         top: 0,
//     },
//     coverAvatar: {
//         borderRadius: 20,
//         height: 35,
//         marginRight: -10,
//         position: 'relative',
//         width: 35,
//     },
//     coverAvatar2: {
//         borderRadius: 10,
//         height: 40,
//         // marginRight: -10,
//         position: 'relative',
//         width: 40,
//     },

//     dotGray: {
//         'backgroundColor': 'gray',
//         borderRadius: 10,
//         height: 10,
//         left: '75%',
//         position: 'absolute',
//         top: 2,
//         width: 10,
//         zIndex: 1,
//     },
//     dotGray2: {
//         'backgroundColor': 'gray',
//         borderRadius: 10,
//         height: 10,
//         left: '80%',
//         position: 'absolute',
//         top: -2,
//         width: 10,
//         zIndex: 1,
//     },

//     dotGreen: {
//         'backgroundColor': '#54BE00',
//         borderRadius: 10,
//         height: 10,
//         left: '75%',
//         position: 'absolute',
//         top: 2,
//         width: 10,
//         zIndex: 1,
//     },
//     dotGreen2: {
//         'backgroundColor': '#54BE00',
//         borderRadius: 10,
//         height: 10,
//         left: '80%',
//         position: 'absolute',
//         top: -2,
//         width: 10,
//         zIndex: 1,
//     },

    
//     viewAvatar: {
//         alignItems: 'center',
//         flexDirection: 'row',
//         justifyContent: 'center',
//     },
// });

// Avatar.propTypes = {
//     avatar: PropTypes.any,
//     name: PropTypes.string,
//     isConnected: PropTypes.bool,
//     onPressAvt: PropTypes.func,
//     layout: PropTypes.oneOf([1,2]),
//     disabled: PropTypes.bool,
// };

// export default Avatar;
