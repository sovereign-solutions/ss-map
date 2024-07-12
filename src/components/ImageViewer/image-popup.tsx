// import React from 'react';
// import { View } from 'react-native';
// import ImageViewer from './image-viewer.component';
// import { IImageInfo } from './image-viewer.type';
// import PropTypes from 'prop-types';

// interface Props{
// images: IImageInfo[];
// onCancel: () => void;
// visible: boolean;
// }

// const PopupImage: React.FC<Props> = ({
//     images,
//     onCancel,
//     visible,
// }) =>
// {

//     const [localVisibility,setVisible] = React.useState(visible);

//     React.useEffect(()=>
//     {
//         setVisible(visible);
//     },[visible]);

//     return (
//         <React.Fragment>
//             {
//                 localVisibility && (
//                     <View style={{
//                         flex: 1,
//                         position: 'absolute',
//                         top: 0,
//                         left: 0,
//                         width: '100%',
//                         height: '100%',
//                     }}
//                     >
//                         <ImageViewer
//                             imageUrls={images}
//                             enableSwipeDown
//                             onCancel={onCancel}
//                         />
//                     </View>
//                 )
//             }

//         </React.Fragment>
//     );
// };

// type Image = IImageInfo;

// PopupImage.propTypes = {
//     images: PropTypes.arrayOf(PropTypes.any).isRequired,
//     visible: PropTypes.bool.isRequired,
//     onCancel: PropTypes.func.isRequired,
// };


// export default PopupImage;
