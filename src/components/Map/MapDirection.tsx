// /* eslint-disable react/no-unused-prop-types */
// /* eslint-disable react-native/no-inline-styles */
// import MapboxGL from '@react-native-mapbox-gl/maps';
// import { lineString as makeLineString, point } from '@turf/helpers';
// import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
// import token from './accessToken.json';
// import Colors from '../theme/colors';
// import {
//     StyleSheet,
//     View,
//     TouchableHighlight,
//     FlatList,
//     Pressable,
//     Dimensions,
//     TouchableOpacity,
//     KeyboardAvoidingView,
//     TextInput,
//     ScrollView,
//     Keyboard,
//     NativeSyntheticEvent,
//     TextInputChangeEventData,
//     ActivityIndicator,
// } from 'react-native';
// import Map from './';
// import { CommonHelper } from '../../helper/common.helper';
// import { DirectionService } from '../../services/direction.service';
// import Toast from '../Toast/Toast';
// import CardView from '../CardView/Item';
// import SvgIcon from '../SvgIcon/SvgIcon';
// import BottomSheet from '../BottomSheet/BottomSheet';
// import Text from '../Text/Text';
// import ModalV2 from '../ModalV2/Modal';
// import { Shadow } from 'react-native-shadow-2';
// import FAIcon from '../FAIcon/FAIcon';
// import { useTranslation } from 'react-i18next';
// import Loading from '../Loading/Loading';
// import Geolocation from 'react-native-geolocation-service';

// const accessToken = token.token;
// MapboxGL.setAccessToken(accessToken);

// interface Props
// {
//     isConnected?: boolean;
//     start: number[],
//     end: number[],
//     useCustomLocation: boolean,
//     defaultLocation?: number[],
//     zoomLevel?: number,
//     addressInput: string,
//     locationSearchFunction: (_value, _skip, _take, _lat, _long, _lx, _ly, _rx, _ry) => Promise<any>,
//     overrideParams?: Record<string, string | number>
// }

// const width = Dimensions.get('window').width;
// const height_50_padding = Dimensions.get('window').height * 0.35;

// function useForceUpdate ()
// {
//     const [value, setValue] = useState(0); // integer state
//     value;
//     return () => setValue(values => values + 1); // update the state to force render
// }

// const Directions: React.FC<Props> = (props: Props): JSX.Element =>
// {

//     const scroll = React.createRef<FlatList>();
//     const directionService = new DirectionService();

//     const [_mapRef, setMapRef] = useState<any>();
//     const [_cameraRef, setCameraRef] = useState<any>();

//     // core state
//     const [route, setRoute] = useState<any>(null);
//     const [typeVeh, setTypeVeh] = useState<number>(3);
//     const [crit, setCrit] = useState<number>(0);
//     const [preX, setPreX] = useState<number>(0);
//     const [requestText, setRequestText] = useState<string[]>(['My location', '']);
//     const [address, setAddress] = useState<string[]>(['', '']);
//     const [data, setData] = useState<any[]>([]);
//     const [routePoints, setRoutePoints] = useState<number[][]>([]);
//     const [arrow, setArrow] = useState<any[]>([]);
//     const [indice, setIndice] = useState<number>(0);

//     const snapPoints = useMemo(() => [110, '100%'], []);
//     const [bottomSheetRefs, setBottomSheetRefs] = useState<any>();
//     const [handleSheetLevel, handleSheetChange] = useState<number>(0);
//     const [enableTracking, setEnableTracking] = useState<boolean>(false);
//     const [showTime, setShowTime] = useState<boolean>(false);
//     const [sectionData, setSectionsData] = useState<any[]>([]);
//     const [mode, setMode] = useState<string>('direct');
//     const [modalVisible, setModalVisible] = useState<boolean>(false);
//     const [visible, setVisible] = useState(false);
//     const [dataTextInput, setDataTextInput] = useState<any>([]);
//     const [routeTextInput, setRouteTextInput] = useState<number[][]>([[], []]);
//     const [coord, setCoord] = useState<any>({});
//     const [loadingReRoute, setLoadingReRoute] = useState<boolean>(false);


//     const { t } = useTranslation();

//     useEffect(() =>
//     {
//         if (props.addressInput)
//         {
//             setRequestText(['My location', props.addressInput]);
//         }
//         props.useCustomLocation === true && checkDistance();
//     }, []);

//     useEffect(() =>
//     {
//         let count = 0;
//         routeTextInput.forEach((item: any) =>
//         {
//             if (item.length === 0)
//             {
//                 count++;
//             }
//         });
//         if (count === 0)
//         {
//             setLoadingReRoute(true);
//             setRequestText(requestText);
//             setCrit(crit);
//             setTypeVeh(typeVeh);

//             setTimeout(() =>
//             {
//                 getDirections(routeTextInput);
//             }, 100);
//         }


//     }, [routeTextInput, crit, typeVeh]);

//     useLayoutEffect(() =>
//     {
//         Geolocation.getCurrentPosition(
//             (position: any) =>
//             {
//                 setCoord({ longitude: position?.coords?.longitude, latitude: position?.coords?.latitude });
//                 const routes = routeTextInput?.[0].length > 0
//                     ? routeTextInput
//                     : [[position?.coords?.latitude, position?.coords?.longitude], props.end];
//                 const addr = ['', ''];

//                 setAddress(addr);
//                 setRouteTextInput(routes);
//                 setVisible(false);
//             },
//             (error) =>
//             {
//                 console.error(error);
//             },
//             { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, showLocationDialog: true },
//         );

//     }, []);

//     const checkDistance = (): void =>
//     {
//         const x1 = props.start[1];
//         const y1 = props.start[0];
//         const x2 = props.end[1];
//         const y2 = props.end[0];
//         const distanceFly = CommonHelper.getDistance({ X: x1, Y: y1 }, { X: x2, Y: y2 });

//         if (distanceFly / 1000 < 1600)
//         {

//             getDirections([props.start, props.end]);
//         }
//         else
//         {
//             showToast('The distance between two points out of 1600 km');
//         }
//     };

//     const showToast = (value: string): void =>
//     {
//         Toast.show({
//             type: 'error',
//             title: 'Navigation failed',
//             message: value,
//             visibilityTime: 5000,
//             bottomOffset: 50,
//             position: 'bottom',
//         });
//     };

//     const getDirections = async (coords: number[][]) =>
//     {
//         if (coords.length < 2)
//         {
//             return;
//         }

//         setRoutePoints(coords);
//         let data_direct: any[] = [];

