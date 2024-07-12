// import { Text, TouchableOpacity, View } from 'react-native';
// import * as React from 'react';
// import Colors from '../theme/colors';
// import { Header, MuiColumn } from './Header';
// import { ScrollView } from 'react-native-gesture-handler';


// export interface Props
// {
//     columns: MuiColumn[];
//     data: any;
//     onRowClick?: (data: any,rowIndex:number) => void;
//     selectedRow?: any;
//     type: string,
//     notScrollFirstCol?: boolean | undefined;
// }

// const R = (column: MuiColumn, index: number, data: any, notScrollFirstCol?: boolean | undefined) =>
// {
//     if (column.render)
//     {
//         return (
//             <View
//                 key={column.title + index + Math.random()}
//                 style={{ width: column.width }}
//             >
//                 {column.render(data, index)}
//             </View>
//         );
//     }
//     return (
//         <View
//             key={column.title + index + Math.random()}
//             style={{ width: column.width }}
//         >
//             {notScrollFirstCol === true
//                 ? (
//                         <Text
//                             numberOfLines={1}
//                             style={{ color: Colors.OnSurface, textAlign: 'center' }}
//                         >
//                             {data[column.dataKey] ?? ''}
//                         </Text>
//                     )
//                 : <Text style={{ color: Colors.OnSurface }}>{data[column.dataKey] ?? ''}</Text>}
//         </View>
//     );
// };

// export const Row: React.FC<Props> = (props: Props): JSX.Element =>
// {
//     const [selected, setSelected] = React.useState(-1);
//     const { selectedRow } = props;

//     const onRowSelect = (row, index) =>
//     {
//         // Nếu quản lý row = state từ cha thì không cần sử dụng state trong component
//         if (!selectedRow)
//         {
//             setSelected(index);
//         }
//         props.onRowClick && props.onRowClick(row,index);
//     };

//     const normalRow = () =>
//     {
//         return (
//             <View style={{ display: 'flex', flexDirection: 'column' }}>
//                 {

//                     Array.isArray(props?.data) && props?.data?.map((r, i) => (
//                         <TouchableOpacity
//                             key={r.id ?? Math.random() * 100}
//                             style={{ display: 'flex', flexDirection: 'row', backgroundColor: i % 2 === 0 ? Colors.Background : Colors.Surface, minHeight: 35, alignItems: 'center' }}
//                             onPress={() => onRowSelect(r, i)}
//                         >
//                             {props.columns.map((col, index) => R(col, index, r))}
//                         </TouchableOpacity>
//                     ))
//                 }
//             </View>

//         );
//     };

//     const rowNotPullFirstColumn = () =>
//     {
//         return (
//             <View style={{ flexDirection: 'row' }}>
//                 <View style={{ width: '50%' }}>
//                     <View
//                         style={{
//                             height: 40,
//                             display: 'flex',
//                             flexDirection: 'row',
//                             'shadowColor': '#000',
//                             shadowOffset: {
//                                 width: 0,
//                                 height: 2,
//                             },
//                             shadowOpacity: 0.23,
//                             shadowRadius: 2.62,
//                             elevation: 3,
//                             backgroundColor: Colors.Surface,
//                         }}
//                     >
//                         <View
//                             style={{ width: '100%', justifyContent: 'center' }}
//                         >
//                             <Text>{props.type === 'Flower' ? 'Title' : props.columns[0]?.title}</Text>

//                         </View>
//                     </View>
//                     {Array.isArray(props?.data) && props?.data?.map((r, i) => (
//                         <TouchableOpacity
//                             key={r.id ?? Math.random() * 100}
//                             style={{
//                                 display: 'flex',
//                                 width: '100%',
//                                 flexDirection: 'row',
//                                 backgroundColor: selectedRow === r || i === selected ? Colors.PrimaryVariantsThird : i % 2 === 0 ? Colors.Background : Colors.Surface,
//                                 minHeight: 40,
//                                 alignItems: 'center',
//                             }}
//                             onPress={() => onRowSelect(r, i)}
//                         >
//                             <Text numberOfLines={1}>{props.type === 'Flower' ? r.Title : r.val}</Text>
//                         </TouchableOpacity>
//                     ))}
//                 </View>
//                 <ScrollView
//                     horizontal
//                     showsVerticalScrollIndicator
//                     persistentScrollbar
//                 >
//                     <View style={{ height: 100 }}>
//                         <Header {...props} />
//                         <View style={{ display: 'flex', flexDirection: 'column' }}>
//                             {
//                                 Array.isArray(props?.data) && props?.data?.map((r, i) => (
//                                     <View
//                                         key={r.id ?? Math.random() * 100}
//                                         style={{
//                                             display: 'flex',
//                                             flexDirection: 'row',
//                                             backgroundColor: selectedRow === r || i === selected ? Colors.PrimaryVariantsThird : i % 2 === 0 ? Colors.Background : Colors.Surface,
//                                             minHeight: 40,
//                                             alignItems: 'center',
//                                         }}
//                                     >
//                                         {props.columns.map((col, index) => (props.type === 'Flower' ? col.dataKey !== 'Title' : col.dataKey !== 'val') && R(col, index, r, props.notScrollFirstCol))}
//                                     </View>
//                                 ))
//                             }
//                         </View>
//                     </View>
//                 </ScrollView>
//             </View>
//         );
//     };

//     return (
//         props.notScrollFirstCol === true ? rowNotPullFirstColumn() : normalRow()
//     );
// };
