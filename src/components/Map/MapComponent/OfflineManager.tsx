// import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
// import MapboxGL from '@react-native-mapbox-gl/maps';
// import Colors from '../../theme/colors';
// import { ActivityIndicator, Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
// import { ProgressBar } from '../../ProgressBar/ProgressBar';

// import MapActionButtons from './MapActionButtons';
// import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
// import Toast from '../../Toast/Toast';
// import BottomSheet from '../../BottomSheet/BottomSheet';
// import Text from '../../Text/Text';
// import Button from '../../Button/Button';
// import Alert from '../../Alert/Alert';
// import { Input } from '../../Input/Input';
// import storage from '../../../components/storage/mmkv';

// interface Props {
//     onSelect: (value: any) => void;
//     currentType: string;
//     mapRef: MapboxGL.MapView;
//     onDissmiss?: () => void;
//     setSheetRef: (ref: any) => void;
//     reload?: boolean;
//     progress?: number;
//     onChooseAreaToSave?: () => void;
//     onCancelOrSaveAreaByHand?: () => void;
//     onDowloadingMap?: (x: number) => void;
//     onRefuseDowloadMap?: () => void;
//     onDeletePack?: () => void;
//     onVisibility?: (_visibility) => void
// }

// const OfflineManager: React.FC<Props> = (props) =>
// {
//     const [bottom, setBottom] = useState<any>();
//     const height_75_Per = Dimensions.get('window').height * 1 - Dimensions.get('window').height / 2.7;
//     const [offlineRegion, setOfflineRegion] = useState<MapboxGL.OfflinePack>({} as MapboxGL.OfflinePack);
//     // const [offlineRegionStatus,setOfflineRegionStatus] = useState<MapboxGL.OfflineProgressStatus>();
//     const [warnVisibility, setWarnVisibility] = useState<any>();
//     const [offlinePacks, setOfflineList] = React.useState<any>([]);
//     const [download, setDownload] = useState<boolean>(false);
//     // const [isButtonSheetClose, setIsButtonSheetClose] = useState(false);
//     const [namePackageInstall, setNamePackageInstall] = useState('');

//     const downloadOfflinePacks = async (txtName: string) =>
//     {
//         const bounds: any = await props.mapRef?.getVisibleBounds();
//         const zoom = await props.mapRef?.getZoom();

//         MapboxGL.offlineManager
//             .createPack(
//                 {
//                     name: (txtName !== '' ? txtName : 'OfflineMap') + ' ' + ((offlinePacks?.length ?? 0) + 1) + '_' + props.currentType,
//                     styleURL: `https://thanhdzaz.github.io/j-server/${props.currentType}.json`,
//                     minZoom: zoom >= 25 ? 24 : zoom,
//                     maxZoom: zoom >= 20 ? 25 : 20,
//                     bounds: [bounds[0], bounds[1]],
//                 },
//                 onDownloadProgress,
//                 errorListener,
//             )
//             .then(async () =>
//             {
//                 const packages = await MapboxGL.offlineManager.getPacks();
//                 setOfflineList(packages.reverse());
//                 setWarnVisibility(false);
//             })
//             .catch((err) => console.error(err));
//     };

//     const errorListener = (offlinePack: any, err: any) =>
//     {
//         setDownload(false);

//         MapboxGL.offlineManager.unsubscribe(offlinePack?._metadata?.name);
//     };

//     const onDownloadProgress = (_offlineRegion: MapboxGL.OfflinePack, _offlineRegionStatus: MapboxGL.OfflineProgressStatus) =>
//     {
//         if (storage.getBoolean('isBottomSheetClose') === false)
//         {
//             props.onDowloadingMap && props.onDowloadingMap(_offlineRegionStatus.percentage);
//             setOfflineRegion(_offlineRegion);
//             setNamePackageInstall(_offlineRegion.name);
//         }

//         _offlineRegionStatus.percentage === 100 && setDownload(false);
//     };

//     useEffect(() =>
//     {
//         props.onVisibility && props.onVisibility(warnVisibility);
//     }, [warnVisibility]);

//     useEffect(() =>
//     {
//         if (props.reload)
//         {
//             getMapboxGLPack();
//         }
//     }, [props.reload]);

//     useEffect(() =>
//     {
//         getMapboxGLPack();
//     }, []);

//     const getMapboxGLPack = async () =>
//     {
//         const packages = await MapboxGL.offlineManager.getPacks();
//         setOfflineList(packages.reverse());
//     };

