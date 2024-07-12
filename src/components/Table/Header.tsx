// import { Text, View } from 'react-native';
// import Colors from '../theme/colors';
// import * as React from 'react';


// export interface MuiColumn{
//     title: string;
//     width: number;
//     dataKey: string;
//     render?: (data: any,index: number)=>JSX.Element | React.ReactNode | undefined,
// }

// export interface Props{
//     columns: MuiColumn[];
//     type: string,
//     notScrollFirstCol?: boolean | undefined;
// }

// const col = (column: MuiColumn,index: number) =>
// {
//     return (
//         <View
//             key={column.title + index + Math.random()}
//             style={{ width: column.width,display: 'flex',justifyContent: 'center' }}
//         >
//             <Text
//                 style={{ color: Colors.OnSurface, textAlign: 'center' }}
//             >
//                 {column.title}
//             </Text>
//         </View>
//     );
// };

// export const Header:React.FC<Props> = (props: Props):JSX.Element=>
// {
//     const columnFilter = props.columns.filter(rs => props.type === 'Flower' ? rs.dataKey !== 'Title' : rs.dataKey !== 'val');
//     return (
//         <View
//             style={{
//                 height: 40,
//                 display: 'flex',
//                 flexDirection: 'row',
//                 'shadowColor': '#000',
//                 shadowOffset: {
//                     width: 0,
//                     height: 2,
//                 },
//                 backgroundColor: Colors.Surface,
//                 shadowOpacity: 0.23,
//                 shadowRadius: 2.62,
//                 elevation: 3,
//             }}
//         >
//             {props.notScrollFirstCol === true ? columnFilter.map(col) : props.columns.map(col)}
//         </View>
//     );
// };
