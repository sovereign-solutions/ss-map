import React, { createContext, RefObject, useEffect, useState } from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';
import Geolocation from 'react-native-geolocation-service';

export interface MapContextProps
{
    mapRef: RefObject<MapboxGL.MapView>,
    camera: RefObject<MapboxGL.Camera>,
    setMapRef: React.Dispatch<React.SetStateAction<React.RefObject<MapboxGL.MapView>>>,
    setCamera: React.Dispatch<React.SetStateAction<React.RefObject<MapboxGL.Camera>>>,
    selectedPointCoordinates: number[],
    setSelectedPointCoordinates: React.Dispatch<React.SetStateAction<number[]>>,
    mode: string,
    setMode: React.Dispatch<React.SetStateAction<string>>,
    userLocation: number[];
    typeButton: number;
    setTypeButton: React.Dispatch<React.SetStateAction<number>>,
    isMapReady: boolean,
    setReady: React.Dispatch<React.SetStateAction<boolean>>
}

export const MapContext = createContext<MapContextProps>({} as MapContextProps);

const MapProvider = (props): any =>
{
    const [isMapReady, setReady] = useState(true);
    const [mapRef, setMapRef] = useState(React.createRef<MapboxGL.MapView>());
    const [cameraRef, setCamera] = useState(React.createRef<MapboxGL.Camera>());
    const [selectedPointCoordinates, setSelectedPointCoordinates] = useState<number[]>([]);
    const [mode, setMode] = useState<string>('');
    const [typeButton, setTypeButton] = useState<number>(1);
    const { children } = props;
    const [userLocation, setUserLocation] = useState<number[]>([]);

    useEffect(() =>
    {
        Geolocation.getCurrentPosition(
            (position) =>
            {
                setUserLocation([position.coords.longitude, position.coords.latitude]);
                console.log('[MapProvider]', 'Position Runtime Check GPS', position);
            },
            (error) =>
            {
                console.log('[MapProvider]', error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, showLocationDialog: true },
        );
    }, []);

    return (
        <MapContext.Provider value={{
            mapRef: { current: mapRef } as any,
            camera: { current: cameraRef } as any,
            setMapRef,
            setCamera,
            selectedPointCoordinates,
            setSelectedPointCoordinates,
            mode,
            setMode,
            userLocation,
            typeButton,
            setTypeButton,
            isMapReady, setReady,
        }}
        >
            {children}
        </MapContext.Provider>
    );
};

export { MapProvider };
