// import React from 'react';
// import { storiesOf } from '@storybook/react-native';
// import { View } from 'react-native';
// import Table from './Table';

// const data = [];

// for (let index = 0; index < 100; index++)
// {
//     data.push({ id: 'aksljdklas1' + index,title: 'hehe' + index });
// }

// const App = ()=>
// {
    

//     return (
//         <View
//             style={{ flex: 1 }}
//         >
//             <Table
//                 columns={[
//                     { title: 'Title', width: 250,dataKey: 'title' },
//                     { title: 'Title', width: 150,dataKey: 'id', render: (data)=>(<View style={{ width: 10,height: 10,backgroundColor: 'red' }} />) },
//                     { title: 'Title', width: 100,dataKey: 'title' },
//                     { title: 'Title', width: 200,dataKey: 'title' },
//                 ]}
//                 data={data}
//                 onRowClick={(data)=>console.error(data)
//                 }
//             />
//         </View>
//     );
// };

// storiesOf('Layout', module).add('Table', () => (
//     <App />
// ));
