// import React, { useEffect, useState } from 'react';

// import FileService from '../../services/files/file.service';
// import AsyncImage from '../Image/AsyncImage';
// import storage from '../storage/mmkv';
// import SvgIcon from '../SvgIcon/SvgIcon';

// export const LayerIcon = (props) =>
// {
//     const baseUrl = storage.getString('BASE_URL');
//     const token = storage.getString('USER_TOKEN');

//     const { path, layer, width, height, node } = props;


//     const [iconPath, setIconPath] = useState('');

//     useEffect(() =>
//     {
//         const file = new FileService(baseUrl);
//         if (path)
//         {
//             file.getFile(path).then(rs =>
//             {
//                 setIconPath(rs);
//             });
//         }
//         else if (layer)
//         {
//             if (node.type === 'SHARE_OVERLAY')
//             {
//                 setIconPath(`${baseUrl}/api/vdmsext/app/render/GetLayerIcon.ashx?LayerName=${layer.toUpperCase()}&shareLayerId=${node.id}`);
//             }
//             else
//             {
//                 setIconPath(`${baseUrl}/service/vdms/app/render/GetLayerIcon.ashx?LayerName=${layer.toUpperCase()}&access_token=${token}`);
//             }
//         }
//     }, [baseUrl, layer, node, path, token]);

//     if (layer === 'null' || !layer)
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
//             uri={new Promise<string>((resolve) =>
//             {
//                 resolve(iconPath);
//             })}
//             width={width}
//             height={height}
//             uriheader={{ Authorization: 'bearer ' + token }}
//         />
//     );
// };
