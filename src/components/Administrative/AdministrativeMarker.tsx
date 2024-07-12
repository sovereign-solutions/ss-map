// import React, { FC } from 'react';
// import MapboxGL from '@react-native-mapbox-gl/maps';
// import FAIcon from '../FAIcon/FAIcon';

// type AdministrativeMarkerProps = {
//     onLocationChange(location: any): any,
//     location: number[]
// }
// const AdministrativeMarker: FC<AdministrativeMarkerProps> = (props) =>
// {
//     const onDragEnd = (e: any) =>
//     {
//         if (typeof props.onLocationChange === 'function')
//         {
//             props.onLocationChange(e.geometry.coordinates);
//         }
//     };

//     return (
//         <>
//             {
//                 <MapboxGL.PointAnnotation
//                     key={'admintrative-marker'}
//                     id={'admintrative-marker-id'}
//                     coordinate={props.location}
//                     draggable
//                     onDragEnd={onDragEnd as () => void}
//                 >
//                     <FAIcon icon="map-marker-alt" />
//                 </MapboxGL.PointAnnotation>
//             }
//         </>
//     );
// };
// export { AdministrativeMarker };
