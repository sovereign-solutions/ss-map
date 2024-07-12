// /* eslint-disable react-native/no-inline-styles */
// import React, { useEffect, useMemo, useState } from 'react';

// import FAIcon from '../FAIcon/FAIcon';
// import { Pressable, Text, View } from 'react-native';
// import { StyleSheet } from 'react-native';
// import { LayerIcon } from './LayerIcon';
// import Colors from '../theme/colors';

// const TreeItem = ({ children, node, onChecked, onExpand }) =>
// {
//     const type = node.children && node.children.length ? 'folder' : 'file';
//     const isExpand = children && children.length;
//     const checkingType = node.checkingType || 0;

//     const [layerName,setLayerName] = useState<string>('null');

//     useEffect(()=>
//     {
//         if (layerName === 'null')
//         {
//             if (node !== null)
//             {
//                 // const data = JSON.parse(node.Content);
//                 setLayerName(node.layer);
//             }
//         }
//     },[layerName, node]);

//     const renderCheckingType = useMemo(() =>
//     {
//         const handleChecked = () =>
//         {
//             onChecked(node, checkingType === 0 || checkingType === 2 ? 1 : 0);
//         };

//         switch (checkingType)
//         {
//             case 0:
//                 return !node.isDisable && (
//                     <View
//                         style={{
//                             'backgroundColor': Colors.Surface,
//                             width: 24,
//                             height: 24,
//                             justifyContent: 'center',
//                             alignItems: 'center',
//                             overflow: 'hidden',
//                             padding: 3,
//                             borderRadius: 4,
//                             borderWidth: 0.7,
//                             borderColor: Colors.OnSurfaceVariants,
//                         }}
//                         onTouchEnd={handleChecked}
//                     />
//                 );
//             case 1:
//                 return !node.isDisable && (
//                     <View style={{
//                         'backgroundColor': Colors.Primary,
//                         width: 24,
//                         height: 24,
//                         justifyContent: 'center',
//                         alignItems: 'center',
//                         overflow: 'hidden',
//                         padding: 3,
//                         borderRadius: 4,
//                         borderWidth: 0.7,
//                         borderColor: Colors.OnSurfaceVariants,
//                     }}
//                     >
//                         <FAIcon
//                             type="solid"
//                             icon="check"
//                             size={'15'}
//                             color={Colors.OnPrimary}
//                             backgroundColor={Colors.Primary}
//                             onClick={handleChecked}
//                         />
//                     </View>
//                 );
//             case 2:
//                 return !node.isDisable && (
//                     <View style={{
//                         width: 24,
//                         height: 24,
//                         justifyContent: 'center',
//                         alignItems: 'center',
//                         overflow: 'hidden',
//                         padding: 3,
//                         borderRadius: 4,
//                         borderWidth: 0.7,
//                         borderColor: Colors.OnSurfaceVariants,
//                     }}
//                     >
//                         <FAIcon
//                             type="solid"
//                             icon="minus-square"
//                             color={Colors.Primary}
//                             backgroundColor={Colors.OnPrimary}
//                             size={'28'}
//                             onClick={handleChecked}
//                         />
//                     </View>
//                 );
        
//             default:
//                 break;
//         }
//     }, [checkingType, node, onChecked]);

//     return (
//         <View
//             key={node.id}
//             style={{ marginBottom: 10 }}
//         >
//             <View style={styles.flexItem}>
//                 {
//                     type === 'folder'
//                         ? (
//                                 <View>
//                                     {
//                                         isExpand
//                                             ? (
//                                                     <FAIcon
//                                                         icon="angle-down"
//                                                         type="light"
//                                                         color={Colors.OnSurface}
//                                                         backgroundColor={Colors.Surface}
//                                                         size={24}
//                                                         // backgroundColor={'none'}
//                                                         onClick={() => onExpand(node, !isExpand)}
//                                                     />
//                                                 )
//                                             : (
//                                                     <FAIcon
//                                                         icon="angle-right"
//                                                         type="light"
//                                                         color={Colors.OnSurface}
//                                                         backgroundColor={Colors.Surface}
//                                                         size={24}
//                                                         // backgroundColor={'none'}
//                                                         onClick={() => onExpand(node, !isExpand)}
//                                                     />
//                                                 )
//                                     }
//                                 </View>
//                             )
//                         : (
//                                 <View style={{ width: 24 }} />
//                             )}

//                 <View style={{ ...styles.flexItem }}>

//                     <View style={{ overflow: 'hidden', borderRadius: 3.5 }}>
//                         {renderCheckingType}
//                     </View>

//                     <Pressable
//                         style={{ flex: 1, justifyContent: 'flex-start',alignItems: 'center',flexDirection: 'row' }}
//                         onPress={()=> type === 'folder'
//                             ? onExpand(node, !isExpand)
//                             : onChecked(node, checkingType === 0 || checkingType === 2 ? 1 : 0)
//                         }
//                     >
//                         <View style={{ width: 5 }} />
//                         <LayerIcon
//                             layer={layerName}
//                             node={node}
//                             width={24}
//                             height={24}
//                         />
//                         <Text style={{ marginLeft: 5, color: Colors.OnSurface, fontSize: 16 }}>{node.label}</Text>
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
//         marginLeft: 24,
//         marginTop: 10,
//     },
//     flexItem: {
//         flex: 1,
//         flexDirection: 'row',
//     },
// });

// TreeItem.propTypes = {};

// export { TreeItem };