//         await directionService.getRouteAvoidBarrierDebounced(
//             coords,
//             // typeVeh,
//             // crit,
//             // 'barrier_id_test',
//             // 0,
//             // 1,
//         ).then((x) =>
//         {
//             if (!x)
//             {
//                 setMode('notDirect');
//                 showToast('This route was not found');
//                 // showToast(x);
//                 setRoute(null);
//                 setArrow([]);
//                 setShowTime(false);
//                 setRoutePoints([]);
//             }
//             // else if (x === 'Unsupported vehicle type')
//             // {
//             //     setMode('notDirect');
//             //     showToast(x);
//             //     showToast(x);
//             //     setRoute(null);
//             //     setArrow([]);
//             //     setShowTime(false);
//             //     setRoutePoints([]);
//             // }
//             // else if (x === 'No solution found')
//             // {
//             //     setMode('notDirect');
//             //     showToast(x);
//             //     setRoute(null);
//             //     setArrow([]);
//             //     setShowTime(false);
//             //     setRoutePoints([]);
//             // }
//             else
//             {
//                 if (x && x[0] && x[0].Steps)
//                 {
//                     const distances = x[0]?.Via_Distances.map(e => e === 0);
//                     const resultDistances = distances.some(item => item === false);

//                     const durations = x[0]?.Via_Durations.map(e => e === 0);
//                     const resultDurations = durations.some(item => item === false);
//                     if (resultDistances && resultDurations)
//                     {
//                         data_direct = x;
//                         setMode('direct');
//                     }
//                     else
//                     {
//                         showToast('This route was not found');
//                         setMode('notDirect');
//                         setRoute(null);
//                         setArrow([]);
//                         setShowTime(false);
//                         setRoutePoints([]);
//                     }
//                 }
//             }
//             setLoadingReRoute(false);
//         }).catch((err) =>
//         {
//             console.error('getDirections:', err);
//         });

//         if (data_direct && data_direct.length > 0)
//         {
//             const section = requestText.map((te, i) =>
//             {
//                 if (i !== 0)
//                 {
//                     const tmp = Object.assign({}, data_direct[0]);
//                     if (tmp && tmp.Steps !== undefined)
//                     {
//                         const indexOfIndies = tmp.Steps.Indices.indexOf(data_direct[0].Via_Indices[i]);
//                         const indexOfIndiesPre = tmp.Steps.Indices.indexOf(data_direct[0].Via_Indices[i - 1]);

//                         const dataTmp = tmp.Steps.Names.map((_e, index: number) =>
//                         {
//                             return index >= indexOfIndiesPre && index <= (indexOfIndies - 1) && {
//                                 name: _e,
//                                 index,
//                                 duration: tmp.Steps.Durations[index],
//                                 distance: tmp.Steps.Distances[index],
//                                 turn: tmp.Steps.Turns[index],
//                                 indice: tmp.Steps.Indices[index],
//                             };
//                         }).filter(e => e !== false);


//                         return {
//                             title: requestText[i - 1],
//                             address: address[i - 1],
//                             data: dataTmp,
//                         };
//                     }
//                     else
//                     {
//                         return {
//                             title: '',
//                             address: '',
//                             data: {},
//                         };
//                     }
//                 }
//             }).filter(e => e !== undefined);

//             section.push({
//                 title: requestText[requestText.length - 1],
//                 address: address[address.length - 1],
//                 data: [] as any,
//             });

//             const routes = makeLineString(data_direct[0].Geometry) as any;
//             const arrows: any = [];
//             data_direct[0]?.Steps.Indices.map((e: number, index: number) =>
//             {
//                 const step = {
//                     name: data_direct[0]?.Steps?.Names?.[index],
//                     turn: data_direct[0]?.Steps?.Turns?.[index],
//                     start: e,
//                     lng: data_direct[0]?.Geometry?.[e]?.[0],
//                     lat: data_direct[0]?.Geometry?.[e]?.[1],
//                 };

//                 const coordinates = CommonHelper.drawDirectionArrow(data_direct[0].Geometry, step);


//                 arrows.push([makeLineString(coordinates), CommonHelper.drawArrow(coordinates)]);
//             });

//             const arrowTmp = arrows.map((_arrow, index) => ({
//                 ..._arrow,
//                 index,
//             }));
//             setData(data_direct);
//             setRoute(routes);
//             setArrow(arrowTmp);
//             setSectionsData(section);
//             setShowTime(true);
//             setPreX(0);

//             setTimeout(() =>
//             {
//                 const myCoords = data_direct[0]?.Geometry;

//                 if (data_direct[0].Geometry && data_direct[0].Geometry.length > 0)
//                 {
//                     let x0: any, x1: any, y0: any, y1: any;


//                     for (let i = 0; i < myCoords.length; i++)
//                     {
//                         if (x0 == null)
//                         {
//                             x0 = x1 = myCoords[i][0];
//                             y0 = y1 = myCoords[i][1];
//                         }
//                         else
//                         {
//                             if (myCoords[i][0] > x1!)
//                             {
//                                 x1 = myCoords[i][0];
//                             }
//                             if (myCoords[i][0] < x0)
//                             {
//                                 x0 = myCoords[i][0];
//                             }
//                             if (myCoords[i][1] > y1!)
//                             {
//                                 y1 = myCoords[i][1];
//                             }
//                             if (myCoords[i][1] < y0!)
//                             {
//                                 y0 = myCoords[i][1];
//                             }
//                         }
//                     }
//                     const NE2: any[] = [];
//                     const SW2: any[] = [];
//                     NE2.push(x1);
//                     NE2.push(y1);
//                     SW2.push(x0);
//                     SW2.push(y0);

//                     _cameraRef && _cameraRef?.fitBounds(NE2, SW2, [150, 50, 150, 50], 1000);
//                 }
//             }, 1000);
//         }
//     };

//     const flyToDes = async (index: number) =>
//     {
//         _cameraRef?.setCamera({
//             centerCoordinate: arrow?.[index]?.[1].des,
//             animationMode: 'flyTo',
//             animationDuration: 1000,
//             zoomLevel: await _mapRef?.getZoom(),
//         });
//     };


//     const renderView = () =>
//     {
//         return (
//             <>
//                 {
//                     sectionData.map(((section: any, index) => (
//                         <>
//                             <CardView key={index}>
//                                 <View style={{ width: width, height: 'auto', marginBottom: 5, padding: 10, 'backgroundColor': Colors.Background }}>
//                                     <Text
//                                         title={section.title}
//                                         size="lg"
//                                     />
//                                     <Text
//                                         title={section.address}
//                                         colorScheme="OnSurfaceVariants"
//                                         size={'md'}
//                                     />
//                                 </View>
//                             </CardView>
//                             {section.data && section.data.map((_data, i) => (
//                                 <CardItem
//                                     key={i}
//                                     dataItem={_data}
//                                     Geometry={data?.[0].Geometry}
//                                 />
//                             ))}
//                         </>
//                     )))
//                 }
//             </>
//         );
//     };

