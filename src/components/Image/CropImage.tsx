// import PropTypes from 'prop-types';
// import React, { useState } from 'react';
// import ImageEditor from "@react-native-community/image-editor";
// import { Image, View } from 'react-native';

// export type CropImageProps = {
//     uri: string;
//     width: number;
//     height: number;
//     box: any;
//     unit?: string,
//     borderColor?: string,
// }

// const CropImage: React.FC<CropImageProps> = ({
//     uri,
//     width,
//     height,
//     box,
//     unit,
//     borderColor
// }) =>
// {
//     const [imageUrl, setImageUrl] = useState('');

//     const cropImage = (box: any) => {
//         if (!imageUrl)
//         {
//             ImageEditor.cropImage(uri, {
//                 offset: { x: box.x, y: box.y },
//                 size: { width: box.width, height: box.height },
//                 displaySize: { width, height },
//                 resizeMode: 'stretch'
//             }).then(url => {
//                 setImageUrl(url);
//             })
//         }
//     };

//     if (uri && box)
//     {
//         if (unit === '%')
//         {
//             Image.getSize(uri, (width, height) => {
//                 const realBox = {
//                     x: Math.floor(box.x * width),
//                     y: Math.floor(box.y * height),
//                     width: Math.ceil(box.width * width),
//                     height: Math.ceil(box.height * height)
//                 }
    
//                 cropImage(realBox);
//             });
//         }
//         else
//         {
//             cropImage(box);   
//         }
//     }

//     let style = { width, height };
//     if (borderColor)
//     {
//         style = Object.assign(style, { borderColor, borderStyle: 'solid', borderWidth: 1 });
//     }

//     return (
//         <View style={style}>
//             {
//                 imageUrl ? <Image 
//                     style={{ width, height }}
//                     source={{
//                         uri: imageUrl
//                     }}
//                 /> : <></>
//             }
//         </View>
//     );
// };

// CropImage.propTypes = {
//     uri: PropTypes.string.isRequired,
//     width: PropTypes.number.isRequired,
//     height: PropTypes.number.isRequired,
//     box: PropTypes.any.isRequired,
//     unit: PropTypes.string,
//     borderColor: PropTypes.string
// };

// export default CropImage;
