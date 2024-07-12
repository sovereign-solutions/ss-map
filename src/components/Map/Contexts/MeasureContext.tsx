import React, { createContext, useState } from 'react';

export interface MeasureContextProps
{
    onPlaceNewPoint: (coord: number[]) => void;
    routeMap: number[][];
    onRefresh: () => void;
    isMeasuring: boolean;
    setIsMeasuring: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MeasureContext = createContext<MeasureContextProps>({} as MeasureContextProps);

const MeasureProvider = (props): any =>
{
    const { children } = props;

    const [routeMap, setRouteMap] = useState<number[][]>([]);
    const [isMeasuring, setIsMeasuring] = useState<boolean>(false);

    React.useEffect(() =>
    {
        if (!isMeasuring)
        {
            setRouteMap([]);
        }
    }, [isMeasuring]);

    const onPlaceNewPoint = (point: number[]) =>
    {
        setRouteMap((val) => [...val, point]);
    };

    const onRefresh = () =>
    {

    };

    return (
        <MeasureContext.Provider value={{
            onPlaceNewPoint,
            routeMap,
            isMeasuring, setIsMeasuring,
            onRefresh,
        }}
        >
            {children}
        </MeasureContext.Provider>
    );
};

export { MeasureProvider };
