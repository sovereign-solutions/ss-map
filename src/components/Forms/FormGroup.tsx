// import React from 'react';
// import PropTypes from 'prop-types';
// import { StyleSheet, View } from 'react-native';
// import Colors from '../theme/colors';
// import FlexContainer from '../Container/FlexContainer';
// import CheckBox from '../CheckBox/CheckBox';
// import FAIcon from '../FAIcon/FAIcon';
// import Text from '../Text/Text';
// import Radio from '../Radio/Radio';
// import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

// export type FormGroupProps = {
//     label: string;
//     direction?: 'column' | 'row',
//     isUseCheck?: boolean;
//     checked?: boolean;
//     radio: boolean;
//     onCheckChange?: (_checked: boolean) => void;
//     isUseClose?: boolean;
//     closeIcon?: string;
//     onClose?: () => void;
//     notPartitionLine?: boolean;
//     txtSize?: 'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl';
// };

// const FormGroup: React.FC<FormGroupProps> = ({
//     label,
//     direction,
//     children,
//     isUseCheck,
//     checked,
//     radio,
//     onCheckChange,
//     isUseClose,
//     closeIcon,
//     onClose,
//     notPartitionLine,
//     txtSize,
// }) =>
// {
//     const containerStyle: any = { ...styles.container };
//     if (notPartitionLine)
//     {
//         containerStyle.borderTopWidth = 0;
//     }

//     return (
//         <View>
//             <FlexContainer
//                 direction={'row'}
//                 style={{ position: 'relative', alignItems: 'center' }}
//             >
//                 {
//                     isUseCheck
//                         ? (
                            
//                                 !radio
                            
//                                     ? (
//                                             <CheckBox
//                                                 title=""
//                                                 checked={checked || false}
//                                                 onChange={() =>
//                                                 {
//                                                     if (typeof onCheckChange === 'function')
//                                                     {
//                                                         onCheckChange(!checked);
//                                                     }
//                                                 }}
//                                             />
//                                         )
//                                     : (
//                                             <Radio
//                                                 item={checked}
//                                                 value
//                                                 onPress={() =>
//                                                 {
//                                                     if (typeof onCheckChange === 'function')
//                                                     {
//                                                         onCheckChange(!checked);
//                                                     }
//                                                 }}
//                                             />
//                                         )
//                             )
//                         : <></>
//                 }
//                 <TouchableWithoutFeedback
//                     style={isUseCheck && { marginLeft: 10 }}
//                     onPress={()=>
//                     {
//                         if (isUseCheck && typeof onCheckChange === 'function')
//                         {
//                             onCheckChange(!checked);

//                         }
//                     }}
//                 >
//                     <Text
//                         title={label}
//                         size={txtSize ?? 'xl'}
//                     // fontWeight={'bold'}
//                     />
//                 </TouchableWithoutFeedback>
//                 {
//                     isUseClose && (
//                         <View style={{ position: 'absolute', top: 5, right: 5 }}>
//                             <FAIcon
//                                 icon={closeIcon || 'times'}
//                                 size={'18'}
//                                 backgroundColor={'transparent'}
//                                 onClick={onClose}
//                             />
//                         </View>
//                     )
//                 }
//             </FlexContainer>
//             <FlexContainer
//                 style={containerStyle}
//                 direction={direction || 'column'}
//             >
//                 {
//                     children
//                 }
//             </FlexContainer>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         // borderStyle: 'solid',
//         // borderTopColor: Colors.OnSurface,
//         // borderTopWidth: 1,
//         // marginTop: 5,
//         padding: 10,
//     },
// });

// FormGroup.propTypes = {
//     label: PropTypes.string.isRequired,
//     direction: PropTypes.oneOf(['column', 'row']),
//     isUseCheck: PropTypes.bool,
//     checked: PropTypes.bool,
//     onCheckChange: PropTypes.func,
//     isUseClose: PropTypes.bool,
//     closeIcon: PropTypes.string,
//     onClose: PropTypes.func,
//     notPartitionLine: PropTypes.bool,
//     txtSize: PropTypes.oneOf(['xs' , 'sm' , 'base' , 'md' , 'lg' , 'xl']),
// };

// export default FormGroup;
