// /* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable react-native/no-inline-styles */
// import BottomSheet, { BottomSheetFlatList, BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView, useBottomSheetModal } from '@gorhom/bottom-sheet';
// import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
// import PropTypes from 'prop-types';
// import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
// import { ActivityIndicator, BackHandler, Dimensions, ListRenderItem, Platform, RefreshControlProps, StyleSheet, View } from 'react-native';
// import { Shadow } from 'react-native-shadow-2';
// import { Input } from '../Input/Input';
// import Text from '../Text/Text';
// import storage from '../storage/mmkv';
// import BottomSheetBackdrop from './BottomSheetBackdrop';
// import BottomSheetBackground from './BottomSheetBackground';
// import { useBottomSheetBackHandler } from './useBottomSheetBackHandler';

// export type FlatListProps = {
//     data: readonly any[] | null | undefined;
//     refreshControl?: React.ReactElement<RefreshControlProps, string | React.JSXElementConstructor<any>> | undefined;
//     ListFooterComponent?: React.ComponentType<any>
//         | React.ReactElement<any, string
//         | React.JSXElementConstructor<any>>
//         | null
//         | undefined;
//     onEndReached?: () => void;
//     renderItem: ListRenderItem<any> | null | undefined;
//     loading?: boolean;
//     inputSearch?: boolean;
//     handleSearch?: (_value: string) => void;
//     initialNumToRender?: number
// }

// export type Props = {
//     closeAble?: boolean
//     hideCloseLine?: boolean
//     renderHeaderButton?: React.ComponentType<any> | React.ReactElement | null | undefined;
//     renderContent?: React.ComponentType<any> | React.ReactElement | null | undefined;
//     snapPoints?: ReadonlyArray<string | number> | undefined;
//     handleSheetChange?: (_index: number) => void;
//     handleSheetLevel?: number;
//     handleOpenBottomSheetModal?: (_bottomSheetModalRef: React.RefObject<BottomSheetModalMethods>) => void;
//     indexTab?: number;
//     onScrollToBottom?: () => void;
//     noBackground?: boolean;
//     onDissmiss?: () => void;
//     onAnimated?: (_from: any, _to: any) => void;
//     type?: 'flatList' | 'view' | string;
//     data?: FlatListProps;
//     contentBackgroundColor?: string,
//     title?: string,
//     textPlaceholderSearch?: string,
// };

// const BottomSheets: React.FC<Props> = ({
//     closeAble,
//     hideCloseLine,
//     renderHeaderButton,
//     renderContent,
//     snapPoints,
//     handleSheetChange,
//     handleSheetLevel,
//     handleOpenBottomSheetModal,
//     indexTab,
//     onScrollToBottom,
//     noBackground,
//     onDissmiss,
//     onAnimated,
//     type,
//     data,
//     contentBackgroundColor,
//     title,
//     textPlaceholderSearch,
// }) =>
// {
//     // ref
//     const bottomSheetModalRef = useRef<BottomSheetModal>(null);
//     const { handleSheetPositionChange } = useBottomSheetBackHandler(bottomSheetModalRef);

//     // variables
//     const snapPointsDefault = useMemo(() => ['35%', '50%', '100%'], []);
//     const snapPointsModalDefaul = useMemo(() => ['25%'], []);
//     const [ toIndexSt, setToIndexSt ] = useState<number>();
//     const [textSearch, setTextSearch] = useState('');
//     const { height } = Dimensions.get('window');

//     const _snapPoints = useMemo(() =>
//     {
//         if (snapPoints)
//         {
//             const mutableSnapPoints = [...snapPoints];
      
//             if (typeof mutableSnapPoints[0] === 'number')
//             {
//                 mutableSnapPoints[0] += 22; // Cộng thêm 10 cho giá trị số đầu tiên
//             }
//             else if (typeof mutableSnapPoints[0] === 'string' && mutableSnapPoints[0].endsWith('%'))
//             {
//                 // Xử lý nếu giá trị đầu tiên là %
//                 const numericValue = parseFloat(mutableSnapPoints[0]); // Lấy giá trị số từ chuỗi %
//                 const pixelValue = (numericValue * height) / 100; // Chuyển đổi % sang px
//                 const newValue = pixelValue + 22; // Cộng thêm 10px
      
