// import React, { useState } from 'react';
// import { storiesOf } from '@storybook/react-native';
// import { Button, View } from 'react-native';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';
// import DatePicker from './DatePicker';

// const DatePickerForStoryBook: React.FC<any> = () =>
// {

//     const [date, setDate] = useState(new Date());
//     const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

//     const showDatePicker = () =>
//     {
//         setDatePickerVisibility(true);
//     };
  
//     const hideDatePicker = () =>
//     {
//         setDatePickerVisibility(false);
//     };
  
//     const handleConfirm = (date) =>
//     {
//         console.warn('A date has been picked: ', date);
//         hideDatePicker();
//     };
//     const onDateChange = (data: Date) =>
//     {
//         setDate(data);
//     };

//     return (
//         <View style={{ padding: 20 }}>
//             <DatePicker
//                 current={date}
//                 type={'datetime'}
//                 format={'DD/MM/YYYY HH:mm'}
//                 onChange={onDateChange}
//             />
//             <Button
//                 title="Show Date Picker"
//                 onPress={showDatePicker}
//             />
//             <DateTimePickerModal
//                 isVisible={isDatePickerVisible}
//                 mode="datetime"
//                 onConfirm={handleConfirm}
//                 onCancel={hideDatePicker}
//             />
//         </View>
//     );

// };

// storiesOf('Forms', module).add('DatePicker', () =>
// {
//     return (
//         <DatePickerForStoryBook />
//     );
// },
// );