//     const deletePacks = async (namePack: string) =>
//     {
//         await setDeleting(true);
//         await MapboxGL.offlineManager
//             .deletePack(namePack)
//             .then(async (_e) =>
//             {
//                 Toast.show({ title: 'map', message: 'Deleted version offline', visibilityTime: 2500 });
//                 const packages = await MapboxGL.offlineManager.getPacks();
//                 setOfflineList(packages.reverse());
//                 props.onDeletePack && props.onDeletePack();
//                 setDeleting(false);
//             })
//             .catch((err) =>
//             {
//                 Toast.show({ title: 'map', message: 'Deleted version offline failed', visibilityTime: 2500 });
//                 setDeleting(false);
//                 console.error(err);
//             });
//     };

//     const clearAll = async () =>
//     {
//         await offlinePacks.map((e: any, i: any) =>
//         {
//             deletePacks(e?.metadata?.name);
//         });
//     };

//     const [deleting, setDeleting] = useState(false);
//     const [showEnterName, setShowEnterName] = useState(false);
//     return (
//         <React.Fragment>
//             <BottomSheet
//                 handleOpenBottomSheetModal={(ref: any) =>
//                 {
//                     setBottom(ref);
//                     props.setSheetRef(ref);
//                 }}
//                 snapPoints={[height_75_Per]}
//                 indexTab={1}
//                 renderContent={(
//                     <View>
//                         <View style={{ minHeight: height_75_Per - 55 }}>
//                             {deleting && (
//                                 <View style={{ position: 'absolute', top: 0, width: Dimensions.get('window').width }}>
//                                     <ActivityIndicator
//                                         size="large"
//                                         color="#FFD700"
//                                     />
//                                 </View>
//                             )}
//                             <BottomSheetScrollView
//                                 contentContainerStyle={{ padding: 10 }}
//                                 onTouchStart={() => storage.set('isBottomSheetClose', true)}
//                             >
//                                 {offlinePacks?.length > 0 &&
//                                     offlinePacks.map((e: any, i) => (
//                                         <TouchableOpacity
//                                             key={i}
//                                             style={{
//                                                 display: 'flex',
//                                                 flexDirection: 'row',
//                                                 justifyContent: 'space-between',
//                                                 paddingVertical: 15,
//                                             }}
//                                             onPress={async () =>
//                                             {
//                                                 await bottom.current.close();
//                                                 props.onSelect(e);
//                                             }}
//                                         >
//                                             <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//                                                 <Text
//                                                     key={i}
//                                                     title={e?.metadata?.name}
//                                                 />
//                                             </View>
//                                             <View onTouchStart={(e) => e.preventDefault()}>
//                                                 <TouchableOpacity
//                                                     style={{
//                                                         backgroundColor: Colors.PrimaryVariantsLight,
//                                                         paddingHorizontal: 15,
//                                                         paddingVertical: 3,
//                                                         display: download ? 'none' : 'flex',
//                                                     }}
//                                                     onPress={async () =>
//                                                     {
//                                                         await deletePacks(e?.metadata?.name ?? '');
//                                                     }}
//                                                 >
//                                                     <Text title="Remove" />
//                                                 </TouchableOpacity>
//                                             </View>
//                                         </TouchableOpacity>
//                                     ))}
//                             </BottomSheetScrollView>
//                         </View>
//                         {download
//                             ? (
//                                     <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
//                                         <TouchableOpacity
//                                             style={{ width: '85%' }}
//                                             onPress={() =>
//                                             {
//                                                 offlineRegion.pause();
//                                             }}
//                                         >
//                                             <ProgressBar
//                                                 max={100}
//                                                 current={props.progress !== undefined && props.progress !== 100 ? props.progress : 0}
//                                                 color={Colors.PrimaryLight}
//                                                 percentage
//                                             />
//                                         </TouchableOpacity>

//                                         <TouchableOpacity
//                                             style={{
//                                                 backgroundColor: Colors.PrimaryLight,
//                                                 borderColor: Colors.PrimaryLight,
//                                                 width: 38,
//                                                 height: 38,
//                                                 borderRadius: 10,
//                                                 justifyContent: 'center',
//                                                 alignItems: 'center',
//                                             }}
//                                             onPress={async () =>
//                                             {
//                                                 await deletePacks(namePackageInstall).then(() => setDownload(false));
//                                             }}
//                                         >
//                                             <Text
//                                                 title="x"
//                                                 size={'lg'}
//                                                 colorScheme={'white'}
//                                             />
//                                         </TouchableOpacity>
//                                     </View>
//                                 )
//                             : (
//                         // <Text
//                         //     title='dowloading ...'
//                         //     size={'lg'}
//                         //     width={'100%'}
//                         //     paddingTop={10}
//                         //     paddingBottom={10}
//                         //     textAlign={'center'}
//                         //     colorScheme={Colors.OnSurface}
//                         // />

//                                     <View style={{ paddingHorizontal: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>

