// import React, { useEffect, useState } from 'react';
// import { Dimensions, Image, ImageResizeMode, ImageSourcePropType, Pressable, StyleSheet, View } from 'react-native';
// import { ModalV2 } from '../../';
// import { PopupImage } from '../ImageViewer';

// export type AsyncImageProps = {
//     uri: Promise<any> | string;
//     width?: number; minWidth?: number;
//     height?: number; minHeight?: number;
//     marginTop?: number;
//     marginLeft?: number;
//     marginBottom?: number;
//     marginRight?: number;
//     defaultImage?: ImageSourcePropType;
//     onClick?: () => void;
//     /** Show Full Screen when user click on Image `true|false` */
//     viewOnClick?: boolean;
//     resizeMode?: ImageResizeMode;
//     uriheader?: any
// }

// const AsyncImage: React.FC<AsyncImageProps> = ({
//     uri,
//     width,
//     height,
//     marginTop,
//     marginLeft,
//     marginBottom,
//     minWidth,
//     minHeight,
//     marginRight,
//     defaultImage,
//     onClick,
//     viewOnClick,
//     resizeMode,
//     uriheader,
// }) =>
// {
//     const viewPopup = viewOnClick ?? false;
//     const [visible, setVisible] = useState(false);
//     const [imageData, setImageData] = useState('');
//     const [size, setSize] = useState({ width, height });
//     const [ready, setReady] = useState(false);

//     useEffect(() =>
//     {
//         if (width !== size.width || height !== size.height)
//         {
//             setSize({ width, height });
//         }

//         if (typeof uri === 'string')
//         {
//             setImageData(uri);
//         }
//     });

//     if (typeof uri !== 'string' && typeof uri.then === 'function' && !ready)
//     {
//         uri.then((u) =>
//         {
//             setReady(true);

//             if (typeof u === 'string')
//             {
//                 setImageData(u);
//             }
//             else if (typeof u === 'object')
//             {
//                 setImageData(u.uri);
//                 setSize({ width: parseInt(u.width), height: parseInt(u.height) });
//             }
//         });
//     }

//     return (
//         <React.Fragment>
//             <Pressable
//                 onPress={() =>
//                 {
//                     if (viewPopup)
//                     {
//                         setVisible(true);
//                     }
//                     else
//                     {
//                         onClick && onClick();
//                     }
//                 }}
//             >
//                 <Image
//                     style={{
//                         ...size.height && { height: size.height },
//                         ...size.width && { width: size.width },
//                         ...minHeight && { minHeight: minHeight },
//                         ...minWidth && { minWidth: minWidth },

//                         marginTop,
//                         marginLeft,
//                         marginBottom,
//                         marginRight,
//                     }}
//                     {...resizeMode && { resizeMode }}
//                     source={
//                         imageData
//                             ? { uri: imageData, headers: uriheader }
//                             : defaultImage as any
//                     }

//                 />
//             </Pressable>

//             <ModalV2
//                 size="full"
//                 isOpen={visible}
//                 onClose={() => setVisible(false)}
//             >
//                 <ModalV2.Content>
//                     <ModalV2.Body>
//                         <View style={styles.modalView}>
//                             <PopupImage
//                                 images={[{ url: imageData, freeHeight: true }]}
//                                 visible={visible}
//                                 onCancel={() => setVisible(false)}
//                             />
//                         </View>
//                     </ModalV2.Body>
//                 </ModalV2.Content>
//             </ModalV2>
//         </React.Fragment>
//     );
// };

// const styles = StyleSheet.create({
//     modalView: {
//         height: Dimensions.get('window').height,
//         width: Dimensions.get('window').width,
//     },
// });

// export default AsyncImage;