//     const renderHeader = () =>
//     {
//         return (
//             <View style={styles.header}>
//                 <View>
//                     <Text
//                         size={'4xl'}
//                         title={'Route information'}
//                         fontFamily="Nunito-Bold"
//                     />
//                     <Text
//                         colorScheme={'OnSurfaceVariants'}
//                         title={CommonHelper.getFormatDuration(data[0]?.Via_Durations[routePoints.length - 1]) + ' (' + CommonHelper.getFormatDistance(data[0]?.Via_Distances[routePoints.length - 1]) + ')'}
//                     />
//                 </View>
//                 <View style={{ flexDirection: 'row', paddingVertical: 5 }}>
//                     <TouchableOpacity
//                         style={{
//                             paddingHorizontal: 15,
//                             paddingVertical: 7,
//                             'backgroundColor': '#fff',
//                             'borderColor': Colors.PrimaryLight,
//                             borderWidth: 0.5,
//                             borderRadius: 20,
//                             justifyContent: 'center',
//                         }}
//                         onPress={() =>
//                         {
//                             if (handleSheetLevel === 0)
//                             {
//                                 bottomSheetRefs?.current?.snapToIndex(1);
//                             }
//                             else
//                             {
//                                 bottomSheetRefs?.current?.snapToIndex(0);
//                             }
//                         }}
//                     >
//                         <Text
//                             title={handleSheetLevel === 0 ? 'Steps' : 'Map'}
//                             fontFamily="Nunito-ExtraBold"
//                             colorScheme={Colors.PrimaryLight}
//                             size="xl"
//                             textAlign="center"
//                         />
//                     </TouchableOpacity>
//                     {mode !== 'directing' && (
//                         <TouchableOpacity
//                             style={{
//                                 paddingHorizontal: 30,
//                                 paddingVertical: 7,
//                                 'backgroundColor': '#5C8AEA',
//                                 borderRadius: 20,
//                                 marginLeft: 20,
//                             }}
//                             onPress={() =>
//                             {
//                                 setMode('directing');
//                                 setTimeout(() =>
//                                 {
//                                     _cameraRef?.setCamera({
//                                         centerCoordinate: data[0].Geometry[0],
//                                         zoomLevel: 16,
//                                         padding: {
//                                             paddingBottom: height_50_padding,
//                                         },
//                                         animationDuration: 1000,
//                                         animationMode: 'flyTo',
//                                     });
//                                 }, 1000);
//                             }}
//                         >
//                             <Text
//                                 title="Start"
//                                 fontFamily="Nunito-ExtraBold"
//                                 colorScheme={'#fff'}
//                                 size="xl"
//                                 textAlign="center"
//                             />
//                         </TouchableOpacity>
//                     )}

//                     {mode === 'directing' && (
//                         <TouchableOpacity
//                             style={{
//                                 paddingHorizontal: 30,
//                                 paddingVertical: 7,
//                                 'backgroundColor': 'red',
//                                 borderRadius: 20,
//                                 marginLeft: 20,
//                             }}
//                             onPress={() =>
//                             {
//                                 setMode('direct');
//                                 setTimeout(() =>
//                                 {
//                                     const myCoords = data[0]?.Geometry;

//                                     if (data[0].Geometry && data[0].Geometry.length !== 0)
//                                     {
//                                         let x0: any, x1: any, y0: any, y1: any;


//                                         for (let i = 0; i < myCoords.length; i++)
//                                         {
//                                             if (x0 == null)
//                                             {
//                                                 x0 = x1 = myCoords[i][0];
//                                                 y0 = y1 = myCoords[i][1];
//                                             }
//                                             else
//                                             {
//                                                 if (myCoords[i][0] > x1!)
//                                                 {
//                                                     x1 = myCoords[i][0];
//                                                 }
//                                                 if (myCoords[i][0] < x0)
//                                                 {
//                                                     x0 = myCoords[i][0];
//                                                 }
//                                                 if (myCoords[i][1] > y1!)
//                                                 {
//                                                     y1 = myCoords[i][1];
//                                                 }
//                                                 if (myCoords[i][1] < y0!)
//                                                 {
//                                                     y0 = myCoords[i][1];
//                                                 }
//                                             }
//                                         }
//                                         const NE2: any[] = [];
//                                         const SW2: any[] = [];
//                                         NE2.push(x1);
//                                         NE2.push(y1);
//                                         SW2.push(x0);
//                                         SW2.push(y0);

//                                         _cameraRef?.fitBounds(NE2, SW2, [150, 50, 150, 50], 1000);
//                                     }
//                                 }, 1000);
//                             }}
//                         >
//                             <Text
//                                 title="Back"
//                                 fontFamily="Nunito-ExtraBold"
//                                 colorScheme={'#fff'}
//                                 size="xl"
//                                 textAlign="center"
//                             />
//                         </TouchableOpacity>
//                     )}
//                 </View>
//             </View>
//         );
//     };

//     const renderContent = () =>
//     {
//         return (
//             <>
//                 {data.length > 0 && (
//                     data[0].Steps !== undefined && data[0].Steps.Turns.map((e, i) => (
//                         <TouchableHighlight
//                             key={i}
//                             style={{ width: width, marginBottom: 5 }}
//                             onPress={() =>
//                             {
//                                 bottomSheetRefs?.current?.snapToIndex(0);

//                                 scroll.current?.scrollToIndex({
//                                     animated: true,
//                                     index: i,
//                                 });

//                                 setIndice(i);
//                                 _cameraRef?.setCamera({
//                                     centerCoordinate: arrow?.[i]?.[1].des,
//                                     zoomLevel: 16,
//                                     animationDuration: 1000,
//                                     animationMode: 'flyTo',
//                                 });
//                                 showTime === false && setShowTime(true);
//                             }}
//                         >
//                             <CardView>
//                                 <View style={{ padding: 10, display: 'flex', flexDirection: 'row', paddingRight: 50 }}>
//                                     <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//                                         <SvgIcon
//                                             name={CommonHelper.getDirectionIconOSRM(e)}
//                                             width={34}
//                                             height={34}
//                                         />
//                                     </View>
//                                     <View style={{ width: 20 }} />
//                                     <View style={{ paddingTop: 10 }}>
//                                         <Text
//                                             title={CommonHelper.translateDirectionV3(e) + ' ' + data[0].Steps !== undefined ? data[0].Steps.Names[i] : ''}
//                                             size="lg"
//                                         />
//                                         <Text
//                                             colorScheme={'OnSurfaceVariants'}
//                                             title={CommonHelper.getFormatDistance(data[0].Steps !== undefined ? data[0].Steps.Distances[i] : '', 1)}
//                                         />
//                                         <Text
//                                             colorScheme={'OnSurfaceVariants'}
//                                             title={CommonHelper.getFormatDuration(data[0].Steps !== undefined ? data[0].Steps.Durations[i] : '', true)}
//                                         />
//                                     </View>


