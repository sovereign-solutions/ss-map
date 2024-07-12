import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { LoggerProvider } from './LoggerContext';
import { ToastUI } from './ToastUI';
import { ToastHideParams, ToastProps, ToastShowParams } from './types';
import { useToast } from './useToast';

const ToastRoot = React.forwardRef((props: ToastProps, ref) =>
{
    const { config, ...defaultOptions } = props;
    const { show, hide, isVisible, options, data, clearTimer,startTimer } = useToast({
        defaultOptions,
    });

    React.useImperativeHandle(ref, () => ({
        show,
        hide,
    }));

    return (
        <ToastUI
            isVisible={isVisible}
            options={options}
            data={data}
            hide={hide}
            show={show}
            clearTimer={clearTimer}
            startTimer={startTimer}
            config={config}
        />
    );
});

export type ToastRef = {
    show: (params: ToastShowParams) => void;
    hide: (params: ToastHideParams) => void;
};

const toastRef = React.createRef<ToastRef>();

const Toast: React.ForwardRefExoticComponent<React.PropsWithoutRef<ToastProps> & React.RefAttributes<ToastRef>> & ToastRef = forwardRef((props, ref) =>
{
    const { children } = props;

    React.useImperativeHandle(ref, () => ({
        show: toastRef.current?.show || (() => console.log('No Toast Ref found')),
        hide: toastRef.current?.hide || (() => console.log('No Toast Ref found')),
    }));


    return (
        <LoggerProvider>
            <ToastRoot
                ref={toastRef}
                {...props}
            />
            {children}
        </LoggerProvider>
    );
});

export default Toast;

Toast.show = (params: ToastShowParams) =>
{
    toastRef.current?.show(params);
};

Toast.hide = (params?: ToastHideParams) =>
{
    toastRef.current?.hide(params);
};

ToastRoot.propTypes = {
    config: PropTypes.any,
    type: PropTypes.string,
    position: PropTypes.oneOf(['top', 'bottom']),
    autoHide: PropTypes.bool,
    visibilityTime: PropTypes.number,
    topOffset: PropTypes.number,
    bottomOffset: PropTypes.number,
    keyboardOffset: PropTypes.number,
    onShow: PropTypes.func,
    onHide: PropTypes.func,
    onPress: PropTypes.func,
};
