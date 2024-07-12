// import React, { useState } from 'react';
// import { Text, View } from 'react-native';
// import { storiesOf } from '@storybook/react-native';

// import ListLazyLoad from './ListLazyLoad';

// const ListLazyLoadForStoryBook: React.FC<any> = ({}) => {

//     const templateData = [1,2,3,4,5,6,7,8,9,10];
//     const maxDataLength = 100;
//     const [currentPage, setCurrentPage] = useState(1);
//     const [data, setData] = useState(templateData.map((d, index) => {
//         return `Data ${index + 1}`;
//     }));

//     const handleNextLoad = (nextPage: number) => {
//         setTimeout(() => {
//             if (maxDataLength > data.length)
//             {
//                 setCurrentPage(nextPage);

//                 const currentData = templateData.map((d, index) => {
//                     return `Data ${currentPage * templateData.length + index + 1}`;
//                 });
//                 setData(data.concat(currentData));
//             }
//         }, 3000); // delay 3s to simulate call and wait data from api
//     };

//     const handleRefresh = () => {
//         setTimeout(() => {
//             const currentData = templateData.map((d, index) => {
//                 return `Data ${index + 1}`;
//             });
//             setData(currentData);
//             setCurrentPage(1);
//         });
//     }

//     return (
//         <ListLazyLoad 
//             data={data}
//             currentPage={currentPage}
//             isLastPage={maxDataLength <= data.length}
//             onNext={handleNextLoad}
//             onRefresh={handleRefresh}
//             itemTemplate={(d) => {
//                 return <View style={{paddingTop: 50, paddingBottom: 50, paddingLeft: 20, paddingRight: 20, borderWidth:  1, margin: 3}}><Text>{d}</Text></View>;
//             }}
//         />
//     )

// };

// storiesOf('Utils', module).add('ListLayzaLoad', () => (
//     <ListLazyLoadForStoryBook />
// ));
