import * as React from 'react';
import Map from './';
import { ToastShowParams } from '../Toast/types';

export interface IAllProviderProps {
    toast?:{
        show: (params: ToastShowParams) => void;
    }
    children: React.ReactNode | JSX.Element | any;
}

export function AllProvider (props: IAllProviderProps):JSX.Element
{
    return (
        <Map.MapProvider>
            <Map.DirectionProvider toast={props.toast}>
                <Map.SearchLocationProvider>
                    <Map.MeasureProvider>
                        {props.children}
                    </Map.MeasureProvider>
                </Map.SearchLocationProvider>
            </Map.DirectionProvider>
        </Map.MapProvider>
    );
}
