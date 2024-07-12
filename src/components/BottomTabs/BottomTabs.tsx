// import React, { useEffect, useState } from 'react';
// import { Dimensions, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';

// import PropTypes from 'prop-types';

// import Colors from '../theme/colors';
// import FAIcon from '../FAIcon/FAIcon';
// import SvgIcon from '../SvgIcon/SvgIcon';
// import Text from '../Text/Text';
// import LazyTab from './LazyTab';

// export type dataBottomTabs = {
//     key: number,
//     handleClick: (data?: dataBottomTabs) => any;
//     icon: string,
//     activeIcon?: string,
//     iconType?: string,
//     component: React.ComponentType<any> | React.ReactElement | null | undefined;
//     title?: string,
//     lazy?: boolean
// }

// export type Props = {
//     data?: dataBottomTabs[],
//     handleChangeTab?: (_key: number) => void,
//     currentTabIndex?: number,
//     layout?: number,
//     textSize?: 'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl'
//     customColor?: string,
//     customActiveColor?: string,
//     iconSize?: number,
//     iconActiveSize?: number,
// };

// const defaultColor = '#EEEEEE';
// const defaultActiveColor = '#EEEEff';
// const defaultSize = '24px';
// const defaultActiveSize = '26px';
// const defaultColor2 = '#868686';
// const defaultActiveColor2 = '#0066B2';

// const BottomTabs: React.FC<Props> = ({
//     data,
//     handleChangeTab,
//     currentTabIndex,
//     layout,
//     textSize = 'xl',
//     customColor,
//     customActiveColor,
//     iconSize,
//     iconActiveSize,
// }) =>
// {
//     const [selectedTabs, setSelectedTabs] = useState(0);

//     useEffect(() =>
//     {
//         if (currentTabIndex !== undefined)
//         {
//             setSelectedTabs(currentTabIndex);
//         }
//     }, [currentTabIndex]);

//     const handleChooseTabs = (key: number) =>
//     {
//         setSelectedTabs(key);

//         const selectedTab = data?.find(e => e.key === key);

//         selectedTab && selectedTab.handleClick && selectedTab.handleClick(selectedTab);

//         if (handleChangeTab)
//         {
//             handleChangeTab(key);
//         }
//     };

//     const renderComponent = () =>
//     {
//         return data?.map((item: dataBottomTabs) =>
//         {
//             const displayScreen = StyleSheet.create({
//                 viewLayout: {
//                     display: item.key === selectedTabs ? 'flex' : 'none',
//                     flex: 1,
//                     height: '90%',
//                 },
//             });

//             return (
//                 <View
//                     key={item.key}
//                     style={displayScreen.viewLayout}
//                 >
//                     <LazyTab shouldLoad={!item.lazy || item.key === selectedTabs}>
//                         {item?.component}
//                     </LazyTab>
//                 </View>
//             );
//         });
//     };

//     const getIcon = (icon: string, iconType: string, isActive: boolean, activeIcon?: string, _title?: string) =>
//     {
//         const IconLayout1 = (): JSX.Element =>
//         {
//             return (
//                 <FAIcon
//                     icon={icon}
//                     size={isActive ? (iconActiveSize ? iconActiveSize : defaultActiveSize) : (iconSize ? iconSize : defaultSize)}
//                     color={isActive ? (customActiveColor ? customActiveColor : defaultActiveColor) : (customColor ? customColor : defaultColor)}
//                     backgroundColor={'transparent'}
//                 />
//             );
//         };

//         const IconLayout2 = (): JSX.Element =>
//         {
//             return (
//                 <>
//                     <FAIcon
//                         icon={icon}
//                         size={isActive ? (iconActiveSize ? iconActiveSize : defaultActiveSize) : (iconSize ? iconSize : defaultSize)}
//                         color={isActive ? (customActiveColor ? customActiveColor : defaultActiveColor2) : (customColor ? customColor : defaultColor2)}
//                         backgroundColor={'transparent'}
//                     />
//                     <Text
//                         title={_title ?? ''}
//                         size={textSize}
//                         paddingTop={2}
//                         colorScheme={customColor ? (!isActive ? customColor : undefined) : undefined}
//                         fontFamily={isActive ? 'Nunito-Bold' : 'Nunito'}
//                     />
//                 </>
//             );
//         };

//         if (!iconType || iconType === 'SvgIcon')
//         {
//             if (!layout || layout === 1)
//             {
//                 return (
//                     <SvgIcon
//                         name={activeIcon ? isActive ? `${activeIcon}` : `${icon}` : `${icon}`}
//                         size={isActive ? defaultActiveSize.toString() : defaultSize.toString()}
//                         color={defaultColor}
//                     />
//                 );
//             }

