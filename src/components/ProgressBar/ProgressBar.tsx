// import React,{ Component } from 'react';
// import { StyleSheet, Text, View } from 'react-native';

// // import { ColorScheme } from '../../model';
// import { CommonHelper } from '../../helper/common.helper';

// interface Props{
//     max: number;
//     current: number;
//     percentage?: boolean;
//     color?: any;
// }

// export class ProgressBar extends Component<Props>
// {
//     render(): JSX.Element
//     {
//         const styles = StyleSheet.create({
//             base: {
//                 'backgroundColor': '#e0e0e0',
//                 borderRadius: 4,
//                 height: 25,
//                 width: '100%',
//             },
//             floating: {
//                 borderRadius: 4,
//                 height: '100%',
//                 position: 'absolute',
//             },
//             inner: {
//                 marginTop: 2.5,
//                 position: 'absolute',
//                 right: 5,
//             },
//             outer: {
//                 alignContent: 'center',
//                 alignItems: 'center',
//                 display: 'flex',
//                 justifyContent: 'center',
//                 left: (this.props.current / this.props.max) * 100 + 1 + '%',
//                 marginTop: 2.5,
//                 position: 'absolute',
//                 textAlign: 'center',
//             },
//         });


//         let percent = (this.props.current / this.props.max) * 100;
//         if (this.props.current === 0)
//         {
//             percent = 5;
//         }

//         if (this.props.percentage)
//         {
//             return (
//                 <View
//                     style={styles.base}
//                 >
//                     {this.props.current > this.props.max / 2
//                         ? (
//                                 <>
//                                     <View
//                                         style={{ ...styles.floating, width: percent + '%', 'height': 25, 'backgroundColor': this.props.color as any }}
//                                     >
//                                         <View style={styles.inner}>
//                                             <Text style={{ fontWeight: 'bold' }}>
//                                                 {CommonHelper.formatter((this.props.current / this.props.max) * 100)}%
//                                             </Text>
//                                         </View>
//                                     </View>
//                                 </>
//                             )
//                         : (
//                                 <>
//                                     <View
//                                         style={{ ...styles.floating, width: percent + '%', 'height': 25, 'backgroundColor': this.props.color as any }}
//                                     />
//                                     <View style={styles.outer}>
//                                         <Text style={{ fontWeight: 'bold' }}>
//                                             {CommonHelper.formatter((this.props.current / this.props.max) * 100)}%
//                                         </Text>
//                                     </View>
//                                 </>
//                             )}
//                 </View>
//             );
//         }

//         return (
//             <View
//                 style={styles.base}
//             >
//                 <Text style={{ zIndex: 100,textAlign: 'center',marginTop: 2.5,fontWeight: 'bold' }}>
//                     {this.props.current} / {this.props.max}
//                 </Text>
//                 <View
//                     style={{ ...styles.floating, width: percent + '%',backgroundColor: this.props.color }}
//                 />
//             </View>
//         );
//     }

// }


