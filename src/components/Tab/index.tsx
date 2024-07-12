// import * as React from 'react';
// import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
// import Text from '../Text/Text';
// import Colors from '../theme/colors';

// export interface dataTab{
//     title: string,
//     component: any,
//     key: number,
// }

// export interface ITabProps {
//     data: dataTab[],
//     handleChangeTab?: (key:number)=> void,
// }

// export const Tab:React.FC<ITabProps> = ({
//     data,
//     handleChangeTab,
// }) =>
// {
//     const [ selectedTabs, setSelectedTabs ] = React.useState(0);

//     const handleChooseTabs = (key: number) =>
//     {
//         setSelectedTabs(key);

//         if (handleChangeTab)
//         {
//             handleChangeTab(key);
//         }
//     };


//     const renderComponent = () =>
//     {
//         return (
//             <>
//                 {data?.map((item) =>
//                 {
//                     const displayScreen = StyleSheet.create({
//                         viewLayout: {
//                             display: item.key === selectedTabs ? 'flex' : 'none',
//                             flex: 1,
//                             height: '90%',
//                         },
//                     });

//                     return (
//                         <View
//                             key={item.key}
//                             style={displayScreen.viewLayout}
//                         >
//                             {item?.component}
//                         </View>
//                     );
//                 })}
//             </>
//         );
//     };


//     const TabLayout = ():JSX.Element =>
//     {
//         return (
//             <View style={[
//                 styles.bottomTabs2,
//                 { backgroundColor: Colors.Surface },
//             ]}
//             >
//                 {data?.map((layout: dataTab) =>
//                 {
//                     return (
//                         <TouchableOpacity
//                             key={layout.key}
//                             style={[styles.home,{ width: Dimensions.get('window').width / data.length,backgroundColor: Colors.SurfaceVariants }]}
//                             onPress={() => handleChooseTabs(layout.key)}
//                         >
//                             <Text
//                                 colorScheme={selectedTabs === layout.key ? Colors.OnSurface : Colors.OnSurfaceVariants}
//                                 title={layout.title}
//                                 fontFamily={selectedTabs === layout.key ? 'Nunito-Bold' : undefined}
//                             />
//                             {selectedTabs === layout.key && <View style={styles.bottomLine} />}
//                         </TouchableOpacity>
//                     );
//                 })}
//             </View>
//         );
//     };

//     return (
//         <View style={styles.container}>
//             <TabLayout />
//             {renderComponent()}
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     bottomLine: {
//         'backgroundColor': '#37A6FF',
//         borderRadius: 100,
//         height: 4,
//         marginTop: 2,
//         width: 20,
//     },
//     bottomTabs2: {
//         flexDirection: 'row',
//         height: 45,
//     },
//     container: {
//         alignItems: 'center',
//         display: 'flex',
//         flexDirection: 'column',
//         height: '100%',
//         position: 'relative',
//         width: '100%',
//     },

//     home: {
//         alignItems: 'center',
//         height: '100%',
//         justifyContent: 'center',
//     },
// });
