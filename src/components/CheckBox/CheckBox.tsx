// import PropTypes from 'prop-types';
// import React from 'react';
// import { StyleSheet, TouchableOpacity, View } from 'react-native';
// import Text from '../Text/Text';
// import FAIcon from '../FAIcon/FAIcon';

// export type CheckBoxProps = {
//     title: string;
//     checked: boolean;
//     textColor?: string;
//     fontFamily?: string;
//     onChange?: (_data: boolean) => void;
//     width?: number | string;
//     size?: number;
//     isTextFirst?: boolean;
//     value?: string | number
// };

// const defaultwidth = 'auto';
// const defaultFontFamily = 'Nunito-Regular';

// const CheckBox: React.FC<CheckBoxProps> = ({
//     title,
//     checked,
//     onChange,
//     width,
//     size,
//     value,
//     isTextFirst,
// }) =>
// {
//     const onPress = () =>
//     {
//         if (typeof onChange === 'function')
//         {
//             onChange(!checked);
//         }
//     };

//     const containerStyle = Object.assign({ ...styles.container }, isTextFirst ? { flexDirection: 'row-reverse' } : {});

//     return (
//         <TouchableOpacity
//             style={{
//                 width: width ? width : defaultwidth,
//             }}
//             activeOpacity={1}
//             onPress={onPress}
//         >
//             <View style={containerStyle}>
//                 <View style={{ ...styles.item }}>
//                     <FAIcon
//                         icon={checked ? 'check-square' : 'square'}
//                         type="light"
//                     />
//                 </View>
//                 <View style={{ ...styles.item }}>
//                     <Text
//                         title={title}
//                         colorScheme={'OnSurface'}
//                         fontFamily={defaultFontFamily}
//                     />
//                 </View>
//             </View>
//         </TouchableOpacity>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         flexDirection: 'row',
//     },
//     item: {
//         alignItems: 'center',
//         flexDirection: 'row',
//         marginRight: 2,
//     },
// });

// CheckBox.propTypes = {
//     title: PropTypes.string.isRequired,
//     checked: PropTypes.bool.isRequired,
//     onChange: PropTypes.func,
//     width: PropTypes.number || PropTypes.string,
//     size: PropTypes.number,
//     isTextFirst: PropTypes.bool,
//     value: PropTypes.number || PropTypes.string,
// };

// export default CheckBox;
