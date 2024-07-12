// import React, { FC, useEffect, useState } from 'react';
// import { View } from 'react-native';
// import Map from '../Map/index';
// import { AdministrativeMarker } from './AdministrativeMarker';

// type AdministrativeMapProps = {
//     onLocationChange?: Function,
//     center?: number[],
//     zoom?: number,
// }

// const AdministrativeMap: FC<AdministrativeMapProps> = (props) =>
// {
//     const {
//         center,
//         onLocationChange,
//         zoom,
//     } = props;

//     const [map, setMap] = useState<any>(undefined);
//     const [ mapCenter, setMapCenter] = useState<any>(center);

//     useEffect(() =>
//     {
//         if (map)
//         {
//             if (center)
//             {
//                 if (mapCenter[0] !== center[0] || mapCenter[1] !== center[1])
//                 {
//                     setMapCenter(center);
//                 }
//             }
//         }
//     }, [center]);

//     // update location when move end
//     const handleLocationChange = (event: any) =>
//     {
//         onLocationChange && onLocationChange(event);
//     };

//     const handleMapRef = (mapRef: any) =>
//     {
//         if (!map)
//         {
//             setMap(mapRef);
//         }
//     };

//     return (
//         <View style={{ width: '100%', height: 300 }}>
//             <Map
//                 defaultLocation={mapCenter || [0, 0]}
//                 zoomLevel={zoom || 17}
//                 mapRef={handleMapRef}
//             >
//                 <AdministrativeMarker
//                     location={mapCenter || [0, 0]}
//                     onLocationChange={handleLocationChange}
//                 />
//             </Map>
//         </View>
//     );
// };

// export { AdministrativeMap };
