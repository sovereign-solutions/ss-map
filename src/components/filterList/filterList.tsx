// import PropTypes from 'prop-types';
// import React, { useState } from 'react';
// import { StyleSheet, TouchableOpacity, View } from 'react-native';
// import Text from '../Text/Text';
// import Colors from '../theme/colors';
// import SvgIcon from '../SvgIcon/SvgIcon';
// import storage from '../storage/mmkv';

// export type Props = {
//     title: string;
//     dataName: any[];
//     check: any[];
//     search?: boolean;
//     onPressSearch?: () => void;
//     onPress?: (x:number) => void;
//     dataOnpress?: any[];
//     dropDown?: boolean;
//     children?: JSX.Element|JSX.Element[];
//     shadowColor?: string;
//     layout?: number;
// };


// const FilterList: React.FC<Props> = ({
//     title,
//     dataName,
//     dataOnpress,
//     check,
//     onPress,
//     search,
//     onPressSearch,
//     dropDown,
//     children,
//     shadowColor,
//     layout,
// }) =>
// {
//     const themeMode = storage.getString('THEME_MODE');
//     const [isVisibleChildrent, setIsVisibleChildrent] = useState<boolean>(dropDown !== undefined ? dropDown : true);
//     const list = dataName.map((x,index:number)=>
//     {
//         return (
//             <TouchableOpacity
//                 key={index}
//                 style={(layout && layout === 2)
//                     ? [styles.itemLayout2,
//                             check.length >= index + 1
//                                 ? check[index] === true
//                                         ? { 'backgroundColor': Colors.primaryLighter }
//                                         : { 'backgroundColor': Colors.Surface,
//                                                 borderColor: Colors.Surface, borderWidth: 1 }
//                                 : { 'backgroundColor': Colors.Surface }]
//                     : [styles.item3,check.length >= index + 1 ? check[index] === true ? { 'backgroundColor': Colors.Surface, borderColor: Colors.PrimaryLight, borderWidth: 1 } : { 'backgroundColor': Colors.SurfaceVariants } : { 'backgroundColor': Colors.SurfaceVariants }]}
//                 onPress={()=>onPress && onPress(dataOnpress === undefined ? index : dataOnpress[index])}
//             >
//                 <Text
//                     title={x}
//                     paddingTop={3}
//                     paddingBottom={3}
//                     colorScheme={(layout && layout === 2) ? 'OnSurface' : check.length >= index + 1 ? check[index] === true ? 'PrimaryLight' : 'OnSurface' : 'OnSurface'}
//                     size={'md'}
//                     textAlign="center"
//                 />
//             </TouchableOpacity>
//         );
//     });
//     const RenderList = ():JSX.Element=>
//     {
//         return (
//             <View style={styles.list3}>
//                 {list}
//                 {dataName.length % 3 !== 0 && (
//                     <View style={styles.item2} />
//                 )}
//                 {dataName.length % 2 === 0 && dataName.length % 3 !== 0 &&
//                 dataName.length % 5 !== 0 && dataName.length % 9 !== 0 && (
//                     <View style={styles.item2} />
//                 )}
//                 {dataName.length % 5 !== 0 &&
//                 dataName.length % 9 !== 0 &&
//                 dataName.length % 2 !== 0 &&
//                 (
//                     <View style={styles.item2} />
//                 )}
//             </View>
//         );
//     };

//     const Layout1 = ():JSX.Element =>
//     {
//         return (
//             <View style={[styles.BoxOutLine,{ 'backgroundColor': Colors.Surface },
//                 styles.shadow, shadowColor !== undefined ? { shadowColor: shadowColor } : {}]}
//             >
//                 <View style={styles.title}>
//                     <View style={styles.paddingH15}>
//                         <Text
//                             title={title}
//                             size={'3xl'}
//                             colorScheme={(themeMode === 'light2' || themeMode === 'dark2') ? 'PrimaryVariantsFour' : 'PrimaryLight'}
//                             fontFamily={'Nunito-Bold'}
//                         />
//                     </View>
//                     {search === true && (
//                         <View style={styles.paddingH15}>
//                             <TouchableOpacity onPress={onPressSearch}>
//                                 <Text
//                                     title={'search'}
//                                     size={'3xl'}
//                                     colorScheme={'OnSurfaceVariants'}
//                                     fontFamily={'Nunito-Bold'}
//                                 />
//                             </TouchableOpacity>
//                         </View>
//                     )}