//                 mutableSnapPoints[0] = newValue; // Gán giá trị mới vào mảng
//             }
//             return mutableSnapPoints;
//         }
//         else
//         {
//             return snapPointsDefault;
//         }
//     }, [snapPoints]);

//     const snapPointsModal = useMemo(() =>
//     {
//         if (snapPoints)
//         {
//             const mutableSnapPoints = [...snapPoints];
      
//             if (typeof mutableSnapPoints[0] === 'number')
//             {
//                 mutableSnapPoints[0] += 22; // Cộng thêm 10 cho giá trị số đầu tiên
//             }
//             else if (typeof mutableSnapPoints[0] === 'string' && mutableSnapPoints[0].endsWith('%'))
//             {
//                 // Xử lý nếu giá trị đầu tiên là %
//                 const numericValue = parseFloat(mutableSnapPoints[0]); // Lấy giá trị số từ chuỗi %
//                 const pixelValue = (numericValue * height) / 100; // Chuyển đổi % sang px
//                 const newValue = pixelValue + 22; // Cộng thêm 10px
      
//                 mutableSnapPoints[0] = newValue; // Gán giá trị mới vào mảng
//             }
//             return mutableSnapPoints;
//         }
//         else
//         {
//             return snapPointsModalDefaul;
//         }
//     }, [snapPoints]);

//     // callbacks
//     const _handleSheetChange = useCallback((index: number) =>
//     {
//         if (handleSheetChange)
//         {
//             handleSheetChange(index);
//         }
//     }, []);


//     useEffect(() =>
//     {
//         if (handleOpenBottomSheetModal)
//         {
//             handleOpenBottomSheetModal(bottomSheetModalRef);
//         }
//     }, [closeAble, handleOpenBottomSheetModal]);

//     const handleSheetChangesModal = useCallback((fromIndex: number, toIndex: number) =>
//     {
//         setToIndexSt(toIndex);
//         onAnimated && onAnimated(fromIndex, toIndex);
//     }, []);

//     const renderBackdrop = useCallback(props => (
//         <BottomSheetBackdrop
//             {...props}
//             opacity={0.6}
//             disappearsOnIndex={-1}
//             appearsOnIndex={0}
//             pressBehavior="close"
//         />
//     ), []);

//     const renderBackgroundComponent = () => (
//         <BottomSheetBackground
//             contentBackgroundColor={contentBackgroundColor}
//             noBackground={noBackground}
//             isRadius={handleSheetLevel !== (snapPoints ? snapPoints.length - 1 : 2)}
//             toIndexSt={toIndexSt}
//         />
//     );

//     const shadowRadius = useMemo(() =>
//     {
//         if (handleSheetLevel !== (snapPoints ? snapPoints.length - 1 : 2))
//         {
//             return 16;
//         }
//         else
//         {
//             return 0;
//         }
//     }, [handleSheetLevel, snapPoints]);

//     const close = () =>
//     {
//         if (bottomSheetModalRef.current)
//         {
//             bottomSheetModalRef.current.dismiss();
//         }
//     };

//     const snapToIndex = (index: number) =>
//     {
//         if (bottomSheetModalRef.current)
//         {
//             bottomSheetModalRef.current.snapToIndex(index);
//         }
//     };

//     const ShadowComponent = (): JSX.Element =>
//     {
//         return (
//             <Shadow
//                 sides={['top']}
//                 corners={['topLeft', 'topRight']}
//                 radius={shadowRadius}
//                 viewStyle={{ width: '100%' }}
//             >

//                 <View style={styles.closeLineContainer}>
//                     { hideCloseLine
//                         ? (<View style={styles.noCloseLine} />)
//                         : (<View style={styles.closeLine} />) }
//                 </View>
//             </Shadow>
//         );
//     };

//     const _renderHeader = () =>
//     {
//         if (renderHeaderButton)
//         {
//             return renderHeaderButton;
//         }
//     };

