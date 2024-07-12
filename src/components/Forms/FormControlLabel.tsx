// import React from 'react';
// import PropTypes from 'prop-types';
// import { StyleSheet, View } from 'react-native';

// import FlexContainer from '../Container/FlexContainer';
// import Text from '../Text/Text';
// import Colors from '../theme/colors';

// export type FormControlLabelProps = {
//     label: string | JSX.Element |React.ReactNode;
//     direction?: 'column' | 'row',
//     control: () => JSX.Element,
//     required? : boolean;
// };

// const FormControlLabel: React.FC<FormControlLabelProps> = ({
//     label,
//     direction,
//     control,
//     required,
// }) =>
// {
//     return (
//         <FlexContainer
//             direction={direction}
//             style={{ margin: 3, justifyContent: 'center' }}
//         >
//             <View style={{ ...styles.label, width: direction === 'row' ? '30%' : 'auto' }}>
//                 <FlexContainer direction='row'>
//                     {
//                         typeof label === 'string'
//                             ? (
//                                     <Text
//                                         title={label}
//                                         colorScheme={direction && direction === 'column' ? Colors.OnSurfaceVariants : Colors.OnSurface}
//                                     />
//                                 )
//                             : (label)

//                     }
//                     {
//                         required && (
//                             <Text
//                                 colorScheme={'#f5212d'} // Cần để màu đỏ (danger) mà chưa biết set color schema nào, cần định nghĩa thêm
//                                 title=' *'
//                             />
//                         )
//                     }
//                 </FlexContainer>
//             </View>
//             <View style={{ width: direction === 'row' ? '70%' : 'auto' }}>
//                 {
//                     control()
//                 }
//             </View>
//         </FlexContainer>
//     );
// };

// const styles = StyleSheet.create({
//     label: {
//         fontWeight: 'bold',
//         justifyContent: 'center',
//         textAlign: 'center',

//     },
// });

// FormControlLabel.propTypes = {
//     label: PropTypes.string.isRequired,
//     direction: PropTypes.oneOf(['column', 'row']),
//     control: PropTypes.func.isRequired,
//     required: PropTypes.bool,
// };

// export default FormControlLabel;
