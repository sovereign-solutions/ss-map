// // basic
// import PropTypes from 'prop-types';
// import React from 'react';
// import Container from '../Container/Container';
// // import Se

// // mui
// import { Dimensions, View } from 'react-native';
// import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
// import { Shadow } from 'react-native-shadow-2';
// import Colors from '../theme/colors';


// const defaultMarginVertical = 4;
// const defaultShadowRadius = 5;
// const defaultShadowDistance = 1;

// export type ListViewProps = {
//     renderItem: any;
//     data: any[]
//     keyExtractor?: any;
//     contentContainerStyle?: any;
//     maxToRenderPerBatch?: number
//     onItemClick?: any;
//     paddingHorizontal?: number,
//     paddingVertical?: number,
//     mode?: 'default' | 'bottom-sheet';
// };

// const ListView: React.FC<ListViewProps> = ({
//     renderItem,
//     data,
//     keyExtractor,
//     contentContainerStyle,
//     maxToRenderPerBatch,
//     onItemClick,
//     paddingHorizontal = 0,
//     paddingVertical = 0,
//     mode = 'default',
// }) =>
// {
   
//     if (mode === 'bottom-sheet')
//     {
//         return (
//             <Container>
            
//                 {
//                     data.map((item,index) =>(
//                         <View
//                             key={index}
//                             style={{
//                                 marginVertical: defaultMarginVertical,
//                             }}
//                         >
//                             <Shadow
//                                 radius={defaultShadowRadius}
//                                 distance={defaultShadowDistance}
//                                 corners={['bottomLeft','bottomRight','topLeft','topRight']}
                            
                            
//                             >
//                                 <TouchableOpacity
//                                     style={{
//                                         backgroundColor: Colors.Surface,
//                                     }}
//                                     activeOpacity={0.7}
//                                     onPress={()=>
//                                     {
//                                         onItemClick && onItemClick(item);
//                                     }}
//                                 >
//                                     {
//                                         renderItem && renderItem(item,index)
//                                     }
//                                 </TouchableOpacity>
//                             </Shadow>
//                         </View>
//                     ))
//                 }
                
//             </Container>
//         );
//     }
//     return (
//         <Container>
//             <FlatList
//                 data={data}
//                 renderItem={(({ item,index }) =>
//                 {
//                     if (!renderItem) {return;}

//                     return (
//                         <View
//                             style={{
//                                 marginVertical: defaultMarginVertical,
//                             }}
//                         >
//                             <Shadow
//                                 radius={defaultShadowRadius}
//                                 distance={defaultShadowDistance}
//                                 corners={['bottomLeft','bottomRight','topLeft','topRight']}
                            
                            
//                             >
//                                 <TouchableOpacity
//                                     style={{
//                                         backgroundColor: Colors.Surface,
//                                     }}
//                                     activeOpacity={0.7}
//                                     onPress={()=>
//                                     {
//                                         onItemClick && onItemClick(item);
//                                     }}
//                                 >
//                                     {
//                                         renderItem && renderItem(item,index)
//                                     }
//                                 </TouchableOpacity>
//                             </Shadow>
//                         </View>
//                     );
                
//                 }) as any
//                 }
//                 keyExtractor={keyExtractor}
//                 maxToRenderPerBatch={maxToRenderPerBatch ?? 20}
//                 contentContainerStyle={{
//                     paddingHorizontal,
//                     paddingVertical,
//                     minHeight: Dimensions.get('window').height - 80,
                    
//                 }}
//             />
//         </Container>
//     );
// };

// ListView.propTypes = {
//     renderItem: PropTypes.func,
//     data: PropTypes.any,
//     keyExtractor: PropTypes.func,
//     contentContainerStyle: PropTypes.any,
//     maxToRenderPerBatch: PropTypes.number,
//     paddingHorizontal: PropTypes.number,
//     paddingVertical: PropTypes.number,
//     mode: PropTypes.oneOf(['default','bottom-sheet']),
// };

// export default ListView;
