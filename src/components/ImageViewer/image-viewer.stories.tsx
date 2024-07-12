// import React from 'react';
// import { storiesOf } from '@storybook/react-native';
// import { View } from 'react-native';

// import Container from '../Container/Container';

// import { AsyncImage } from '../../';
// import PopupImage from './image-popup';

// const App = () =>
// {
//     const [visible,setVisible] = React.useState(false);
//     const [uri,setUri] = React.useState('');

//     const showImage = (image:string) =>
//     {
//         setUri(image);
//         setVisible(true);
//     };
//     return (
//         <Container>
//             <View style={{ flex: 1 }}>
//                 {/* <ImageViewer
//                     imageUrls={[
//                         { url: 'https://s3.getstickerpack.com/storage/uploads/sticker-pack/genshin-impact-raiden/tray_large.png', freeWidth: true },
//                     ]}
//                     onCancel={()=>console.log(111)}
//                 /> */}

//                 {/* Pressable */}
//                 <AsyncImage
//                     width={100}
//                     height={100}
//                     uri={'https://s3.getstickerpack.com/storage/uploads/sticker-pack/genshin-impact-raiden/tray_large.png'}
//                     onClick={()=>showImage('https://s3.getstickerpack.com/storage/uploads/sticker-pack/genshin-impact-raiden/tray_large.png')}
//                 />
//                 <AsyncImage
//                     width={100}
//                     height={100}
//                     uri={'file:///sdcard/media.png'}
//                     onClick={()=>showImage('file:///sdcard/media.png')}
//                 />
//                 <AsyncImage
//                     width={100}
//                     height={100}
//                     uri={'https://cellphones.com.vn/sforum/wp-content/uploads/2022/01/yae-1.jpg'}
//                     onClick={()=>showImage('https://cellphones.com.vn/sforum/wp-content/uploads/2022/01/yae-1.jpg')}
//                 />

//             </View>
//             <PopupImage
//                 visible={visible}
//                 images={[
//                     { url: uri, freeWidth: true },
//                 ]}
//                 onCancel={()=>setVisible(false)}
//             />
//         </Container>
//     );
// };

// storiesOf('Layout', module).add('ImgView', () => (
//     <App />
// ));