//                                 </View>

//                             </CardView>
//                         </TouchableHighlight>
//                     ))
//                 )}
//             </>
//         );
//     };


//     const CardItem = ({ dataItem, Geometry }): JSX.Element =>
//     {
//         return (
//             <Pressable
//                 style={{ width: width, height: 80, marginBottom: 5, padding: 6 }}
//                 onPress={() =>
//                 {
//                     bottomSheetRefs?.current?.snapToIndex(0);
//                     _cameraRef?.flyTo(Geometry[dataItem.indice], 1500);
//                     scroll.current?.scrollToIndex({
//                         animated: true,
//                         index: dataItem.index,
//                     });
//                     setIndice(dataItem.index);
//                     showTime === false && setShowTime(true);
//                 }}
//             >
//                 <CardView>
//                     <View style={{ padding: 10, height: 100, display: 'flex', flexDirection: 'row' }}>
//                         <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//                             <SvgIcon
//                                 name={CommonHelper.getDirectionIconOSRM(dataItem.turn)}
//                                 width={34}
//                                 height={34}
//                             />
//                         </View>
//                         <View style={{ width: 20 }} />
//                         <View>
//                             <Text
//                                 title={CommonHelper.translateDirectionV3(dataItem.turn) + ' ' + dataItem.name}
//                                 size="lg"
//                             />
//                             <Text
//                                 colorScheme={'OnSurfaceVariants'}
//                                 title={CommonHelper.getFormatDistance(dataItem.distance, 1)}
//                             />
//                             <Text
//                                 colorScheme={'OnSurfaceVariants'}
//                                 title={CommonHelper.getFormatDuration(dataItem.duration, true)}
//                             />
//                         </View>
//                     </View>
//                 </CardView>
//             </Pressable>
//         );
//     };

//     const [refInput, setRefInput] = useState([{}, {}]);
//     const [status, setStatus] = useState([false, false]);
//     const [whichJustUpdate, setWhichJustUpdate] = useState(0);
//     const [searching, setSearching] = useState(false);

//     const update = useForceUpdate();

//     const setRef = (index, ref) =>
//     {
//         refInput[index] = ref;
//     };


//     const searchDirections = async (value: string) =>
//     {
//         setRequestText(requestText);
//         const bounds = await _mapRef?.getVisibleBounds();

//         if (bounds)
//         {
//             const latAndLong = value.split(' ');
//             const result: any = await props.locationSearchFunction(
//                 value,
//                 0,
//                 50,
//                 parseFloat(latAndLong[0]),
//                 parseFloat(latAndLong[1]),
//                 bounds[0][0],
//                 bounds[0][1],
//                 bounds[1][0],
//                 bounds[1][1],
//             );
//             setDataTextInput(result.docs);
//         }

//         setSearching(false);
//     };

//     const showLoadding = () =>
//     {
//         setSearching(true);

//         setTimeout(() =>
//         {
//             setSearching(false);
//         }, 2000);
//     };

//     const setNewInput = async (text: string, index: number): Promise<void> =>
//     {
//         if (text === '')
//         {
//             setSearching(false);
//         }
//         const old = requestText;
//         old[index] = text;
//         setRequestText(old);
//         update();
//     };

//     const setNewStatus = async (stausN: boolean, index: number): Promise<void> =>
//     {
//         const old = status;
//         old[index] = stausN;
//         setStatus(old);
//     };

//     const handleChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) =>
//     {
//         const value = e.nativeEvent.text;
//         setNewInput(value, whichJustUpdate);
//         !visible && setVisible(true);
//         if (value.length >= 4)
//         {
//             setTimeout(() =>
//             {
//                 showLoadding();
//                 searchDirections(value);
//             }, 1500);
//         }
//     };


//     const clearInput = (index: number) =>
//     {
//         if (routeTextInput.some(x => x.length === 0))
//         {
//             Toast.show({
//                 type: 'error',
//                 title: 'Blank field detected',
//                 message: 'Please complete input before this action.',
//                 visibilityTime: 5000,
//                 bottomOffset: 50,
//                 position: 'bottom',
//             });
//             return;
//         }
//         setWhichJustUpdate(index);
//         if (index === 0)
//         {
//             setDataTextInput([{
//                 ...coord,
//                 id: 'default',
//                 name: 'My location',
//             }]);
//         }
//         else
//         {
//             setDataTextInput([]);
//         }
//         setVisible(true);
//         setSearching(false);

//         const text: any = [];
//         requestText.map((e, i: number) =>
//         {
//             text.push(index === i ? '' : e);
//         });
//         setRequestText(text);

//         const tmp: any = [];
//         routeTextInput.map((e, i: number) =>
//         {
//             tmp.push(index === i ? '' : e);
//         });
//         setRouteTextInput(tmp);

//         const addr: any = [];
//         address.map((e, i) =>
//         {
//             addr.push(whichJustUpdate === i ? '' : e);
//         });

//         setAddress(addr);

//         // const routes: any = [];
//         // routeTextInput.map((e, i: number) =>
//         // {
//         //     routes.push(index === i ? [] : e);
//         // });
//         // setRouteTextInput(routes);
//     };

//     const addNewPoint = async (_index: number): Promise<void> =>
//     {
//         if (routeTextInput.some(x => x.length === 0))
//         {
//             Toast.show({
//                 type: 'error',
//                 title: 'Blank field detected',
//                 message: 'Please complete input before this action.',
//                 visibilityTime: 5000,
//                 bottomOffset: 50,
//                 position: 'bottom',
//             });
//             return;
//         }
//         // text input
//         const old = requestText; // ['12452','asfgafas']
//         const last = old.splice(_index, old.length - 1); // ['']

//         old.push('');

//         setRequestText(old.concat(last));

//         // route
//         const r_old = routeTextInput; // ['12452','asfgafas']

//         const r_last = r_old.splice(_index, old.length - 1); // ['']

//         r_old.push([]);
//         setRouteTextInput(r_old.concat(r_last) as any);

//         // address
//         const a_old = address; // ['12452','asfgafas']

