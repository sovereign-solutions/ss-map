// import React from 'react';
// import { StyleSheet, View } from 'react-native';
// import Colors from '../theme/colors';

// export type ScreenFooterProps = {
//     children: any;
//     style?: any;
//     bgColor?: string;
//     shadow?:boolean;
// }

// export const ScreenFooter = (props: ScreenFooterProps) =>
// {
//     const { style, bgColor, children, shadow } = props;

//     return (
//         <View style={[shadow && styles.shadow, style, styles.footer, { backgroundColor: bgColor ?? Colors.Background }]}>
//             {children}
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     footer: {
//         bottom: 0,
//         left: 0,
//         padding: 15,
//         position: 'absolute',
//         right: 0,
//     },
//     shadow: {
//         elevation: 5,
//         'shadowColor': '#000',
//         shadowOffset: {
//             width: 0,
//             height: 1,
//         },
//         shadowOpacity: 0.7,
//     },
// });