//     const _renderContent = () =>
//     {
//         if (renderContent)
//         {
//             return renderContent;
//         }
//     };

//     const renderFlatListComponent = () =>
//     {
//         if (closeAble)
//         {
//             return (
//                 <BottomSheetModalProvider>
//                     <BottomSheetModal
//                         ref={bottomSheetModalRef}
//                         index={0}
//                         snapPoints={snapPointsModal}
//                         backgroundComponent={() => renderBackgroundComponent()}
//                         backdropComponent={renderBackdrop}
//                         handleComponent={() => (
//                             <View
//                                 style={{ ...styles.closeLineContainer }}
//                                 onTouchStart={()=> onAnimated && storage.set('isBottomSheetClose', true)}
//                             >
//                                 <View style={styles.closeLine} />
//                             </View>
//                         )}
//                         enablePanDownToClose
//                         onAnimate={handleSheetChangesModal}
//                         onDismiss={onDissmiss}
//                         onChange={handleSheetPositionChange}
//                     >
                                              
//                         <View style={{ marginHorizontal: 10 }}>
//                             {title && (
//                                 <View style={{
//                                     marginBottom: 10,
//                                 }}
//                                 >
//                                     <Text
//                                         title={title}
//                                         colorScheme={'#929DA8'}
//                                         size={14}
//                                         fontFamily="Nunito-bold"
//                                     />
//                                 </View>
//                             )}
                                                    
//                             {data?.inputSearch && (
//                                 <View style={styles.inputSearch}>
//                                     <Input
//                                         placeholder={textPlaceholderSearch ? textPlaceholderSearch : 'Enter keyword to search'}
//                                         value={textSearch}
//                                         rightBtn={{
//                                             icon: 'search',
//                                             onPress: () =>
//                                             {
//                                                 data.handleSearch && data.handleSearch(textSearch);
//                                             },
//                                             iconColor: 'gray',
//                                         }}
//                                         onChangeText={(value: string) => setTextSearch(value)}
//                                         onFocus={() => snapToIndex(snapPoints ? snapPoints.length + 1 : 0)}
//                                     />
//                                 </View>
                                                      
//                             )}
//                             {_renderHeader()}
//                         </View>

//                         {_renderContent()}

//                         {data?.loading
//                             ? (
//                                     <ActivityIndicator
//                                         size="small"
//                                         color="#939393"
//                                     />
//                                 )
//                             : (
//                                     <BottomSheetFlatList
//                                         data={data?.data}
//                                         keyExtractor={(item, index) => index.toString()}
//                                         renderItem={data?.renderItem}
//                                         showsVerticalScrollIndicator={false}
//                                         ListEmptyComponent={() => (
//                                             <Text
//                                                 title="Data Empty"
//                                                 textAlign="center"
//                                             />
//                                         )}
//                                         ListFooterComponent={data?.ListFooterComponent}
//                                         keyboardShouldPersistTaps="always"
//                                         keyboardDismissMode="interactive"
//                                         initialNumToRender={data?.initialNumToRender ? data?.initialNumToRender : 1000}
//                                         onEndReachedThreshold={0.5}
//                                         onEndReached={() =>
//                                         {
//                                             data?.onEndReached && data?.onEndReached();
//                                         }}
//                                     />
//                                 )
//                         }
//                     </BottomSheetModal>
//                 </BottomSheetModalProvider>
//             );
//         }
//         else
//         {
//             <BottomSheet
//                 ref={bottomSheetModalRef}
//                 index={indexTab !== undefined ? indexTab : 0}
//                 snapPoints={_snapPoints}
//                 style={Platform.OS === 'ios' ? styles.bottomSheetShadowIos : styles.bottomSheetShadowAndroid}
//                 backgroundComponent={() => renderBackgroundComponent()}
//                 handleComponent={() => <ShadowComponent />}
//                 enablePanDownToClose
//                 onChange={(index) =>
//                 {
//                     handleSheetPositionChange(index);
//                     _handleSheetChange(index);
//                 }}
//             >
//                 <View style={{ marginHorizontal: 10 }}>
//                     {data?.inputSearch && (
//                         <Input
//                             placeholder={'Enter keyword to search'}
//                             value={textSearch}
//                             rightBtn={{
//                                 icon: 'search',
//                                 onPress: () =>
//                                 {
//                                     data.handleSearch && data.handleSearch(textSearch);
//                                 },
//                                 iconColor: 'gray',
//                             }}
//                             onChangeText={(value: string) => setTextSearch(value)}
//                             onFocus={() => snapToIndex(snapPoints ? snapPoints.length + 1 : 0)}
//                         />
//                     )}
//                     {_renderHeader()}
//                 </View>
//                 {_renderContent()}
//                 {data?.loading
//                     ? (
//                             <ActivityIndicator
//                                 size="small"
//                                 color="#939393"
//                             />
//                         )
//                     : (
//                             <BottomSheetFlatList
//                                 data={data?.data}
//                                 keyExtractor={(item, index) => index.toString()}
//                                 renderItem={data?.renderItem}
//                                 showsVerticalScrollIndicator={false}
//                                 ListEmptyComponent={() => (
//                                     <Text
//                                         title="Data Empty"
//                                         textAlign="center"
//                                     />
//                                 )}
//                                 ListFooterComponent={data?.ListFooterComponent}
//                                 keyboardShouldPersistTaps="always"
//                                 keyboardDismissMode="interactive"
//                                 initialNumToRender={data?.initialNumToRender ? data?.initialNumToRender : 1000}
//                                 onEndReachedThreshold={0.5}
//                                 onEndReached={() =>
//                                 {
//                                     data?.onEndReached && data?.onEndReached();
//                                 }}
//                             />
//                         )
//                 }
//             </BottomSheet>;
//         }
//     };