//         const a_last = a_old.splice(_index, old.length - 1); // ''

//         a_old.push();

//         setAddress(a_old.concat(a_last) as any);


//         // ref
//         const ref_old = refInput; // ['12452','asfgafas']

//         const ref_last = ref_old.splice(_index, old.length - 1); // ''

//         ref_old.push({});

//         setRefInput(ref_old.concat(ref_last) as any);

//         update();
//     };


//     const removePoint = async (_index: number): Promise<void> =>
//     {
//         if (routeTextInput[_index].length > 0 && routeTextInput.some(x => x.length === 0))
//         {
//             Toast.show({
//                 type: 'error',
//                 title: 'Blank field detected',
//                 message: 'Please complete input before this action.',
//                 visibilityTime: 5000,
//                 bottomOffset: 50,
//                 position: 'bottom',
//             });
//             return;
//         }
//         const old = requestText; // ['12452','asfgafas']
//         old.splice(_index, 1); // ['']
//         setRequestText(old);

//         const r_old = routeTextInput; // ['12452','asfgafas']
//         r_old.splice(_index, 1); // ['']
//         setRouteTextInput(r_old.slice());

//         const a_old = address; // ['12452','asfgafas']
//         a_old.splice(_index, 1); // ['']
//         setAddress(a_old as any);

//         update();
//     };

//     const onClickAddress = async (item: any) =>
//     {
//         const tmp: any = [];
//         const routes: any = [];
//         routeTextInput.map((e, index) =>
//         {
//             routes.push(whichJustUpdate === index ? [item.latitude, item.longitude] : e);
//         });
//         requestText.map((e, index) =>
//         {
//             tmp.push(
//                 whichJustUpdate === index
//                     ? item.name
//                     : e,
//             );
//         });
//         const addr: any = [];
//         address.map((e, index) =>
//         {
//             addr.push(whichJustUpdate === index ? item.address : e);
//         });

//         setAddress(addr);
//         setRouteTextInput(routes);
//         setRequestText(tmp);
//         setVisible(false);

//     };

//     const renderNavigator = () =>
//     {
//         return (
//             <Shadow
//                 sides={['bottom']}
//                 radius={{
//                     bottomLeft: 20,
//                     bottomRight: 20,
//                 }}
//                 corners={['bottomLeft', 'bottomRight']}
//                 viewStyle={{
//                     ...styles.search,
//                     'backgroundColor': Colors.Surface,
//                     display: (mode === 'direct' || mode === 'notDirect') ? 'flex' : 'none',
//                 }}
//             >
//                 <View style={[styles.typeVeh, { 'backgroundColor': Colors.Surface }]}>
//                     <View style={{ flexDirection: 'row' }}>
//                         <TouchableOpacity
//                             style={styles.veh}
//                             onPress={() =>
//                             {
//                                 setTypeVeh(0);
//                                 setVisible(false);
//                             }}
//                         ><SvgIcon name={`map-veh-walk${typeVeh === 0 ? '-active' : ''}`} />
//                         </TouchableOpacity>
//                         <TouchableOpacity
//                             style={styles.veh}
//                             onPress={() =>
//                             {
//                                 setTypeVeh(2);
//                                 setVisible(false);
//                             }}
//                         ><SvgIcon name={`map-veh-2w${typeVeh === 2 ? '-active' : ''}`} />
//                         </TouchableOpacity>
//                         <TouchableOpacity
//                             style={styles.veh}
//                             onPress={() =>
//                             {
//                                 setTypeVeh(3);
//                                 setVisible(false);
//                             }}
//                         ><SvgIcon name={`map-veh-car${typeVeh === 3 ? '-active' : ''}`} />
//                         </TouchableOpacity>
//                         <TouchableOpacity
//                             style={styles.veh}
//                             onPress={() =>
//                             {
//                                 setTypeVeh(5);
//                                 setVisible(false);
//                             }}
//                         ><SvgIcon name={`map-veh-transit${typeVeh === 5 ? '-active' : ''}`} />
//                         </TouchableOpacity>
//                     </View>
//                     <TouchableOpacity
//                         onPress={() => setModalVisible(true)}
//                     >
//                         <SvgIcon
//                             name={'option'}
//                             size={20}
//                             color={Colors.OnSurface}
//                         />
//                     </TouchableOpacity>
//                 </View>
//                 <View style={{ 'backgroundColor': Colors.Surface }}>
//                     {
//                         requestText.map((e: string, index: number) => // ['','']
//                         {
//                             return (
//                                 <View
//                                     key={index}
//                                     style={{ width: '88%', marginTop: 10, marginLeft: '2%' }}
//                                 >
//                                     <TextInput
//                                         key={index}
//                                         ref={(ref) => setRef(index, ref)}
//                                         value={requestText[index]}
//                                         placeholder={t(index === 0 ? 'Starting point' : ((index === requestText?.length - 1) ? 'End point ' : 'Passing point'))}
//                                         placeholderTextColor={Colors.OnSurfaceVariants}
//                                         style={{
//                                             'color': Colors.OnSurface,
//                                             'borderColor': status[index] ? Colors.PrimaryLight : Colors.OnSurfaceVariants,
//                                             borderWidth: 1,
//                                             borderRadius: 5,
//                                             paddingLeft: 15,
//                                             height: 40,
//                                             paddingRight: 35,
//                                         }}
//                                         spellCheck={false}
//                                         autoCapitalize="none"
//                                         autoCorrect={false}
//                                         onChange={handleChange}
//                                         onFocus={() =>
//                                         {
//                                             setWhichJustUpdate(index);
//                                             setNewStatus(true, index);
//                                             if (index === 0 && requestText?.[0] === '')
//                                             {
//                                                 setDataTextInput([{
//                                                     ...coord,
//                                                     id: 'default',
//                                                     name: 'My location',
//                                                     address: '',
//                                                 }]);
//                                             }
//                                             else
//                                             {
//                                                 setDataTextInput([]);
//                                             }

//                                             setTimeout(() =>
//                                             {
//                                                 setVisible(true);
//                                                 setSearching(false);
//                                             }, 100);
//                                         }}
//                                         onBlur={() =>
//                                         {
//                                             setNewStatus(false, index);
//                                         }}
//                                     />
//                                     {
//                                         requestText?.[index]?.length > 0 && (
//                                             <TouchableOpacity
//                                                 style={{ position: 'absolute', right: 15, top: 10 }}
//                                                 onPress={() => clearInput(index)}
//                                             >
//                                                 <FAIcon
//                                                     icon="times"
//                                                     size={'20'}
//                                                     color={Colors.OnSurface}
//                                                     type="light"
//                                                     backgroundColor={Colors.Surface}
//                                                 />
//                                             </TouchableOpacity>
//                                         )

