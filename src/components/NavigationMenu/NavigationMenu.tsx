// import React from 'react';
// import { FlatList, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
// import FlexContainer from '../Container/FlexContainer';
// import FAIcon from '../FAIcon/FAIcon';
// import SvgIcon from '../SvgIcon/SvgIcon';
// import Text from '../Text/Text';
// import Colors from '../theme/colors';

// export type MenuType = {
//     title: string,
//     icon?: string,
//     iconType?: 'FAIcon' | 'SvgIcon',
//     onPress?: () => void,
// }

// export type NavigationMenuProps = {
//     menus: MenuType[],
// }

// export const NavigationMenu = (props: NavigationMenuProps) =>
// {
//     const { menus } = props;

//     const renderItem = (item: any) =>
//     {
//         return (
//             <TouchableWithoutFeedback
//                 onPress={item.item.onPress}
//             >
//                 <View style={[styles.item, item.index === 0 && styles.firstItem, { backgroundColor: Colors.Surface } ]}>
//                     <FlexContainer
//                         direction='row'
//                         style={{ alignItems: 'center' }}
//                     >
//                         {item.item.icon && (
//                             item.item.iconType === 'SvgIcon'
//                                 ? (
//                                         <SvgIcon name={item.item.icon} />
//                                     )
//                                 : (
//                                         <FAIcon
//                                             icon={item.item.icon}
//                                             size={'20'}
//                                             backgroundColor={Colors.Surface}
//                                         />
//                                     )
//                         )}
//                         <Text
//                             paddingLeft={item.item.icon ? 10 : 0}
//                             title={item.item.title}
//                             size='xl'
//                         />
//                     </FlexContainer>
                    
//                     <View style={styles.nextScreenIcon}>
//                         <FAIcon
//                             icon='angle-right'
//                             type='regular'
//                             backgroundColor={Colors.Surface}
//                         />
//                     </View>
//                 </View>
//             </TouchableWithoutFeedback>
//         );
//     };
//     return (
//         <View>
//             <FlatList
//                 data={menus}
//                 renderItem={renderItem}
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     firstItem: {
//         'borderTopColor': '#dddddd',
//         borderTopWidth: 1,
//     },
//     item: {
//         'backgroundColor': Colors.Surface,
//         'borderBottomColor': '#dddddd',
//         borderBottomWidth: 1,
//         paddingHorizontal: 15,
//         paddingVertical: 15,
//         position: 'relative',
//     },
//     nextScreenIcon: {
//         position: 'absolute',
//         right: 15,
//         top: 15,
//     },
// });
