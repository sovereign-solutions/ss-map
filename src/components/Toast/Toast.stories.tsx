import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { Button } from 'react-native';
import Toast from './Toast';


// // App.jsx

// import Toast from './Toast';
// export function App(props) {
//   return (
//     <>
//       {/* ... */}
//       <Toast />
//     </>
//   );
// }

storiesOf('Utils', module).add('Toast', () =>
{
    const showToast = () =>
    {
        Toast.show({
            type: 'success',
            title: 'Hello',
            message: 'Demo message!!!',
        });
    };
    
    return (
        <Button
            title="Show toast"
            onPress={showToast}
        />
    );
});