//                                     }

//                                     {
//                                         index === (requestText?.length - 1) && requestText?.length <= 4 && (
//                                             <TouchableOpacity
//                                                 style={{
//                                                     position: 'absolute',
//                                                     right: '-7.5%',
//                                                     top: 10,
//                                                 }}
//                                                 onPress={() => addNewPoint(index)}
//                                             >
//                                                 <FAIcon
//                                                     icon="plus"
//                                                     size={'18'}
//                                                     color={Colors.OnSurface}
//                                                     type="light"
//                                                     backgroundColor={Colors.Surface}
//                                                 />
//                                             </TouchableOpacity>
//                                         )
//                                     }

//                                     {
//                                         index !== 0 && requestText?.length - 1 !== index && (
//                                             <TouchableOpacity
//                                                 style={{
//                                                     position: 'absolute',
//                                                     right: '-7.5%',
//                                                     top: 10,
//                                                 }}
//                                                 onPress={() => removePoint(index)}
//                                             >
//                                                 <FAIcon
//                                                     icon="minus"
//                                                     size={'18'}
//                                                     color={Colors.OnSurface}
//                                                     type="light"
//                                                     backgroundColor={Colors.Surface}
//                                                 />
//                                             </TouchableOpacity>
//                                         )
//                                     }
//                                     {
//                                         index === 0 && (
//                                             <View style={styles.swapBtn}>
//                                                 <Pressable
//                                                     style={{ flexDirection: 'row' }}
//                                                     disabled={requestText[0] !== '' && requestText[1] !== '' ? false : true}
//                                                     onPress={() =>
//                                                     {
//                                                         const tmp: any = requestText.slice().reverse().map(d => d);
//                                                         setRequestText(tmp);
//                                                         const tmp2: any = routeTextInput.slice().reverse().map(d => d);
//                                                         setRouteTextInput(tmp2);
//                                                         const tmp3: any = address.slice().reverse().map(d => d);
//                                                         setAddress(tmp3);
//                                                     }}
//                                                 >
//                                                     <SvgIcon
//                                                         name={`up-down${requestText[0] !== '' && requestText[1] !== '' ? '-active' : ''}`}
//                                                         width={18}
//                                                         height={18}
//                                                     />
//                                                 </Pressable>
//                                             </View>
//                                         )
//                                     }
//                                 </View>
//                             );
//                         })
//                     }
//                 </View>
//                 <KeyboardAvoidingView>
//                     {visible && dataTextInput !== undefined && (
//                         !searching
//                             ? (
//                                     <>
//                                         {(dataTextInput?.length > 0)
//                                             ? (
//                                                     <ScrollView
//                                                         style={styles.floating}
//                                                         contentContainerStyle={{ paddingHorizontal: 16 }}
//                                                         keyboardShouldPersistTaps="handled"
//                                                         scrollEnabled
//                                                     >
//                                                         {
//                                                             dataTextInput.map((e: any, i: number) =>
//                                                             {
//                                                                 if (!e.address)
//                                                                 {
//                                                                     if (e.province)
//                                                                     {
//                                                                         e.address = e.province;
//                                                                     }
//                                                                     if (e.district)
//                                                                     {
//                                                                         e.address = e.district + (e.address ? `, ${e.address}` : '');
//                                                                     }
//                                                                     if (e.ward)
//                                                                     {
//                                                                         e.address = e.ward + (e.address ? `, ${e.address}` : '');
//                                                                     }
//                                                                     if (!e.address)
//                                                                     {
//                                                                         e.address = e.categorye ? e.categorye : '';
//                                                                     }
//                                                                 }
//                                                                 return (
//                                                                     <TouchableOpacity
//                                                                         key={i}
//                                                                         style={styles.card}
//                                                                         onPress={() =>
//                                                                         {
//                                                                             Keyboard.dismiss();
//                                                                             onClickAddress(e);
//                                                                         }}
//                                                                     >
//                                                                         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                                                                             {e.name === 'My location' && (
//                                                                                 <View
//                                                                                     style={{
//                                                                                         paddingRight: 10,
//                                                                                         marginLeft: -1,
//                                                                                     }}
//                                                                                 >
//                                                                                     <SvgIcon
//                                                                                         name="my location"
//                                                                                     />
//                                                                                 </View>
//                                                                             )}
//                                                                             <Text
//                                                                                 title={`${e.name}`}
//                                                                                 size="xl"
//                                                                             />
//                                                                         </View>
//                                                                         <Text
//                                                                             title={`${e.address}`}
//                                                                             colorScheme={Colors.OnSurfaceVariants}
//                                                                         />
//                                                                     </TouchableOpacity>
//                                                                 );
//                                                             })
//                                                         }
//                                                     </ScrollView>
//                                                 )
//                                             : (requestText?.[whichJustUpdate]?.length > 0 && requestText?.[whichJustUpdate] !== 'My location') && (
//                                                     <View style={styles.noData}>
//                                                         <Text
//                                                             title="no data"
//                                                             textAlign="center"
//                                                         />
//                                                     </View>
//                                                 )
//                                         }
//                                     </>
//                                 )
//                             : (
//                                     <View style={{ paddingVertical: 10, width: Dimensions.get('window').width, alignItems: 'center', justifyContent: 'center' }}>
//                                         <Loading visible />
//                                     </View>
//                                 )
//                     )}
//                 </KeyboardAvoidingView>

//                 <ModalV2
//                     size="full"
//                     isOpen={modalVisible}
//                     onClose={() => setModalVisible(false)}
//                 >
//                     <ModalV2.Content>
//                         <ModalV2.Body>
//                             <View style={{ padding: 16 }}>
//                                 <View style={{ ...styles.modal, width: '100%', paddingHorizontal: 15, height: 130, backgroundColor: Colors.Surface }}>
//                                     {/* <Text style={{ fontSize: 18,fontWeight: 'bold',paddingVertical: 10 }}>{t('Route')}</Text> */}
//                                     <Text
//                                         title="Route"
//                                         fontFamily="Nunito-Bold"
//                                         size="2xl"
//                                         paddingTop={10}
//                                         paddingBottom={10}
//                                     />
//                                     <TouchableOpacity
//                                         style={{ ...styles.option, borderBottomWidth: 0.4, 'borderBottomColor': Colors.OnSurfaceVariants }}
//                                         onPress={() =>
//                                         {
//                                             setCrit(0);
//                                             setModalVisible(false);
//                                         }}
//                                     >
//                                         <Text title="Fastest" />
//                                         {crit === 0 && check}
//                                     </TouchableOpacity>
//                                     <TouchableOpacity
//                                         style={styles.option}
//                                         onPress={() =>
//                                         {
//                                             setCrit(1);
//                                             setModalVisible(false);
//                                         }}
//                                     >
//                                         <Text title="Shortest" />
//                                         {crit === 1 && check}
//                                     </TouchableOpacity>
//                                 </View>
//                             </View>
//                         </ModalV2.Body>
//                     </ModalV2.Content>
//                 </ModalV2>
//             </Shadow>
//         );
//     };

