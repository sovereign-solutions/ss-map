/* eslint-disable react-native/no-inline-styles */
import React, { useContext, useMemo, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, StyleSheet, View, TouchableOpacity, Pressable } from 'react-native';

import { CommonHelper } from '../../../helper/common.helper';
import CardView from '../../CardView/CardView';
import SvgIcon from '../../SvgIcon/SvgIcon';
import Text from '../../Text/Text';
import Colors from '../../theme/colors';
import { DirectionContext } from '../Contexts/directionContext';
import { MapContext } from '../Contexts/mapContext';
import NavigatorComponent from '../MapDirectionComponents/NavigatorComponent';
// import BottomSheet from '../../BottomSheet/BottomSheet';
import FAIcon from '../../FAIcon/FAIcon';
import Toast from '../../Toast/Toast';

const width = Dimensions.get('window').width;

export type Props = {
    locationSearchFunction: (_value,_skip,_take,_lat,_long, _lx, _ly, _rx, _ry)=> Promise<any>,
    /** Show Direction with Screen */
    isStanAlone?: boolean,
};

const DirectionControl:React.FC<Props> = ({
    locationSearchFunction,
    isStanAlone,
}):JSX.Element =>
{
    const {
        routePoints,
        setRoute,
        setArrow,
        data,setData,
        typeVeh,setTypeVeh,
        requestText,setRequestText,
        getDirections,
        isShowDirection,setIsShowDirection,
        setAddress,
        searchView,setSearchView,
        showTime,setShowTime,
        setSheetVisible,
        refreshing,setRefreshing,
        indice,setIndice,
        setRoutePoints,
        crit,setCrit,
        preX,setPreX,
        arrow,
        isCustomCoord,
        loadingReRoute,setLoadingReRoute,
        whichJustUpdate,setWhichJustUpdate,
        setRouteSelectedPoints,
    } = useContext(DirectionContext);

    const {
        mapRef,
        camera,
        setMode,
        mode,
    } = useContext(MapContext);


    // local ref

    const scroll = React.useRef<FlatList>();

    const showToast = (value: string): void =>
    {
        Toast.show({
            type: 'error',
            title: 'Navigation failed',
            message: value,
            visibilityTime: 5000,
            bottomOffset: 50,
            position: 'bottom',
        });
    };

    const reset = ():void =>
    {
        if (!isStanAlone)
        {
            setMode('');
            setIsShowDirection(false);
        }
        setRouteSelectedPoints([[], [], [], [], []]);
        setRefreshing(true);
        setData([{ Geometry: [] }]);
        setRoute(null);
        setArrow([]);
        setRequestText(['My location','']);
        setTypeVeh(3);
        setSearchView(true);
        // searchView: true,
        setSheetVisible(true);
        // sheetVisible: true,
        setShowTime(false);
        // showTime: false,
        setIndice(0);
        // indice: 0,
        setPreX(0);
        // preX: 0,
        setRoutePoints([]);
        // routePoints: [],
        setRefreshing(false);
    };

    const flyToDes = async(index:number): Promise<void> =>
    {
        camera?.current?.setCamera({
            centerCoordinate: arrow?.[index]?.[1].des,
            animationMode: 'flyTo',
            animationDuration: 800,
            zoomLevel: await mapRef?.current?.getZoom(),
        });
        return Promise.resolve();
    };
    const snapPoints = useMemo(() => [110, '100%'], []);
    const [bottomSheetRefs, setBottomSheetRefs] = useState<any>();
    const [handleSheetLevel, handleSheetChange] = useState<number>(0);

    const renderHeader = () =>
    {
        return (
            <View style={styles.header}>
                <View style={{
                    paddingVertical: 6,
                }}
                >
                    <View
                        style={{
                            position: 'relative',
                        }}
                    >
                        <Text
                            size={'4xl'}
                            title={'Route information'}
                            // fontFamily="Nunito-Bold"
                        />
                        <Text
                            colorScheme={'OnSurfaceVariants'}
                            title={CommonHelper.getFormatDuration(data[0]?.Via_Durations[routePoints.length - 1]) + ' (' + CommonHelper.getFormatDistance(data[0]?.Via_Distances[routePoints.length - 1]) + ')'}
                        />
                      
                       
                    </View>

                </View>
                <View style={{ display: isCustomCoord ? 'none' : 'flex' , justifyContent: 'space-between', flexDirection: 'row' }}>
                    <TouchableOpacity
                        style={{
                            paddingHorizontal: 25,
                            paddingVertical: 7,
                            'backgroundColor': '#fff',
                            'borderColor': Colors.PrimaryLight,
                            borderWidth: 0.5,
                            borderRadius: 20,
                            flexDirection: 'row',
                            justifyContent: 'center',
                        }}
                        onPress={() =>
                        {
                            if (handleSheetLevel === 0)
                            {
                                bottomSheetRefs?.current?.snapToIndex(1);
                            }
                            else
                            {
                                bottomSheetRefs?.current?.snapToIndex(0);
                            }
                        }}
                    >
                        <Text
                            title={handleSheetLevel === 0 ? 'Steps' : 'Map'}
                            // fontFamily="Nunito-ExtraBold"
                            colorScheme={Colors.PrimaryLight}
                            size="xl"
                            textAlign="center"
                        />
                    </TouchableOpacity>
                    {mode !== 'directing'
                        ? (
                                <TouchableOpacity
                                    style={{
                                        paddingHorizontal: 30,
                                        paddingVertical: 7,
                                        'backgroundColor': '#5C8AEA',
                                        borderRadius: 20,
                                    }}
                                    onPress={() =>
                                    {
                                        const emptyRequestText = requestText?.filter(x => x.length === 0);
                                        if (emptyRequestText.length > 0)
                                        {
                                            showToast('Please input the location or address');
                                        }
                                        else
                                        {
                                            setMode('directing');
                                            const height_50_padding = Dimensions.get('window').height * 0.35;
                                            setTimeout(() =>
                                            {
                                                camera?.current?.setCamera({
                                                    centerCoordinate: data[0].Geometry[0],
                                                    zoomLevel: 16,
                                                    padding: {
                                                        paddingBottom: height_50_padding,
                                                    },
                                                    animationDuration: 1000,
                                                    animationMode: 'flyTo',
                                                });
                                            }, 1000);
                                        }
                                    }}
                                >
                                    <Text
                                        title="Start"
                                        // fontFamily="Nunito-ExtraBold"
                                        colorScheme={'#fff'}
                                        size="xl"
                                        textAlign="center"
                                    />
                                </TouchableOpacity>
                            )
                        : (
                                handleSheetLevel === 0 && (
                                    <View
                                        style={{
                                            // position: 'absolute',
                                            // top: 0, right: 0,
                                            // display: 'flex',
                                            flexDirection: 'row',
                                            width: '30%',
                                            // backgroundColor: 'red',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <Pressable
                                            onPress={()=>
                                            {
                                                if (indice !== 0)
                                                {
                                                    const i = indice;
                                                    setPreX(preX - Dimensions.get('window').width);
                                                    setIndice(i - 1);
                                                    flyToDes(i - 1);
                                                    scroll.current?.scrollToIndex({ index: i - 1 });
                                                }
                                            }}
                                        >
                                            <FAIcon
                                                icon="angle-left"
                                                size="40"
                                                backgroundColor={'rgba(0,0,0,0)'}
                                            />
                                        </Pressable>
                                        <Pressable
                                            onPress={()=>
                                            {
                                                console.log(data[0].Steps);
                                        
                                                if (indice < data[0].Steps.Turns.length - 1)
                                                {
                                                    const i = indice;
                                                    setPreX(preX + Dimensions.get('window').width);
                                                    setIndice(i + 1);
                                                    flyToDes(i + 1);
                                                    scroll.current?.scrollToIndex({ index: i + 1 });
                                                }
                                            }}
                                        >
                                            <FAIcon
                                                icon="angle-right"
                                                size="40"
                                                backgroundColor={'rgba(0,0,0,0)'}
                                            />
                                        </Pressable>
                                    </View>
                                )
                            )}
                    <TouchableOpacity
                        style={{ paddingHorizontal: 20, paddingVertical: 7, 'backgroundColor': 'red', borderRadius: 20 }}
                        onPress={() =>
                        {
                            if (mode === 'directing')
                            {
                                setMode('directRoute');
                                setTimeout(() =>
                                {
                                    const myCoords = data[0].Geometry;

                                    if (data[0].Geometry && data[0].Geometry.length !== 0)
                                    {
                                        let x0: any, x1: any, y0: any, y1: any;


                                        for (let i = 0; i < myCoords.length; i++)
                                        {
                                            if (x0 == null)
                                            {
                                                x0 = x1 = myCoords[i][0];
                                                y0 = y1 = myCoords[i][1];
                                            }
                                            else
                                            {
                                                if (myCoords[i][0] > x1!) {x1 = myCoords[i][0];}
                                                if (myCoords[i][0] < x0) {x0 = myCoords[i][0];}
                                                if (myCoords[i][1] > y1!) {y1 = myCoords[i][1];}
                                                if (myCoords[i][1] < y0!) {y0 = myCoords[i][1];}
                                            }
                                        }
                                        const NE2: any[] = [];
                                        const SW2: any[] = [];
                                        NE2.push(x1);
                                        NE2.push(y1);
                                        SW2.push(x0);
                                        SW2.push(y0);

                                        camera?.current?.fitBounds(NE2, SW2, [150, 50, 150, 50], 1000);
                                    }
                                }, 1000);
                            }
                            else
                            {
                                reset();
                            }
                        }}
                    >
                        <Text
                            title={mode === 'directing' ? 'Back' : 'Exit'}
                            // fontFamily="Nunito-ExtraBold"
                            colorScheme={'#fff'}
                            size="xl"
                            textAlign="center"
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    const renderContent = () =>
    {
        return (
            <>
                {data.length > 0 && (
                    data[0].Steps !== undefined && data[0].Steps.Turns.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            activeOpacity={0.9}
                            onPress={()=>
                            {
                                bottomSheetRefs?.current?.snapToIndex(0);
                                scroll.current?.scrollToIndex({
                                    animated: true,
                                    index: index,
                                });
                                setIndice(index);
                                camera?.current?.setCamera({
                                    centerCoordinate: arrow?.[index]?.[1].des,
                                    zoomLevel: 16,
                                    animationDuration: 1000,
                                    animationMode: 'flyTo',
                                });
                                showTime === false && setShowTime(true);
                            }}
                        >
                            <View style={{ display: 'flex', flexDirection: 'row', paddingVertical: 15 }}>
                                <View style={{ position: 'absolute', top: -10 }}>
                                    <SvgIcon
                                        name={CommonHelper.getDirectionIconOSRM(item)}
                                        width={50}
                                        height={100}
                                    />
                                </View>
                                <View style={{ width: 50 }} />
                                <View>
                                    <Text
                                        size="2xl"
                                        title={CommonHelper.translateDirectionV3(item) + ' ' + data[0].Steps.Names[index]}
                                    />
                                    <Text
                                        colorScheme="OnSurfaceVariants"
                                        title={CommonHelper.getFormatDistance(data[0].Steps.Distances[index],1)}
                                    />
                                    <Text
                                        colorScheme="OnSurfaceVariants"
                                        title={CommonHelper.getFormatDuration(data[0].Steps.Durations[index],true)}
                                    />
                                </View>


                            </View>
                        </TouchableOpacity>
                    ))
                )}
            </>
        );
    };

    return (
        <>
            {isShowDirection && (
                <>
                    <View style={styles.directionContainer}>


                        {!refreshing && (
                            <NavigatorComponent
                                typeVeh={typeVeh}
                                requestText={requestText}
                                setRequestText={(_requestText: any)=>setRequestText(_requestText)}
                                setTypeVeh={(_typeVeh: any)=>setTypeVeh(_typeVeh)}
                                refMap={mapRef.current}
                                drawRoute={(coord, typeVehs, crits) =>
                                {
                                    setLoadingReRoute(true);
                                    getDirections(coord, typeVehs, crits);
                                }}
                                setAddress={(_address: any)=>setAddress(_address)}
                                visible={searchView}
                                crit={crit}
                                setCrit={(crit: any)=>setCrit(crit)}
                                whichJustUpdate={whichJustUpdate}
                                setWhichJustUpdate={(whichJustUpdate: number) => setWhichJustUpdate(whichJustUpdate)}
                                locationSearchFunction={locationSearchFunction}
                                onReload={reset}
                            />
                        )}
                    </View>

                    {(data[0]?.Steps?.Turns && mode === 'directing') && (
                        <FlatList
                            ref={scroll as any}
                            style={styles.slide}
                            data={data[0]?.Steps?.Turns}
                            keyExtractor={(_e,index)=>index.toString()}
                            showsHorizontalScrollIndicator={false}
                            initialNumToRender={1000000}
                            // initialScrollIndex={indice}
                            renderItem={({ index,item })=>
                            {

                                return (
                                    <TouchableOpacity
                                        style={{
                                            width: width - 20, // 20 is margin left and right
                                            marginHorizontal: 10,
                                        }}
                                        activeOpacity={0.1}
                                        onPress={()=>
                                        {
                                            setIndice(index);
                                            flyToDes(index);
                                            showTime === false && setShowTime(true);
                                        }}
                                    >
                                        <CardView
                                            borderRadius="large"
                                            // shadow
                                        >
                                            <View style={{ 'backgroundColor': 'transparent' ,display: 'flex', flexDirection: 'row', paddingVertical: 15 }}>
                                                <View style={{ 'backgroundColor': 'transparent',paddingHorizontal: 16,paddingVertical: 4 }}>
                                                    <SvgIcon
                                                        name={CommonHelper.getDirectionIconOSRM(item)}
                                                        width={56}
                                                        height={56}
                                                    />
                                                </View>
                                                {/* <View style={{ width: 50,'backgroundColor': 'green' }} /> */}
                                                <View>
                                                    <Text
                                                        size="2xl"
                                                        title={CommonHelper.translateDirectionV3(item) + ' ' + data[0].Steps.Names[index]}
                                                    />
                                                    <Text
                                                        colorScheme="OnSurfaceVariants"
                                                        title={CommonHelper.getFormatDistance(data[0].Steps.Distances[index],1)}
                                                    />
                                                    <Text
                                                        colorScheme="OnSurfaceVariants"
                                                        title={CommonHelper.getFormatDuration(data[0].Steps.Durations[index],true)}
                                                    />
                                                </View>


                                            </View>

                                        </CardView>
                                    </TouchableOpacity>
                                );
                            }}
                            pagingEnabled
                            horizontal
                            onMomentumScrollEnd={(e)=>
                            {
                                const x = e.nativeEvent.contentOffset.x;
                                let index = 0;
                                let lech = 0;


                                if (Number(e.nativeEvent.contentOffset.x) > Number(preX))
                                {
                                    index = indice + 1;
                                    if ((Number(e.nativeEvent.contentOffset.x) - Number(preX)) < (width - 20))
                                    {
                                        lech += 1;
                                    }
                                }
                                else if (Number(e.nativeEvent.contentOffset.x) === Number(preX))
                                {
                                    index = indice;
                                }
                                else
                                {
                                    index = indice - 1;
                                    if (Number(preX) - (Number(e.nativeEvent.contentOffset.x)) < (width - 20))
                                    {
                                        lech -= 1;
                                    }
                                }

                                if (lech !== 0)
                                {
                                    index = indice;
                                }
                                flyToDes(index);
                                setTimeout(() =>
                                {
                                    setIndice(index);
                                    setPreX(x);
                                },10);
                            }}
                        />
                    )
                    }
                    {/* {showTime && (
                        <BottomSheet
                            handleOpenBottomSheetModal={(ref:any)=>
                            {
                                ref && setBottomSheetRefs(ref);
                            }}
                            closeAble={false}
                            snapPoints={snapPoints}
                            handleSheetChange={(i)=>
                            {
                                handleSheetChange(i);
                            }}
                            handleSheetLevel={handleSheetLevel}
                            renderHeaderButton={renderHeader()}
                            renderContent={renderContent()}
                            enablePanDownToClose
                        />
                    )} */}
                </>
            )}


            {loadingReRoute && (
                <View style={styles.ActivitiInficator}>
                    <ActivityIndicator
                        size="large"
                        color="#939393"
                    />
                </View>
            )}
        </>
    );
};


const fullWidth = Dimensions.get('window').width;
const fullHeight = Dimensions.get('window').height;
const bgColor = '#00000080';

const styles = StyleSheet.create({
    ActivitiInficator: {
        alignItems: 'center',
        backgroundColor: bgColor,
        height: fullHeight,
        justifyContent: 'center',
        position: 'absolute',
        width: fullWidth,
    },
    directionContainer: {
        // height: '100%',
        left: 0,
        position: 'absolute',
        top: 0,
        width: '100%',
    },
    header: {
        // alignItems: 'center',
        // display: 'flex',
        // flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        paddingHorizontal: 20,
        // paddingVertical: 10,
        width: '100%',
    },
    slide: {
        height: 100,
        position: 'absolute',
        top: 20,
        width: '100%',
    },
});


export default DirectionControl;
