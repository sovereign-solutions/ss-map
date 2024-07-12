// import React, { useEffect, useState } from 'react';
// import { Pressable, StyleSheet, Text, View } from 'react-native';

// import FAIcon from '../FAIcon/FAIcon';
// import Colors from '../theme/colors';
// import { LayerIcon } from './LayerIcon';

// const TreeItem: React.FunctionComponent<any> = ({ children, node, onChecked, onExpand }): JSX.Element =>
// {
//     const type = node.child && node.child.length ? 'folder' : 'file';
//     const isExpand = children && children.length;
//     const checkingType = node.checkingType || 0;

//     const [layerName, setLayerName] = useState<string>('null');

//     const handleChecked = () =>
//     {
//         onChecked(node, checkingType === 0 || checkingType === 2 ? 1 : 0);
//     };

//     useEffect(() =>
//     {
//         if (layerName === 'null')
//         {
//             if (node.Content !== null)
//             {
//                 const data = JSON.parse(node.Content);
//                 setLayerName(data.LayerName);
//             }
//         }
//     }, [node, layerName]);

//     return (
//         <View
//             key={node.Id}
//         >
//             <View style={{ ...styles.flexItem }}>
//                 {type === 'folder'
//                     ? (
//                             <View style={{ paddingVertical: 8, paddingHorizontal: 4 }}>
//                                 <FAIcon
//                                     icon={isExpand ? 'angle-down' : 'angle-right'}
//                                     type="light"
//                                     color={Colors.OnSurface}
//                                     size={24}
//                                     backgroundColor={'none'}
//                                     onClick={() => onExpand(node, !isExpand)}
//                                 />
//                             </View>
//                         )
//                     : (<View style={styles.children} />)
//                 }

//                 <View style={{ ...styles.flexItem }}>
//                     <View style={{ overflow: 'hidden', borderRadius: 3.5, paddingVertical: 8, paddingHorizontal: 4 }}>
//                         {checkingType === 0 && (
//                             <View
//                                 style={{
//                                     'backgroundColor': Colors.Surface,
//                                     width: 24,
//                                     height: 24,
//                                     justifyContent: 'center',
//                                     alignItems: 'center',
//                                     overflow: 'hidden',
//                                     padding: 3,
//                                     borderRadius: 4,
//                                     borderWidth: 0.7,
//                                     borderColor: Colors.OnSurfaceVariants,
//                                 }}
//                                 onTouchEnd={handleChecked}
//                             />
//                         )}

//                         {checkingType === 1 && (
//                             <View style={{
//                                 'backgroundColor': Colors.Primary,
//                                 width: 24,
//                                 height: 24,
//                                 justifyContent: 'center',
//                                 alignItems: 'center',
//                                 overflow: 'hidden',
//                                 padding: 3,
//                                 borderRadius: 4,
//                                 borderWidth: 0.7,
//                                 borderColor: Colors.OnSurfaceVariants,
//                             }}
//                             >
//                                 <FAIcon
//                                     type="solid"
//                                     icon="check"
//                                     size={'15'}
//                                     color={Colors.OnPrimary}
//                                     backgroundColor={Colors.Primary}
//                                     onClick={handleChecked}

//                                 />
//                             </View>
//                         )}

//                         {checkingType === 2 && (
//                             <View style={{
//                                 width: 24,
//                                 height: 24,
//                                 justifyContent: 'center',
//                                 alignItems: 'center',
//                                 overflow: 'hidden',
//                                 padding: 3,
//                                 borderRadius: 4,
//                                 borderWidth: 0.7,
//                                 borderColor: Colors.OnSurfaceVariants,
//                             }}
//                             >
//                                 <FAIcon
//                                     type="solid"
//                                     icon="minus-square"
//                                     color={Colors.Primary}
//                                     backgroundColor={Colors.OnPrimary}
//                                     size={'28'}
//                                     onClick={handleChecked}
//                                 />
//                             </View>
//                         )}
//                     </View>

//                     <Pressable
//                         style={styles.flexItem}
//                         onPress={handleChecked}
//                     >
//                         <View style={{ padding: 8 }}>
//                             <LayerIcon
//                                 layer={layerName}
//                                 width={24}
//                                 height={24}
//                             />
//                         </View>

//                         <Text
//                             style={{ color: Colors.OnSurface, fontSize: 16, padding: 8 }}
//                             ellipsizeMode={'tail'}
//                             numberOfLines={1}
//                         >
//                             {node.Title}
//                         </Text>
//                     </Pressable>
//                 </View>
//             </View>

//             <View style={styles.children}>
//                 {children}
//             </View>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     children: {
//         marginLeft: 32,
//         marginTop: 10,
//     },
//     flexItem: {
//         flex: 1,
//         flexDirection: 'row',
//     },
// });

// TreeItem.propTypes = {};

// export { TreeItem };

