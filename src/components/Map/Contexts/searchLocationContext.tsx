import React, { createContext, Dispatch, SetStateAction, useContext, useRef, useState } from 'react';
import { FlatList } from 'react-native';
import { MapContext } from './mapContext';

export interface SearchLocationContextProps
{
    handleClick: (coord: number[]) => void;
    handleClickSearchBtn: () => void;
    centerCoordinate: number[];
    isPresent: boolean;
    showSearchInput: boolean;
    fetureCollect: any;
    handleShowBtnSearch: (set: boolean) => void;
    setSearchInput: (set: boolean) => void;
    setFutureCollect: (feture: any) => void;
    setCenter: Dispatch<SetStateAction<number[]>>;
    setValueInput: Dispatch<SetStateAction<boolean>>;
    valueInput: boolean;
    setShowSearchInput: Dispatch<SetStateAction<boolean>>;
    dataSearch: {
        docs: any[]
    },
    setDataSearch: Dispatch<SetStateAction<any>>,
    onMarkerClick: (_coord: any)=>void
    scroll: React.RefObject<FlatList>

}

/** khởi tạo context của MapDirection */
export const SearchLocationContext = createContext<SearchLocationContextProps>({} as SearchLocationContextProps);

const SearchLocationProvider = (props): any =>
{
    const { camera } = useContext(MapContext);

    const { children } = props;

    const [centerCoordinate, setCenter] = useState<number[]>([]);
    const [isPresent, setIsPresent] = useState(false);
    const [valueInput, setValueInput] = useState<boolean>(false);
    const [dataSearch, setDataSearch] = useState<any>({ docs: [] });
    const scroll = useRef<FlatList>();


    const onClickItem = (coord: number[]) =>
    {
        setCenter(coord);
        setTimeout(() =>
        {
            camera.current?.setCamera({
                zoomLevel: 15,
                centerCoordinate: coord,
                animationMode: 'flyTo',
                animationDuration: 500,
            });
        }, 300);

    };

    const onMarkerClick = (coord: any) =>
    {
        const d = dataSearch?.docs.find(doc => doc.id === coord.id);
        if (d)
        {
            setCenter(coord.geometry.coordinates);
            scroll.current?.scrollToIndex({ animated: true, index: dataSearch.docs.indexOf(d) });
            onClickItem(coord.geometry.coordinates);
        }
        
    };

    const [showSearchInput, setShowSearchInput] = useState(false);
    const toggleSearchTxtInput = () =>
    {
        setShowSearchInput(!showSearchInput);
    };
    const setSearchInput = (set) =>
    {
        setShowSearchInput(set);
    };

    const setBtnSearch = (set) =>
    {
        setIsPresent(set);
    };

    const [fetureCollect, setFeture] = useState({});
    const setFutureCollect = (feture) =>
    {
        setFeture(feture);
    };

    return (
        <SearchLocationContext.Provider value={{
            handleClick: onClickItem,
            centerCoordinate,
            isPresent,
            handleClickSearchBtn: toggleSearchTxtInput,
            showSearchInput, setShowSearchInput,
            handleShowBtnSearch: setBtnSearch,
            setSearchInput: setSearchInput,
            fetureCollect,
            setFutureCollect: setFutureCollect,
            setCenter,
            valueInput,
            setValueInput,
            dataSearch, setDataSearch,
            onMarkerClick,
            scroll,
        }}
        >
            {children}
        </SearchLocationContext.Provider>
    );
};

export { SearchLocationProvider };