//     return (
//         <>
//             <Toast />

//             {renderNavigator()}

//             <Map
//                 isConnected={props?.isConnected}
//                 overrideParams={props.overrideParams}
//                 defaultLocation={props.defaultLocation}
//                 cameraRef={setCameraRef}
//                 mapRef={setMapRef}
//                 zoomLevel={Number(props.zoomLevel)}
//                 mapType={'dark'}
//                 enableTracking={enableTracking}
//                 onDidFinishLoadingMap={() =>
//                 {
//                     if (data && data[0])
//                     {
//                         setTimeout(() =>
//                         {
//                             const myCoords = data[0]?.Geometry;

//                             if (data[0].Geometry && data[0].Geometry.length !== 0)
//                             {
//                                 let x0: any, x1: any, y0: any, y1: any;


//                                 for (let i = 0; i < myCoords.length; i++)
//                                 {
//                                     if (x0 == null)
//                                     {
//                                         x0 = x1 = myCoords[i][0];
//                                         y0 = y1 = myCoords[i][1];
//                                     }
//                                     else
//                                     {
//                                         if (myCoords[i][0] > x1!)
//                                         {
//                                             x1 = myCoords[i][0];
//                                         }
//                                         if (myCoords[i][0] < x0)
//                                         {
//                                             x0 = myCoords[i][0];
//                                         }
//                                         if (myCoords[i][1] > y1!)
//                                         {
//                                             y1 = myCoords[i][1];
//                                         }
//                                         if (myCoords[i][1] < y0!)
//                                         {
//                                             y0 = myCoords[i][1];
//                                         }
//                                     }
//                                 }
//                                 const NE2: any[] = [];
//                                 const SW2: any[] = [];
//                                 NE2.push(x1);
//                                 NE2.push(y1);
//                                 SW2.push(x0);
//                                 SW2.push(y0);

//                                 _cameraRef?.fitBounds(NE2, SW2, [150, 50, 150, 50], 1000);
//                             }
//                         }, 1000);
//                     }
//                 }}
//             >
//                 {route !== null && (
//                     <MapboxGL.ShapeSource
//                         id="routeSource"
//                         shape={route}
//                     >
//                         <MapboxGL.LineLayer
//                             id="routeFill"
//                             style={style.line as any}
//                         />
//                     </MapboxGL.ShapeSource>
//                 )}


//                 {arrow.length > 0 && data[0].Steps !== undefined && indice !== data[0].Steps.Indices.length - 1 && (
//                     <MapboxGL.ShapeSource
//                         id={'arrow-source-blue'}
//                         shape={{
//                             type: 'FeatureCollection',
//                             features: [
//                                 {
//                                     'type': 'Feature',
//                                     'properties': {},
//                                     'geometry': {
//                                         'type': 'Point',
//                                         'coordinates': arrow?.[indice]?.[1].des,
//                                     },
//                                 },
//                             ],
//                         }}
//                     >
//                         <MapboxGL.SymbolLayer
//                             belowLayerID={'routeFill'}
//                             id={'arrow-blue'}
//                             minZoomLevel={15}
//                             style={{
//                                 iconImage: require('../../images/direction-arrow.png'),
//                                 iconSize: 0.33,
//                                 iconRotate: arrow?.[indice]?.[1].angle,
//                                 iconRotationAlignment: 'map',
//                                 iconAllowOverlap: true,
//                             }}
//                         />

//                     </MapboxGL.ShapeSource>
//                 )}

//                 {arrow.length > 0 && data[0].Steps !== undefined && indice !== data[0].Steps.Indices.length - 1 && (
//                     <MapboxGL.ShapeSource
//                         id={'arrowSource'}
//                         shape={arrow?.[indice]?.[0].geometry}
//                     >
//                         <MapboxGL.LineLayer
//                             minZoomLevel={15}
//                             aboveLayerID="routeFill"
//                             id={'arrowPoin'}
//                             style={style.line2 as any}
//                         />
//                     </MapboxGL.ShapeSource>
//                 )}

//                 {arrow.length > 0 && data[0].Steps !== undefined && indice !== data[0].Steps.Indices.length - 1 && (
//                     <MapboxGL.ShapeSource
//                         id={'arrow-source'}
//                         shape={{
//                             type: 'FeatureCollection',
//                             features: [
//                                 {
//                                     'type': 'Feature',
//                                     'properties': {},
//                                     'geometry': {
//                                         'type': 'Point',
//                                         'coordinates': arrow?.[indice]?.[1].des,
//                                     },
//                                 },
//                             ],
//                         }}
//                     >
//                         <MapboxGL.SymbolLayer
//                             id={'arrow'}
//                             minZoomLevel={15}
//                             style={{
//                                 iconImage: require('../../images/direction-arrow-white.png'),
//                                 iconSize: 0.3,
//                                 iconRotate: arrow?.[indice]?.[1].angle,
//                                 iconRotationAlignment: 'map',
//                             }}
//                         />

//                     </MapboxGL.ShapeSource>
//                 )}

