// import { AuthHelper } from '../../helper/auth.helper';

// class FileService
// {
//     apiURL: string;

//     constructor (apiURL)
//     {
//         this.apiURL = apiURL;
//     }

//     getContent = async (nodeId: string): Promise<any> =>
//     {
//         const response = await fetch(`${this.apiURL}/api/v1/folder/GetContentById/${nodeId}`, { method: 'GET', headers: AuthHelper.getVDMSHeader() });
//         return response;
//     };

//     getFile = async (path: string): Promise<any> =>
//     {
//         if (!path)
//         {
//             throw new Error('Invalid path');
//         }

//         if (this.cacheFiles[path])
//         {
//             return this.cacheFiles[path];
//         }

//         try
//         {
//             const response = await fetch(`${this.apiURL}/api/v1/file/adv?path=${path}`, { method: 'GET', headers: AuthHelper.getVDMSHeader() });

//             const blob = await response.blob();
//             const url = URL.createObjectURL(blob);

//             this.cacheFiles[path] = url;

//             return url;
//         }
//         catch (e)
//         {
//             const error = e as any;
//             throw new Error(error?.message);
//         }
//     };

//     cacheFiles: any;
// }

// export default FileService;
