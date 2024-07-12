// // react native
// import React from 'react';
// import { StyleSheet, View, Pressable } from 'react-native';

// // base/mui component,const,enum
// import ModalV2 from '../ModalV2/Modal';
// import Text from '../Text/Text';
// import Colors from '../theme/colors';

// export type Props = {
//     showAlert: boolean,
//     title?: string,
//     content?: string,
//     children?: JSX.Element | JSX.Element[],
//     LeftBtnTitle?: string,
//     RightBtnTitle?: string,
//     onLeftFooterBtn?: () => void,
//     onRightFooterBtn?: () => void,
//     onClose: () => void,
//     onRequestClose?: () => void
//     size?: 'full' | 'xl' | 'lg' | 'sm' | 'xs',
//     alignItem?: 'flex-end' | 'center' | 'flex-start',
// };

// const Alert: React.FC<Props> = (props: Props) =>
// {
//     const ModalV2Element = (): JSX.Element =>
//     {
//         const _onRequestClose = () =>
//         {
//             if (typeof props?.onRequestClose === 'function')
//             {
//                 props?.onRequestClose();
//             }
//         };

//         return (
//             <ModalV2
//                 size={props.size ?? 'lg'}
//                 isOpen={props.showAlert}
//                 onRequestClose={_onRequestClose}
//                 onClose={() => props.onClose()}
//             >
//                 <ModalV2.Content>
//                     <ModalV2.Body>
//                         <View style={[styles.modalContainer,
//                             props.alignItem
//                                 ? { alignItems: props.alignItem }
//                                 : { alignItems: 'center' },
//                             { backgroundColor: Colors.Surface }]}
//                         >
//                             {props.title && (
//                                 <View style={{ marginBottom: 5, marginTop: 8 }}>
//                                     <Text
//                                         title={props.title}
//                                         colorScheme={'OnSurface'}
//                                         size={'xl'}
//                                         fontFamily="Nunito-Bold"

//                                     />
//                                 </View>
//                             )}
//                             {props.content !== undefined && (
//                                 <Text
//                                     title={props.content}
//                                     colorScheme={'OnSurface'}
//                                     size={'xl'}
//                                     textAlign="center"
//                                 />
//                             )}
//                             {props.children !== undefined && props.children}
//                         </View>
//                     </ModalV2.Body>
//                     {props.LeftBtnTitle !== undefined &&
//                         props.RightBtnTitle !== undefined &&
//                         props.onLeftFooterBtn !== undefined &&
//                         props.onRightFooterBtn !== undefined && (
//                         <ModalV2.Footer>

//                             <View style={[styles.footer, { backgroundColor: Colors.Surface, 'borderColor': Colors.SurfaceVariants }]}>
//                                 <Pressable
//                                     style={{
//                                         borderRightWidth: 1,
//                                         padding: 10,
//                                         borderColor: Colors.SurfaceVariants,
//                                         width: '50%',
//                                         justifyContent: 'center',
//                                         alignItems: 'center',
//                                     }}
//                                     onPress={() =>
//                                     {
//                                         props.onLeftFooterBtn && props.onLeftFooterBtn();
//                                     }
//                                     }
//                                 >
//                                     <Text
//                                         title={props.LeftBtnTitle}
//                                         colorScheme={'#007AFF'}
//                                         size={'xl'}
//                                     />
//                                 </Pressable>
//                                 <Pressable
//                                     style={{ padding: 10, width: '50%', justifyContent: 'center', alignItems: 'center' }}
//                                     onPress={() =>
//                                     {
//                                         props.onRightFooterBtn && props.onRightFooterBtn();
//                                     }}
//                                 >
//                                     <Text
//                                         title={props.RightBtnTitle}
//                                         colorScheme={'#007AFF'}
//                                         size={'xl'}
//                                         fontFamily="Nunito-Bold"
//                                     />
//                                 </Pressable>
//                             </View>
//                         </ModalV2.Footer>
//                     )}

//                 </ModalV2.Content>
//             </ModalV2>
//         );
//     };


//     return (
//         <ModalV2Element />
//     );
// };

// const styles = StyleSheet.create({
//     footer: {
//         alignItems: 'center',
//         borderTopWidth: 1,
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         marginTop: -1,
//     },

//     modalContainer: {
//         justifyContent: 'center',
//         paddingHorizontal: 10,
//         paddingVertical: 10,
//         width: '100%',
//     },
// });

// export default Alert;
