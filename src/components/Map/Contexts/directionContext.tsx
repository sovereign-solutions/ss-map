import React, { createContext, useContext, useEffect, useState } from 'react';
import { Dimensions, Keyboard, Platform } from 'react-native';
import { DirectionService } from '../../../services/direction.service';
import Toast from '../../Toast/Toast';
import { lineString as makeLineString } from '@turf/helpers';
import { CommonHelper } from '../../../helper/common.helper';
import { MapContext } from './mapContext';
export interface DirectionContextProps {
    title: string,
    setTitle: (title: string) => void,
    /**
    *   Lấy dữ liệu tìm đường từ API bằng mảng các điểm đến
    */
    getDirections: (coord: number[][], typeVehs?: number, crits?: number) => void,
    route: any,
    endPoint: number[],
    requestText: string[],
    address: string[],
    /** dữ liệu tìm đường sau khi đã chuẩn bị xong */
    data: any,
    indice: number,
    setIndice: (indice: number) => void,
    arrow: any,
    routePoints: number[][],
    isShowDirection: boolean,
    setIsShowDirection: (isShowDirection: boolean) => void
    setShowTime: (showTime: boolean) => void
    sectionData: any;
    showTime: boolean;
    searchView: boolean,
    setSearchView: (state:boolean) => void,
    refreshing: boolean,
    setRefreshing: (state:boolean) => void,
    sheetVisible: boolean,
    setSheetVisible: (state:boolean) => void,
    setData: (data:any) => void,
    setRoute: (data:any | null) => void,
    setArrow : (data:any) => void,
    typeVeh: number,
    setTypeVeh: (number:number) => void
    setRequestText: (data:any) => void;
    setRoutePoints: (data:any) => void;
    preX: number;
    setPreX: (num:number) => void;
    setAddress: (address:any) => void;
    crit: number,
    setCrit: (crit:number) => void
    isCustomCoord: boolean;
    setIsCustomCoord: (isCustomCoord:boolean) => void;
    loadingReRoute: boolean;
    setLoadingReRoute: (isCustomCoord:boolean) => void;
    mapCenter: any;
    setMapCenter: (mapCenter:any) => void;
    routeSelectedPoints: number[][],
    setRouteSelectedPoints: React.Dispatch<React.SetStateAction<number[][]>>;
    whichJustUpdate: number,
    setWhichJustUpdate: (i: number) => void;
}

export type Steps = {
    Distances?: any[]
    Durations?: any[]
    Indices?: any[]
    Names?: string[]
    Turns?: any[]
}
export interface Viaroute {
    Geometry?: any;
    Steps?: Steps;
    Via_Distances?: any[]
    Via_Durations?: any[]
    Via_Indices?: any[]
    oriOrder?: any
}

/** khởi tạo context của MapDirection */
export const DirectionContext = createContext<DirectionContextProps>({} as DirectionContextProps);