//                 {data?.length > 0 && (
//                     routePoints.map((e: any, i) =>
//                     {
//                         if (e?.length > 1)
//                         {
//                             const a: any = e.slice().reverse().map(v => v);
//                             return (
//                                 <MapboxGL.ShapeSource
//                                     key={i}
//                                     id={`point-${i}`}
//                                     maxZoomLevel={12}
//                                     shape={point(a).geometry}
//                                 >
//                                     <MapboxGL.SymbolLayer
//                                         layerIndex={9000}
//                                         style={{
//                                             iconImage: i === 0 ? require('../../images/poi-pink.png') : require('../../images/poi-green.png'),
//                                             iconTranslateAnchor: 'map',
//                                             iconOffset: [0, -12],
//                                         }}
//                                         id={`point-rt-${i}`}
//                                     />
//                                 </MapboxGL.ShapeSource>
//                             );
//                         }
//                     },
//                     )
//                 )}
//             </Map>
//             {(data[0]?.Steps?.Turns && mode !== 'direct' && mode !== 'notDirect') && (
//                 <FlatList
//                     ref={scroll}
//                     style={styles.slide}
//                     data={data[0]?.Steps?.Turns}
//                     keyExtractor={(_e, index) => index.toString()}
//                     showsHorizontalScrollIndicator={false}
//                     initialNumToRender={1000000}
//                     renderItem={({ index, item }) =>
//                     {
//                         return (
//                             <TouchableHighlight
//                                 style={{
//                                     width: width - 20, // 20 is margin left and right
//                                     marginHorizontal: 10,
//                                     height: '100%',
//                                     borderRadius: 10,
//                                     justifyContent: 'center',
//                                     alignItems: 'center',
//                                 }}
//                                 onPress={() =>
//                                 {
//                                     setIndice(index);
//                                     flyToDes(index);
//                                     showTime === false && setShowTime(true);
//                                 }}
//                             >
//                                 <CardView shadow>
//                                     <View style={{ padding: 10, height: 100, display: 'flex', flexDirection: 'row' }}>
//                                         <View style={{ position: 'absolute', top: -10 }}>
//                                             <SvgIcon
//                                                 name={CommonHelper.getDirectionIconOSRM(item)}
//                                                 width={50}
//                                                 height={100}
//                                             />
//                                         </View>
//                                         <View style={{ width: 50 }} />
//                                         <View>
//                                             <Text
//                                                 size="2xl"
//                                                 title={CommonHelper.translateDirectionV3(item) + ' ' + data[0].Steps !== undefined ? data[0].Steps.Names[index] : ''}
//                                             />
//                                             <Text
//                                                 colorScheme="OnSurfaceVariants"
//                                                 title={CommonHelper.getFormatDistance(data[0].Steps !== undefined ? data[0].Steps.Distances[index] : '', 1)}
//                                             />
//                                             <Text
//                                                 colorScheme="OnSurfaceVariants"
//                                                 title={CommonHelper.getFormatDuration(data[0].Steps !== undefined ? data[0].Steps.Durations[index] : '', true)}
//                                             />
//                                         </View>


//                                     </View>

//                                 </CardView>
//                             </TouchableHighlight>
//                         );
//                     }}
//                     pagingEnabled
//                     horizontal
//                     onMomentumScrollEnd={(e) =>
//                     {
//                         const x = e.nativeEvent.contentOffset.x;
//                         let index = 0;
//                         let lech = 0;


//                         if (Number(e.nativeEvent.contentOffset.x) > Number(preX))
//                         {
//                             index = indice + 1;
//                             if ((Number(e.nativeEvent.contentOffset.x) - Number(preX)) < (width - 20))
//                             {
//                                 lech += 1;
//                             }
//                         }
//                         else if (Number(e.nativeEvent.contentOffset.x) === Number(preX))
//                         {
//                             index = indice;
//                         }
//                         else
//                         {
//                             index = indice - 1;
//                             if (Number(preX) - (Number(e.nativeEvent.contentOffset.x)) < (width - 20))
//                             {
//                                 lech -= 1;
//                             }
//                         }

//                         if (lech !== 0)
//                         {
//                             index = indice;
//                         }
//                         flyToDes(index);
//                         setTimeout(() =>
//                         {
//                             setIndice(index);
//                             setPreX(x);
//                             setEnableTracking(!enableTracking);
//                         }, 10);
//                     }}
//                 />
//             )}
//             {(showTime && mode !== 'notDirect') && (
//                 <BottomSheet
//                     handleOpenBottomSheetModal={(ref: any) =>
//                     {
//                         ref && setBottomSheetRefs(ref);
//                     }}
//                     closeAble={false}
//                     snapPoints={snapPoints}
//                     handleSheetChange={(i) =>
//                     {
//                         handleSheetChange(i);
//                     }}
//                     handleSheetLevel={handleSheetLevel}
//                     renderHeaderButton={renderHeader()}
//                     renderContent={props.useCustomLocation ? renderContent() : renderView()}
//                 />
//             )}

//             {loadingReRoute && (
//                 <View style={styles.ActivitiInficator}>
//                     <ActivityIndicator
//                         size="large"
//                         color="#939393"
//                     />
//                 </View>
//             )}
//         </>
//     );
// };

// const check = (
//     <FAIcon
//         type="light"
//         icon="check"
//         size={'18'}
//     />
// );

// const style = {
//     line: { 'lineColor': Colors.PrimaryLight, lineWidth: 10, lineCap: 'round', lineOpacity: 1.84 },
//     line2: { 'lineColor': Colors.Background, lineWidth: 8, lineCap: 'round', lineOpacity: 100 },
// };
// const fullWidth = Dimensions.get('window').width;
// const fullHeight = Dimensions.get('window').height;
// const bgColor = '#00000080';

// const styles = StyleSheet.create({
//     ActivitiInficator: {
//         alignItems: 'center',
//         backgroundColor: bgColor,
//         height: fullHeight,
//         justifyContent: 'center',
//         position: 'absolute',
//         width: fullWidth,
//     },
//     card: {
//         height: 'auto',
//         paddingTop: 15,
//     },
//     floating: {
//         'backgroundColor': 'transparent',
//         'borderTopColor': '#3c3c3c25',
//         borderTopWidth: 1,
//         marginBottom: 5,
//         marginTop: 15,
//         maxHeight: Dimensions.get('window').height / 100 * 40,
//         width: Dimensions.get('screen').width - 10,
//     },
//     header: {
//         justifyContent: 'space-between',
//         marginBottom: 20,
//         paddingHorizontal: 10,
//         width: '100%',
//     },
//     modal: {
//         borderRadius: 10,
//     },
//     noData: {
//         alignItems: 'center',
//         paddingVertical: 10,
//         width: '100%',
//     },
//     option: {
//         flex: 1,
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         paddingHorizontal: 15,
//         paddingVertical: 10,
//     },
//     search: {
//         borderBottomLeftRadius: 20,
//         borderBottomRightRadius: 20,
//         minHeight: Dimensions.get('screen').height / 100 * 18,
//         padding: 5,
//         'shadowColor': '#000',
//         shadowOffset: {
//             width: 0,
//             height: 2,
//         },
//         shadowOpacity: 0.25,
//         shadowRadius: 3.84,
//         width: '100%',
//     },
//     slide: {
//         height: 100,
//         position: 'absolute',
//         top: 20,
//         width: '100%',
//     },
//     swapBtn: {
//         position: 'absolute',
//         right: '-7.5%',
//         top: 10,
//     },
//     typeVeh: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         paddingRight: 10,
//     },
//     veh: {
//         paddingHorizontal: 5,
//     },
// });

// export default Directions;
