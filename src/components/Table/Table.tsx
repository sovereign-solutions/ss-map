// import { View } from 'react-native';
// import * as React from 'react';
// import { Header, MuiColumn } from './Header';
// import { Row } from './Row';
// import { ScrollView } from 'react-native-gesture-handler';


// interface Props
// {
//     data: any;
//     columns: MuiColumn[],
//     onRowClick?: (data: any,rowIndex:number) => void;
//     selectedRow?: any;
//     type: string,
//     notScrollFirstCol?: boolean | undefined;
//     scrollToRow?: boolean | undefined;
// }

// const Table: React.FC<Props> = (props: Props): JSX.Element =>
// {
//     const refScrollView = React.useRef();

//     React.useEffect(()=>
//     {

//         if (props?.selectedRow?.Id && props.scrollToRow)
//         {
//             const index = props.data.findIndex(item=>item.Id === props?.selectedRow?.Id);
//             if (index !== -1)
//             {
//                 refScrollView?.current?.scrollTo({ x: 0, y: index * 40, animated: true });
//             }
//         }
    
//     },[props?.selectedRow?.Id]);

//     const normalTable = () =>
//     {
//         return (
//             <ScrollView
//                 horizontal
//             >
//                 <View style={{ display: 'flex', flexDirection: 'column' }}>
//                     <Header {...props} />
//                     <ScrollView
//                         showsHorizontalScrollIndicator={false}
//                         showsVerticalScrollIndicator={false}
//                     >
//                         <Row {...props} />
//                     </ScrollView>
//                 </View>
//             </ScrollView>
//         );
//     };

//     const tableNotPullFirstColumn = () =>
//     {
//         return (
//             <ScrollView
//                 ref={refScrollView}
//                 showsVerticalScrollIndicator
//                 persistentScrollbar
//             >
//                 <View style={{ display: 'flex', flexDirection: 'column', marginBottom: 20 }}>
//                     <Row {...props} />
//                 </View>
//             </ScrollView>
//         );
//     };
//     return (
//         props.notScrollFirstCol === true ? tableNotPullFirstColumn() : normalTable()
//     );

// };

// export default Object.assign(Table, {
//     Header: Header,
//     Row: Row,
// });