const DirectionProvider = (props):any =>
{
    const directionService = new DirectionService();
    const { children } = props;

    // wrapper context

    const map = useContext(MapContext);

    // test
    const [title, setTitle] = useState<string>('hie');


    // core state
    const [route, setRoute] = useState<any>(null);
    const [endPoint, setEndPoint] = useState<number[]>([]);
    const [routePoints, setRoutePoints] = useState<number[][]>([]);
    const [routeSelectedPoints, setRouteSelectedPoints] = useState<number[][]>([[], [], [], [], []]);
    const [typeVeh, setTypeVeh] = useState<number>(3);
    const [requestText,setRequestText] = useState<string[]>(['My location','']);
    const [crit, setCrit] = useState<number>(0);
    const [address,setAddress] = useState<string[]>(['','']);
    const [data,setData] = useState<any[]>([]);
    const [arrow,setArrow] = useState<any[]>([]);
    const [sectionData,setSectionsData] = useState<any[]>([]);
    const [indice,setIndice] = useState<number>(0);
    const [preX,setPreX] = useState<number>(0);
    /**
     *  control show Direction
     */
    const [isShowDirection,setIsShowDirection] = useState<boolean>(false);
    const [showTime,setShowTime] = useState<boolean>(false);
    const [searchView,setSearchView] = useState<boolean>(false);
    const [refreshing,setRefreshing] = useState<boolean>(false);
    const [sheetVisible,setSheetVisible] = useState<boolean>(true);
    const [isCustomCoord,setIsCustomCoord] = useState<boolean>(false);
    const [loadingReRoute,setLoadingReRoute] = useState<boolean>(false);
    const [mapCenter,setMapCenter] = useState<{}>();
    const [whichJustUpdate,setWhichJustUpdate] = useState(0);

    // const [data,setData] = useState<any[]>([]);
    // get Route

    const showToast = (value: string) =>
    {
        const show = typeof props?.toast?.show === 'function' ? props.toast.show : Toast.show;
        show({
            type: 'error',
            title: 'Navigation failed',
            message: value,
            visibilityTime: 5000,
            bottomOffset: Platform.OS === 'android' ? Dimensions.get('screen').height * 0.1 : Dimensions.get('screen').height * 0.12,
            position: 'bottom',
        });
    };

    const getDirections = async (coord: number[][], typeVehs?: number, crits?: number) =>
    {
        setLoadingReRoute(true);

        Keyboard.dismiss();
        if (coord.length < 2)
        {
            return;
        }
        // coord[0][0] = 0;
        // coord[0][1] = 0;

        console.log('getDirections2', coord);
        if (coord[0][1] === 0 && coord[0][1] === 0)
        {
            console.log('Sorry! Unable to calculate the directions. Please try again.');
            showToast('Sorry! Unable to calculate the directions. Please try again.');

            map.setMode('direct');
            setRoute(null);
            setArrow([]);
            setShowTime(false);
            setSheetVisible(true);
            setRoutePoints([]);
            setLoadingReRoute(false);
            return;
        }

        if (typeVehs === undefined)
        {
            typeVehs = typeVeh;
        }
        if (crits === undefined)
        {
            crits = crit;
        }
        setEndPoint(coord[coord.length - 1]);
        setRoutePoints(coord);
        let data: Viaroute[] = [];
        await directionService.getRouteAvoidBarrierDebounced(
            coord,
            // typeVehs,
            // crits,
            // 'barrier_id_test',
            // 0,
            // 1,
        ).then((x)=>
        {
            if (!x)
            {
                showToast('This route was not found');

                map.setMode('direct');
                setRoute(null);
                setArrow([]);
                setShowTime(false);
                setSheetVisible(true);
                setRoutePoints([]);
            }
            // else if (x === 'Unsupported vehicle type')
            // {
            //     showToast(x);
            //
            //     map.setMode('direct');
            //     setRoute(null);
            //     setArrow([]);
            //     setShowTime(false);
            //     setSheetVisible(true);
            //     setRoutePoints([]);
            // }
            // else if (x === 'No solution found')
            // {
            //     showToast(x);
            //
            //     map.setMode('direct');
            //     setRoute(null);
            //     setArrow([]);
            //     setShowTime(false);
            //     setSheetVisible(true);
            //     setRoutePoints([]);
            // }
            // else if (x === 'One of the coordinates could not snap to street segment')
            // {
            //     showToast(x);
            //
            //     map.setMode('direct');
            //     setRoute(null);
            //     setArrow([]);
            //     setShowTime(false);
            //     setSheetVisible(true);
            //     setRoutePoints([]);
            // }
            else
            {
                if (x && x[0] && x[0].Steps)
                {
                    const distances = x[0]?.Via_Distances.map(e => e === 0);
                    const resultDistances = distances.some(item => item === false);

                    const durations = x[0]?.Via_Durations.map(e => e === 0);
                    const resultDurations = durations.some(item => item === false);
                    if (resultDistances && resultDurations)
                    {
                        data = x;
                        map.setMode('directRoute');
                    }
                    else
                    {
                        showToast('This route was not found');
                        map.setMode('direct');
                        setRoute(null);
                        setArrow([]);
                        setShowTime(false);
                        setSheetVisible(true);
                        setRoutePoints([]);
                    }
                }
            }
            setLoadingReRoute(false);
        }).catch((err)=>console.log(err, 'err hare'));

        if (data && data.length > 0)
        {
            const section = requestText.map((te,i)=>
            {
                if (i !== 0)
                {
                    const tmp = Object.assign({}, data[0]);
                    if (tmp && tmp.Steps !== undefined)
                    {
                        const indexOfIndies = tmp.Steps.Indices?.indexOf(data[0].Via_Indices?.[i]);
                        const indexOfIndiesPre = tmp.Steps.Indices?.indexOf(data[0].Via_Indices?.[i - 1]);

                        const dataTmp = tmp.Steps.Names?.map((_e,index:number)=>
                        {
                            return index >= Number(indexOfIndiesPre) && index <= (Number(indexOfIndies) - 1) && {
                                name: _e,
                                index,
                                duration: tmp.Steps?.Durations?.[index],
                                distance: tmp.Steps?.Distances?.[index],
                                turn: tmp.Steps?.Turns?.[index],
                                indice: tmp.Steps?.Indices?.[index],
                            };
                        }).filter(e=>e !== false);


                        return {
                            title: requestText[i - 1],
                            address: address[i - 1],
                            data: dataTmp,
                        };
                    }
                    else
                    {
                        return {
                            title: '',
                            address: '',
                            data: {},
                        };
                    }

                }
            }).filter(e=>e !== undefined);

            section.push({
                title: requestText[requestText.length - 1],
                address: address[address.length - 1],
                data: [] as any,
            });

            const routes = makeLineString(data[0].Geometry) as any;
            const arrows: any = [];
            if (data[0] && data[0].Steps && data[0].Geometry && data[0].Steps.Indices)
            {
                data[0].Steps.Indices.map((e:number, index:number)=>
                {
                    const step = {
                        name: data[0].Steps?.Names?.[index],
                        turn: data[0].Steps?.Turns?.[index],
                        start: e,
                        lng: data[0].Geometry?.[e]?.[0],
                        lat: data[0].Geometry?.[e]?.[1],
                    };

                    const coordinates = CommonHelper.drawDirectionArrow(data[0].Geometry, step);

                    arrows.push([makeLineString(coordinates),CommonHelper.drawArrow(coordinates)]);
                });
            }

            const arrowTmp = arrows.map((_arrow, index)=>({
                ..._arrow,
                index,
            }));

            setData(data);
            setRoute(routes);
            setArrow(arrowTmp);
            setSectionsData(section);
            setSearchView(false);
            setShowTime(true);
            setPreX(0);
            setSheetVisible(true);

            setTimeout(() =>
            {
                const myCoords = data[0]?.Geometry;

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

                    setBounds({
                        t: 1000,
                        bound: [150, 50, 150, 50],
                        NE2, SW2,
                    });
                }
            }, 200);
        }
    };

    const [bounds,setBounds] = useState<any>(null);


    useEffect(() =>
    {

        if (map && map.camera && map.camera.current !== undefined && bounds)
        {
            map.camera.current?.fitBounds(bounds.NE2, bounds.SW2, bounds.bound,bounds.t);
        }

    },[bounds,map]);

    const setNewTitle = (_title: string) =>
    {
        setTitle(_title);
    };

    return (
        <DirectionContext.Provider value={{
            title,
            setTitle: setNewTitle,
            getDirections,
            data,setData,
            requestText,setRequestText,
            route,setRoute,
            address,setAddress,
            sectionData,
            endPoint,
            indice,setIndice,
            routePoints,setRoutePoints,
            preX,setPreX,
            arrow,setArrow,
            isShowDirection,setIsShowDirection,
            showTime,setShowTime,
            searchView,setSearchView,
            refreshing,setRefreshing,
            sheetVisible,setSheetVisible,
            typeVeh,setTypeVeh,
            crit,setCrit,
            isCustomCoord,setIsCustomCoord,
            loadingReRoute,setLoadingReRoute,
            mapCenter,setMapCenter,
            routeSelectedPoints,setRouteSelectedPoints,
            whichJustUpdate,setWhichJustUpdate,
        }}
        >
            {children}
        </DirectionContext.Provider>
    );
};

// DirectionProvider = observer(DirectionProvider);
export { DirectionProvider };