//             if (layout === 2)
//             {
//                 return (
//                     <>
//                         <SvgIcon
//                             name={activeIcon ? isActive ? `${activeIcon}` : `${icon}` : `${icon}`}
//                             color={isActive ? (customActiveColor ? customActiveColor : defaultActiveColor2) : (customColor ? customColor : defaultColor2)}
//                             size={isActive ? defaultActiveSize.toString() : defaultSize.toString()}
//                         />
//                         <Text
//                             title={_title ?? ''}
//                             colorScheme={customColor ? (!isActive ? customColor : undefined) : undefined}
//                             size={textSize}
//                             paddingTop={2}
//                             fontFamily={isActive ? 'Nunito-Bold' : 'Nunito'}
//                         />
//                     </>
//                 );
//             }
//         }
//         else
//         {
//             return (
//                 <>
//                     {(!layout || layout === 1) && (<IconLayout1 />)}
//                     {layout === 2 && <IconLayout2 />}
//                 </>
//             );
//         }
//     };

//     const Layout1 = (): JSX.Element =>
//     {
//         return (
//             <View style={[
//                 styles.bottomTabs,
//                 { backgroundColor: Colors.Primary },
//             ]}
//             >
//                 {data?.map((layout: dataBottomTabs, index) =>
//                 {
//                     return (
//                         <TouchableOpacity
//                             key={index}
//                             style={selectedTabs === layout.key
//                                 ? {
//                                         ...styles.selectHome,
//                                         width: Dimensions.get('window').width / data.length,
//                                     }
//                                 : {
//                                         ...styles.home,
//                                         width: Dimensions.get('window').width / data.length,
//                                     }
//                             }
//                             onPress={() => handleChooseTabs(layout.key)}
//                         >
//                             {selectedTabs === layout.key
//                                 ? getIcon(layout.icon, layout.iconType || '', true, layout.activeIcon)
//                                 : getIcon(layout.icon, layout.iconType || '', false, layout.activeIcon)
//                             }
//                         </TouchableOpacity>
//                     );
//                 })}
//             </View>
//         );
//     };

//     const Layout2 = (): JSX.Element =>
//     {
//         return (
//             <View style={[
//                 styles.bottomTabs2,
//                 Platform.OS === 'ios'
//                     ? styles.bottomTabShadowIos
//                     : styles.bottomTabShadowAndroid,
//                 { backgroundColor: Colors.Surface },
//             ]}
//             >
//                 {data?.map((layout: dataBottomTabs, index) =>
//                 {
//                     return (
//                         <TouchableOpacity
//                             key={index}
//                             style={[styles.home, { width: Dimensions.get('window').width / data.length }]}
//                             onPress={() => handleChooseTabs(layout.key)}
//                         >
//                             {selectedTabs === layout.key
//                                 ? getIcon(layout.icon, layout.iconType || '', true, layout.activeIcon, layout.title)
//                                 : getIcon(layout.icon, layout.iconType || '', false, layout.activeIcon, layout.title)
//                             }
//                         </TouchableOpacity>
//                     );
//                 })}
//             </View>
//         );
//     };

//     return (
//         <View style={styles.container}>
//             {renderComponent()}

//             {layout === undefined || !layout || layout === 1
//                 ? (
//                         <Layout1 />
//                     )
//                 : (
//                         <Layout2 />
//                     )}

//         </View>
//     );
// };
// const styles = StyleSheet.create({
//     bottomTabShadowAndroid: {
//         'borderTopColor': '#dadada',
//         borderTopWidth: 1,
//         elevation: 4,
//         'shadowColor': '#000',

//         shadowOffset: {
//             width: 0,
//             height: 4,
//         },
//         shadowOpacity: 0,
//         shadowRadius: 4.65,
//     },
//     bottomTabShadowIos: {
//         'shadowColor': '#000',
//         shadowOffset: {
//             width: 0,
//             height: -2,
//         },
//         shadowOpacity: 0.3,
//         shadowRadius: 1,
//     },
//     bottomTabs: {
//         // bottom: 0,
//         flexDirection: 'row',
//         height: 50,
//         // marginTop: 50,
//         // position: 'absolute',
//         width: '100%',
//     },
//     bottomTabs2: {
//         flexDirection: 'row',
//         height: 60,
//         width: '100%',
//     },
//     container: {
//         flex: 1,
//         flexDirection: 'column',
//         height: '100%',
//         // paddingVertical: 20,
//         position: 'relative',
//         width: '100%',
//     },
//     home: {
//         alignItems: 'center',
//         height: '100%',
//         justifyContent: 'center',
//     },
//     selectHome: {
//         alignItems: 'center',
//         'backgroundColor': '#345499',
//         height: '100%',
//         justifyContent: 'center',
//     },
// });

// BottomTabs.propTypes = {
//     data: PropTypes.any,
//     layout: PropTypes.oneOf([1, 2]),
// };

// export default BottomTabs;