//                     {dropDown !== undefined && dropDown === true && (
//                         <View style={[styles.arrow, isVisibleChildrent === false && { transform: [{ rotate: '180deg' }] }]}>
//                             <TouchableOpacity onPress={()=>setIsVisibleChildrent(!isVisibleChildrent)}>
//                                 <SvgIcon name="down arrow" />
//                             </TouchableOpacity>
//                         </View>
//                     )}
//                 </View>
//                 {isVisibleChildrent === false && children !== undefined && children}
//                 <RenderList />
//             </View>
//         );
//     };

//     const Layout2 = ():JSX.Element =>
//     {
//         return (
//             <View style={styles.BoxOutLine}>
//                 <View style={styles.title2}>
//                     <View style={styles.paddingH15}>
//                         <Text
//                             title={title}
//                             size={'2xl'}
//                             colorScheme={'OnSurface'}
//                             fontFamily={'Nunito-ExtraBold'}
//                         />
//                     </View>
//                     {search === true && (
//                         <View style={styles.paddingH15}>
//                             <TouchableOpacity onPress={onPressSearch}>
//                                 <Text
//                                     title={'search'}
//                                     size={'3xl'}
//                                     colorScheme={'OnSurfaceVariants'}
//                                     fontFamily={'Nunito-Bold'}
//                                 />
//                             </TouchableOpacity>
//                         </View>
//                     )}

//                     {dropDown !== undefined && dropDown === true && (
//                         <View style={[styles.arrow, isVisibleChildrent === false && { transform: [{ rotate: '180deg' }] }]}>
//                             <TouchableOpacity onPress={()=>setIsVisibleChildrent(!isVisibleChildrent)}>
//                                 <SvgIcon name="down arrow" />
//                             </TouchableOpacity>
//                         </View>
//                     )}
//                 </View>
//                 {isVisibleChildrent === false && children !== undefined && children}
//                 <RenderList />
//             </View>
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
//     BoxOutLine: {
//         borderRadius: 10,
//         // marginHorizontal: 2,
//         marginVertical: 6,
//         paddingHorizontal: 5,
//         paddingVertical: 10,
//         width: '100%',
//     },
//     arrow: { alignItems: 'center', justifyContent: 'center' , marginRight: 8, marginTop: 3 },
//     item2: {
//         alignItems: 'center',
//         borderRadius: 8,
//         // borderWidth: 1,
//         height: 0,
//         justifyContent: 'center',
//         marginBottom: -10,
//         paddingVertical: 4,
//         width: '28%',
//     },

//     item3: {
//         alignItems: 'center',
//         borderRadius: 8,
//         justifyContent: 'center',
//         marginBottom: 10,
//         minHeight: 45,
//         paddingVertical: 4,
//         width: '28%',
//     },
//     itemLayout2: {
//         alignItems: 'center',
//         borderRadius: 20,
//         justifyContent: 'center',
//         marginBottom: 10,
//         minHeight: 37,
//         paddingVertical: 2,
//         width: '28%',
//     },
//     list3: {
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//         justifyContent: 'space-around',
//         // marginBottom: -40,
//         marginTop: 10,
//     },
//     paddingH15: {
//         paddingHorizontal: 13,
//     },
//     shadow: {
//         elevation: 5,
//         shadowOffset: {
//             width: 0,
//             height: 1,
//         },
//         shadowOpacity: 0.70,

//         shadowRadius: 1.41,
//     },
//     title: {
//         // alignItems: 'center',
//         borderBottomColor: Colors.OnSurfaceVariants,
//         borderBottomWidth: 1,
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         marginBottom: 3,
//         paddingBottom: 12,
//     },
//     title2: {
//         borderBottomColor: Colors.OnSurfaceVariants,
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         marginBottom: 0,
//     },
// });

// FilterList.propTypes = {
//     title: PropTypes.string.isRequired,
//     onPress: PropTypes.func,
//     dataName: PropTypes.array.isRequired,
//     check: PropTypes.array.isRequired,
//     dataOnpress: PropTypes.array,
//     dropDown: PropTypes.bool,
//     children: PropTypes.any,
//     shadowColor: PropTypes.string,
//     layout: PropTypes.oneOf([1,2]),
// };

// export default FilterList;