//                                         <Button
//                                             title="add new"
//                                             btnColor="primary"
//                                             bdRadiusType="full"
//                                             width={'47%'}
//                                             onPress={() =>
//                                             {
//                                                 setWarnVisibility(true);
//                                                 props.onChooseAreaToSave !== undefined && props.onChooseAreaToSave();
//                                                 bottom.current.close();
//                                             }}
//                                         />

//                                         <Button
//                                             title="Clear all"
//                                             btnColor="primary"
//                                             bdRadiusType="full"
//                                             width={'47%'}
//                                             onPress={() =>
//                                             {
//                                                 clearAll();
//                                             }}
//                                         />
//                                     </View>
//                                 )}
//                     </View>
//                 )}
//                 closeAble
//                 // noBackground
//                 onAnimated={(from: any, to: any) =>
//                 {
//                     if (to === 0)
//                     {
//                         storage.set('isBottomSheetClose', true);
//                     }
//                     else
//                     {
//                         storage.set('isBottomSheetClose', false);
//                     }
//                 }}
//                 onDissmiss={() =>
//                 {
//                     props.onDissmiss !== undefined && props.onDissmiss();
//                 }}
//             />

//             {warnVisibility && (
//                 <React.Fragment>
//                     <View style={styles.overlay}>
//                         <Text
//                             title="Move the map to the area to save"
//                             colorScheme={'Background'}
//                             size={'2xl'}
//                             textAlign="center"
//                         />
//                     </View>
//                     <MapActionButtons
//                         onOk={() =>
//                         {
//                             setShowEnterName(true);
//                         }}
//                         onCancel={() =>
//                         {
//                             props.onCancelOrSaveAreaByHand !== undefined && props.onCancelOrSaveAreaByHand();
//                             setWarnVisibility(false);
//                             props.onRefuseDowloadMap && props.onRefuseDowloadMap();
//                         }}
//                     />
//                 </React.Fragment>
//             )}
//             <Alert
//                 title={'Set name'}
//                 showAlert={showEnterName}
//                 size="full"
//                 alignItem="flex-start"
//                 onClose={() => setShowEnterName(false)}
//             >
//                 <TxtInput
//                     onAvoid={()=>
//                     {

//                         setShowEnterName(false);
//                         props.onCancelOrSaveAreaByHand !== undefined &&
//                             props.onCancelOrSaveAreaByHand();

//                         bottom.current.present();
//                         setDownload(true);
//                         downloadOfflinePacks('');


//                     }}
//                     onAccept={(txt)=>
//                     {


//                         setShowEnterName(false);
//                         props.onCancelOrSaveAreaByHand !== undefined &&
//                             props.onCancelOrSaveAreaByHand();

//                         bottom.current.present();
//                         setDownload(true);
//                         downloadOfflinePacks(txt);


//                     }}
//                 />
//             </Alert>
//         </React.Fragment>
//     );
// };

// const TxtInput = ({ onAvoid, onAccept }): JSX.Element =>
// {
//     const [txtName, setTxtName] = useState('');

//     return (
//         <View style={{ width: '100%', paddingVertical: 10 }}>
//             <Input
//                 value={txtName}
//                 placeholder="Enter package name"
//                 onChangeText={(value)=>setTxtName(value)}
//             />
//             <View style = {{ width: '100%', flexDirection: 'row',justifyContent: 'space-between', top: 10 }}>
//                 <Button
//                     title="Avoid"
//                     btnColor="error"
//                     bdRadiusType="full"
//                     width={'47%'}
//                     onPress={() =>
//                     {
//                         onAvoid();
//                     }}
//                 />
//                 <Button
//                     title="Accept"
//                     btnColor="primary"
//                     bdRadiusType="full"
//                     width={'47%'}
//                     onPress={() =>
//                     {
//                         onAccept(txtName);
//                     }}
//                 />
//             </View>
//         </View>
//     );
// };

// const black = 'rgba(0, 0, 0,0.4)';
// const styles = StyleSheet.create({
//     overlay: {
//         alignItems: 'center',
//         backgroundColor: black,
//         borderRadius: 10,
//         display: 'flex',
//         justifyContent: 'center',
//         left: Dimensions.get('window').width * 0.2,
//         maxWidth: Dimensions.get('window').width * 0.6,
//         paddingHorizontal: 5,
//         paddingVertical: 5,
//         position: 'absolute',
//         top: (Dimensions.get('window').height / 100) * 15,
//     },
// });

// OfflineManager.propTypes = {
//     onSelect: PropTypes.func.isRequired,
//     currentType: PropTypes.string.isRequired,
//     mapRef: PropTypes.any,
//     setSheetRef: PropTypes.func.isRequired,
// };

// export default OfflineManager;