//     const renderBottomSheet = () =>
//     {
//         if (!closeAble && noBackground)
//         {
//             return (
//                 <BottomSheet
//                     ref={bottomSheetModalRef}
//                     index={indexTab !== undefined ? indexTab : 0}
//                     snapPoints={_snapPoints}
//                     style={Platform.OS === 'ios' ? styles.bottomSheetShadowIos : styles.bottomSheetShadowAndroid}
//                     backgroundComponent={() => renderBackgroundComponent()}
//                     handleComponent={() => <ShadowComponent />}
//                     // enablePanDownToClose
//                     onChange={(index) =>
//                     {
//                         handleSheetPositionChange(index);
//                         _handleSheetChange(index);
//                     }}
//                 >
//                     {_renderHeader()}
//                     {_renderContent()}
//                 </BottomSheet>
//             );
//         }
//         else
//         {
//             if (!closeAble)
//             {
//                 return (
//                     <BottomSheet
//                         ref={bottomSheetModalRef}
//                         index={indexTab !== undefined ? indexTab : 0}
//                         snapPoints={_snapPoints}
//                         style={Platform.OS === 'ios' ? styles.bottomSheetShadowIos : styles.bottomSheetShadowAndroid}
//                         backgroundComponent={() => renderBackgroundComponent()}
//                         handleComponent={() => <ShadowComponent />}
//                         // enablePanDownToClose
//                         onChange={(index) =>
//                         {
//                             handleSheetPositionChange(index);
//                             _handleSheetChange(index);
//                         }}
//                     >
//                         {_renderHeader()}
//                         <BottomSheetScrollView
//                             showsVerticalScrollIndicator ={false}
//                             showsHorizontalScrollIndicator={false}
//                             onScrollEndDrag={onScrollToBottom}
//                         >
//                             {_renderContent()}
//                         </BottomSheetScrollView>
//                     </BottomSheet>
//                 );
//             }
//             else
//             {
//                 if (noBackground === undefined || noBackground === false)
//                 {
//                     return (
//                         <BottomSheetModalProvider>
//                             <BottomSheetModal
//                                 ref={bottomSheetModalRef}
//                                 index={0}
//                                 snapPoints={snapPointsModal}
//                                 backgroundComponent={() => renderBackgroundComponent()}
//                                 backdropComponent={renderBackdrop}
//                                 handleComponent={() => (
//                                     <View
//                                         style={{ ...styles.closeLineContainer }}
//                                         onTouchStart={()=> onAnimated && storage.set('isBottomSheetClose', true)}
//                                     >
//                                         <View style={styles.closeLine} />
//                                     </View>
//                                 )}
//                                 enablePanDownToClose
//                                 onAnimate={handleSheetChangesModal}
//                                 onDismiss={onDissmiss}
//                                 onChange={handleSheetPositionChange}
//                             >
//                                 {title && (
//                                     <View style={{
//                                         marginBottom: 10,
//                                         paddingHorizontal: 20,
//                                     }}
//                                     >
//                                         <Text
//                                             title={title}
//                                             colorScheme={'#929DA8'}
//                                             size={14}
//                                             fontFamily="Nunito-bold"
//                                         />
//                                     </View>
//                                 )}
//                                 {_renderHeader()}
//                                 {_renderContent()}
//                             </BottomSheetModal>
//                         </BottomSheetModalProvider>
//                     );
//                 }
//                 else
//                 {
//                     return (
//                         <BottomSheetModalProvider>
//                             <BottomSheetModal
//                                 ref={bottomSheetModalRef}
//                                 index={0}
//                                 snapPoints={snapPointsModal}
//                                 backgroundComponent={() => renderBackgroundComponent()}
//                                 handleComponent={() => (
//                                     <View style={{ ...styles.closeLineContainer }}>
//                                         <View style={styles.closeLine} />
//                                     </View>
//                                 )}
//                                 enablePanDownToClose
//                                 onAnimate={handleSheetChangesModal}
//                                 onDismiss={onDissmiss}
//                                 onChange={(index) =>
//                                 {
//                                     handleSheetPositionChange(index);
//                                     _handleSheetChange(index);
//                                 }}
//                             >
//                                 {_renderHeader()}

