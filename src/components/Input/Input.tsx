// import React, { ForwardedRef, useState } from 'react';
// import { NativeSyntheticEvent, StyleSheet, TextInput, TextInputEndEditingEventData, KeyboardTypeOptions, NativeTouchEvent, View, TextInputFocusEventData } from 'react-native';
// import { ColorScheme, ISize, sizeInput } from '../../model';
// import Colors from '../theme/colors';
// import { useTranslation } from 'react-i18next';
// import { Pressable } from 'react-native';
// import FAIcon from '../FAIcon/FAIcon';
// import SvgIcon from '../SvgIcon/SvgIcon';

// interface InputProps
// {
//     value: string;
//     defaultValue?: string;
//     onChangeText?: (_value: string) => void;
//     onEndEditing?: (_e: NativeSyntheticEvent<TextInputEndEditingEventData>) => void;
//     onBlur?: (_e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
//     onPress?: (_e: NativeSyntheticEvent<NativeTouchEvent>) => void;
//     onChange?: (_e: NativeSyntheticEvent<TextInputEndEditingEventData>) => void;
//     onFocus?: (_e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
//     autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
//     size?: ISize;
//     placeholder?: string;
//     colorScheme?: ColorScheme | String;
//     bgColor?: ColorScheme | String;
//     keyboardType?: KeyboardTypeOptions;
//     disabled?: boolean;
//     width?: string;
//     style?: any;
//     variant?: 'rounded' | 'normal';
//     leftIc?: string;
//     rightIc?: string;
//     secureTxtt?: boolean;
//     rightBtn?: {
//         onPress?: () => void,
//         icon: string,
//         iconColor?: string,
//         type?: string,
//     };
// }

// export const Input = React.forwardRef((props: InputProps, ref: ForwardedRef<TextInput>) =>
// {
//     const { t } = useTranslation();
//     const { size } = props;
//     const [isActive, setIsActive] = useState(false);

//     return (
//         <View
//             style={{
//                 position: 'relative',
//             }}
//         >

//             <TextInput
//                 ref={ref}
//                 style={{
//                     ...styles.input,
//                     ...props.style,
//                     width: props.width || full,
//                     backgroundColor: props.bgColor ?? Colors.SurfaceVariants,
//                     color: props.colorScheme ?? Colors.OnSurface,
//                     height: sizeInput[`${size}`],
//                     borderWidth: isActive ? 1 : 0,
//                     'borderColor': isActive ? '#4f87f7' : '#ccc',
//                     borderRadius: props.variant
//                         ? props.variant === 'normal'
//                             ? 4
//                             : props.variant === 'rounded' &&
//                             20
//                         : 4,
//                     paddingLeft: props.leftIc ? 40 : 10,
//                     paddingRight: props.rightIc ? 40 : 10,
//                     fontFamily: 'Nunito-Regular',
//                 }}
//                 placeholderTextColor={Colors.OnSurfaceVariants}
//                 editable={!props.disabled}
//                 keyboardType={props.keyboardType}
//                 value={props.value}
//                 autoCapitalize={props.autoCapitalize}
//                 defaultValue={props.defaultValue}
//                 placeholder={t(props.placeholder || '')}
//                 secureTextEntry={props.secureTxtt ?? false}
//                 onChangeText={props.onChangeText}
//                 onEndEditing={props.onEndEditing}
//                 onChange={props.onChange}
//                 onPressIn={props.onPress}
//                 onFocus={(e) =>
//                 {
//                     props.onFocus && props.onFocus(e);
//                     setIsActive(true);
//                 }}
//                 onBlur={(e) =>
//                 {
//                     props.onBlur && props.onBlur(e);
//                     setIsActive(false);
//                 }}
//             />
//             {props.leftIc && (
//                 <View style={styles.leftIc}>
//                     <SvgIcon
//                         name={props.leftIc}
//                     />
//                 </View>
//             )}
//             {props.rightIc && (
//                 <View style={styles.rightIc}>
//                     <SvgIcon
//                         name={props.rightIc}
//                     />
//                 </View>
//             )}

//             {props.rightBtn && (
//                 <Pressable
//                     style={styles.rightBtn}
//                     onPress={props.rightBtn?.onPress}
//                 >
//                     <FAIcon
//                         icon={props.rightBtn.icon}
//                         type={props.rightBtn.type}
//                         backgroundColor='rgba(255, 255, 255, 0)'
//                         color={props.rightBtn?.iconColor}
//                     />
//                 </Pressable>
//             )}

//         </View>

//     );
// });

// const full = '100%';

// const styles = StyleSheet.create({
//     input: {
//         borderWidth: .5,
//         fontSize: 16,
//         minHeight: 40,
//         overflow: 'hidden',
//         paddingHorizontal: 10,
//         paddingVertical: 5,
//     },
//     leftIc: {
//         left: 15,
//         position: 'absolute',
//         top: '23%',
//     },
//     rightBtn: {
//         position: 'absolute',
//         right: 10,
//         top: 8,
//         zIndex: 1900000,
//     },
//     rightIc: {
//         position: 'absolute',
//         right: 15,
//         top: '23%',
//     },
// });
