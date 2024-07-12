// import React, { useEffect, useState } from 'react';

// import FileService from '../../services/files/file.service';
// import AsyncImage from '../Image/AsyncImage';
// import storage from '../storage/mmkv';
// import SvgIcon from '../SvgIcon/SvgIcon';

// export const LayerIcon = (props) =>
// {
//     const baseUrl = storage.getString('BASE_URL');
//     const token = storage.getString('USER_TOKEN');

//     const { path, layer, width, height } = props;

//     const file = new FileService();

//     const [iconPath, setIconPath] = useState('');

//     useEffect(() =>
//     {
//         if (path)
//         {
//             file.getFile(path).then(rs =>
//             {
//                 setIconPath(rs);
//             });
//         }
//         else if (layer)
//         {
//             setIconPath(`${baseUrl}/service/vdms/app/render/GetLayerIcon.ashx?LayerName=${layer.toUpperCase()}&access_token=${token}`);
//         }
//     }, [layer]);

//     if (layer === 'null')
//     {
//         return (
//             <SvgIcon
//                 name="ic_default"
//                 width={24}
//                 height={24}
//             />
//         );
//     }

//     return (
//         <AsyncImage
//             uri={new Promise<string>((resolve) => { resolve(iconPath);})}
//             width={width}
//             height={height}
//         />
//     );
// };