//                                 <BottomSheetScrollView
//                                     showsVerticalScrollIndicator ={false}
//                                     showsHorizontalScrollIndicator={false}
//                                     onScrollEndDrag={onScrollToBottom}
//                                 >
//                                     {_renderContent()}
//                                 </BottomSheetScrollView>
//                             </BottomSheetModal>
//                         </BottomSheetModalProvider>
//                     );
//                 }
//             }
//         }
//     };

//     return (
//         <>
//             {type === 'flatList' ? renderFlatListComponent() : renderBottomSheet()}
//         </>
//     );
// };

// const styles = StyleSheet.create({
//     bottomSheetShadowAndroid: {
//         elevation: 24,
//         'shadowColor': '#000',
//         shadowOffset: { width: 0.5, height: 12 },
//         shadowOpacity: 2.5,
//         shadowRadius: 4,
//     },
//     bottomSheetShadowIos: {
//         'shadowColor': '#000',
//         shadowOffset: {
//             width: 0,
//             height: 0.5,
//         },
//         shadowOpacity: 2.5,
//         shadowRadius: 4,
//     },
//     closeLine: {
//         'backgroundColor': '#DADADA',
//         borderRadius: 3,
//         height: 6,
//         width: 75,
//     },
//     closeLineContainer: {
//         alignItems: 'center',
//         alignSelf: 'center',
//         height: 24,
//         justifyContent: 'center',
//         width: '100%',
//     },
//     inputSearch: {
//         'borderColor': '#E5E9EF',
//         borderRadius: 4,
//         borderWidth: 1,
//     },
//     noCloseLine: {
//         borderRadius: 3,
//         height: 6,
//         width: 75,
//     },
// });

// BottomSheets.propTypes = {
//     closeAble: PropTypes.bool,
//     renderHeaderButton: PropTypes.element,
//     renderContent: PropTypes.element,
//     snapPoints: PropTypes.any,
//     handleSheetChange: PropTypes.func,
//     handleSheetLevel: PropTypes.number,
//     indexTab: PropTypes.number,
//     onScrollToBottom: PropTypes.func,
//     contentBackgroundColor: PropTypes.any,
// };

// export default BottomSheets;
