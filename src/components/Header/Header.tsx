// import React from 'react';
// import { StatusBar, StyleSheet, TouchableOpacity, View, Platform } from 'react-native';

// import PropTypes from 'prop-types';
// import Text from '../Text/Text';
// import Colors from '../theme/colors';
// import SvgIcon from '../SvgIcon/SvgIcon';
// import { Dimensions } from 'react-native';
// import FAIcon from '../FAIcon/FAIcon';

// export type Props = {
//     showBack: boolean;
//     title?: string;
//     rightBtn?: string[];
//     faIcon?: boolean;
//     titleRightBtn?: string[];
//     onPressRightBtn1?: () => void;
//     onPressRightBtn2?: () => void;
//     onPressRightBtn3?: () => void;
//     onPressBackBtn?: () => void;
//     children?: JSX.Element | JSX.Element[];
//     borderBottom?: boolean;
//     bgTransparent?: boolean;
//     textColor?: string;
//     backIcon?: string;
//     backIconColor?: string;
//     bgColor?: string;
//     fontFamily?: string;
//     fontSize?: number | 'base' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
//     rightBtnsize?: number;
//     urlLogo?: string;
//     mapName?: string;
// };

// const Header: React.FC<Props> = ({
//     showBack,
//     title,
//     rightBtn,
//     faIcon,
//     titleRightBtn,
//     onPressRightBtn1,
//     onPressRightBtn2,
//     onPressRightBtn3,
//     onPressBackBtn,
//     children,
//     borderBottom,
//     bgTransparent,
//     textColor,
//     backIcon,
//     backIconColor,
//     bgColor,
//     fontFamily,
//     fontSize,
//     rightBtnsize,
//     urlLogo,
//     mapName,

// }) =>
// {
//     const handlePress = (index: number) =>
//     {
//         if (index === 0)
//         {
//             onPressRightBtn1 !== undefined && onPressRightBtn1();
//         }
//         else if (index === 1)
//         {
//             onPressRightBtn2 !== undefined && onPressRightBtn2();
//         }
//         else
//         {
//             onPressRightBtn3 !== undefined && onPressRightBtn3();
//         }
//     };

//     const BtnRight = (): JSX.Element =>
//     {
//         const listBtn = rightBtn !== undefined
//             ? rightBtn.length !== 0 && rightBtn.map((x: string, index: number) =>
//             {
//                 if (index < 3)
//                 {
//                     if (faIcon)
//                     {
//                         return (
//                             <TouchableOpacity
//                                 key={index}
//                                 style={styles.replayIcon}
//                                 onPress={() => handlePress(index)}
//                             >
//                                 <Text
//                                     title={titleRightBtn !== undefined && titleRightBtn[index] !== undefined
//                                         ? titleRightBtn[index]
//                                         : ' '}
//                                     colorScheme={'OnSurface'}
//                                     fontFamily={'Nunito'}
//                                     size={'md'}
//                                 />
//                                 <FAIcon
//                                     icon={x}
//                                     size={rightBtnsize ?? 15}
//                                     type={'light'}
//                                     backgroundColor="rgba(0,0,0,0)"
//                                 />
//                             </TouchableOpacity>
//                         );
//                     }
//                     else
//                     {
//                         return (
//                             <TouchableOpacity
//                                 key={index}
//                                 style={styles.replayIcon}
//                                 onPress={() => handlePress(index)}
//                             >
//                                 <Text
//                                     title={titleRightBtn !== undefined && titleRightBtn[index] !== undefined
//                                         ? titleRightBtn[index]
//                                         : ' '}
//                                     colorScheme={'OnSurface'}
//                                     fontFamily={'Nunito'}
//                                     size={'md'}
//                                 />
//                                 <SvgIcon
//                                     name={x}
//                                     size={rightBtnsize ?? 15}
//                                 />
//                             </TouchableOpacity>
//                         );
//                     }
//                 }
//             })
//             : null;

//         return (
//             <View style={styles.rightSide}>
//                 {listBtn}
//             </View>
//         );
//     };

//     const HeaderComponent = (): JSX.Element =>
//     {
//         return (
//             <View style={[
//                 styles.cover,
//                 {
//                     backgroundColor: !showBack ? Colors.Background : Colors.Surface,
//                     borderBottomWidth: borderBottom !== undefined ? borderBottom ? 1 : 0 : 1,
//                 },
//                 bgTransparent === true ? { 'backgroundColor': '#2a2a2a00' } : {},
//                 bgColor !== undefined && { 'backgroundColor': bgColor },
//             ]}
//             >
//                 <View style={styles.coverSearchKey}>
//                     {Platform.OS === 'android'
//                         ? bgColor !== undefined
//                             ? StatusBar.setBackgroundColor(bgColor)
//                             : StatusBar.setBackgroundColor(Colors.Surface)
//                         : null
//                     }

//                     <View>
//                         {showBack &&
//                             (
//                                 <View style={styles.flexRowOnly}>
//                                     <TouchableOpacity
//                                         style={styles.iconBack}
//                                         onPress={onPressBackBtn}
//                                     >
//                                         {backIcon
//                                             ? (
//                                                     <SvgIcon
//                                                         name={backIcon}
//                                                         color={backIconColor || ''}
//                                                     />
//                                                 )
//                                             : bgTransparent ? <SvgIcon name="ArrowBackDark" /> : <SvgIcon name="ArrowBack" />}
//                                     </TouchableOpacity>
//                                 </View>
//                             )}
//                     </View>

//                     <View style={[showBack === true ? { width: '89%' } : { width: '100%' }, styles.wrapedRight]}>
//                         {children !== undefined && children}
//                         <BtnRight />
//                     </View>
//                 </View>
//             </View>
//         );
//     };

//     return (
//         <View>
//             <HeaderComponent />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     cover: {
//         'borderColor': '#F2F2F2',
//         height: 55,
//         justifyContent: 'center',
//         position: 'relative',
//     },
//     coverSearchKey: {
//         alignItems: 'center',
//         flexDirection: 'row',
//         position: 'relative',
//     },
//     flexRowOnly: {
//         flexDirection: 'row',
//     },
//     iconBack: {
//         alignItems: 'center',
//         justifyContent: 'center',
//         paddingLeft: 15,
//         paddingRight: 10,
//         paddingVertical: 15,
//     },
//     replayIcon: {
//         flexDirection: 'row',
//         marginLeft: 7,
//         marginRight: 7,
//     },
//     rightSide: {
//         flexDirection: 'row',
//     },
//     wrapedRight: {
//         maxWidth: Dimensions.get('window').width,
//         paddingLeft: 10,
//         paddingRight: 10,
//     },
// });

// Header.propTypes = {
//     showBack: PropTypes.bool.isRequired,
//     title: PropTypes.string,
//     rightBtn: PropTypes.array,
//     titleRightBtn: PropTypes.array,
//     onPressRightBtn1: PropTypes.func,
//     onPressRightBtn2: PropTypes.func,
//     onPressRightBtn3: PropTypes.func,
//     children: PropTypes.any,
//     bgTransparent: PropTypes.bool,
//     textColor: PropTypes.string,
//     backIcon: PropTypes.string,
//     fontFamily: PropTypes.oneOf(['Nunito', 'Nunito-Bold', 'Nunito-ExtraBold']),
//     mapName: PropTypes.string,
//     // fontSize: PropTypes.oneOf([ 'base' , 'xxs' , 'xs' , 'sm' , 'md' , 'lg' , 'xl' , '2xl' , '3xl' , '4xl' , '5xl' ]),
// };

// export default Header;
