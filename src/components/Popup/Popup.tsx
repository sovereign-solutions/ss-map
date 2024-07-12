// import React, { forwardRef } from 'react';
// import { ToastProps } from '../Toast/types';
// import { useToast } from '../Toast/useToast';
// import { ToastUI } from '../Toast/ToastUI';
// import { LoggerProvider } from '../Toast/LoggerContext';
// import { ToastRef } from '../Toast/Toast';

// const Toast: React.ForwardRefExoticComponent<React.PropsWithoutRef<ToastProps> & React.RefAttributes<ToastRef>> & ToastRef = forwardRef((props, ref) =>
// {
//     const { children } = props;

//     React.useImperativeHandle(ref, () => ({
//         show: toastRef.current?.show || (() => console.log('No Toast Ref found')),
//         hide: toastRef.current?.hide || (() => console.log('No Toast Ref found')),
//     }));


//     return (
//         <ToastRoot
//             ref={toastRef}
//             {...props}
//         />
//     );
// });
