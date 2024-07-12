// // basic
// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
// import moment from 'moment';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';


// // mui
// import Colors from '../theme/colors';
// import SvgIcon from '../SvgIcon/SvgIcon';
// import { Input } from '../Input/Input';

// export type DatePickerProps = {
//     current: Date;
//     width?: number | string;
//     format?: string;
//     disabled?: boolean;
//     /**
//      * @default
//      * date
//      */
//     type?: 'date' | 'time' | 'datetime';
//     onChange?: (data: Date) => void;
// };

// const DatePicker: React.FC<DatePickerProps> = ({
//     current,
//     width,
//     format,
//     disabled,
//     type = 'date',
//     onChange,
// }) =>
// {
//     const [isShowingPopup, setIsShowingPopup] = useState(false);

//     const handleChoosingDate = () =>
//     {
//         if (!disabled)
//         {
//             setIsShowingPopup(true);
//         }
//     };

//     const handleChanged = (date: Date) =>
//     {
//         setIsShowingPopup(false);
//         if (typeof onChange === 'function')
//         {
//             onChange(date);
//         }
//     };

//     format = format || 'DD/MM/YYYY';

//     const dateStr = current ? moment(current).format(format) : '';

//     const containerStyle = { ...styles.containerStyle, width };

//     return (
//         <View
//             style={{
//                 borderRadius: 4,
//             }}
//         >
//             <TouchableWithoutFeedback
//                 style={containerStyle}
//                 onPress={handleChoosingDate}
//             >
//                 <View>
//                     <Input
//                         value={dateStr}
//                         bgColor={Colors.SurfaceVariants}
//                         disabled
//                     />
//                     <View style={styles.iconStyle}>
//                         <SvgIcon name={'calendar'} />
//                     </View>
//                 </View>

//             </TouchableWithoutFeedback>
//             <DateTimePickerModal
//                 date={new Date(current) ?? new Date()}
//                 mode={type}
//                 isVisible={isShowingPopup}
//                 is24Hour
//                 onConfirm={handleChanged}
//                 onCancel={()=>
//                 {
//                     setIsShowingPopup(false);
//                 }}
//             />

//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     containerStyle: {
//         'backgroundColor': 'rgba(256, 256, 256, 0)',
//         borderRadius: 4,
//         position: 'relative',
//     },
//     iconStyle: {
//         position: 'absolute',
//         right: 10,
//         top: 8,
//         zIndex: 3,
//     },
//     textStyle: {
//         borderRadius: 4,
//         borderWidth: .5,
//         color: Colors.OnSurface,
//         minHeight: 40,
//         paddingBottom: 5,
//         paddingLeft: 10,
//         paddingRight: 10,
//         paddingTop: 5,
//     },
// });

// DatePicker.propTypes = {
//     current: (PropTypes.instanceOf(Date) || PropTypes.string).isRequired,
//     width: PropTypes.number || PropTypes.string,
//     format: PropTypes.string,
//     disabled: PropTypes.bool,
//     onChange: PropTypes.func,
// };

// export default DatePicker;
