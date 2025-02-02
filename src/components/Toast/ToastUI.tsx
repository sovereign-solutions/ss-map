import React from 'react';

import { AnimatedContainer } from './components/AnimatedContainer';
import { ErrorToast } from './components/ErrorToast';
import { InfoToast } from './components/InfoToast';
import { SuccessToast } from './components/SuccessToast';
import {
    ToastConfig,
    ToastData,
    ToastHideParams,
    ToastOptions,
    ToastShowParams,
} from './types';
import { NotificationToast } from './components/NotificationToast';
import { CompactToast } from './components/CompactToast';

export type ToastUIProps = {
    isVisible: boolean;
    options: Required<ToastOptions>;
    data: ToastData;
    show: (params: ToastShowParams) => void;
    hide: (params: ToastHideParams) => void;
    clearTimer: () => void;
    startTimer: () => void;
    config?: ToastConfig;
};

const defaultToastConfig: ToastConfig = {
    success: (props) => <SuccessToast {...props} />,
    error: (props) => <ErrorToast {...props} />,
    info: (props) => <InfoToast {...props} />,
    notification: (props) => <NotificationToast {...props} />,
    compact: (props) => <CompactToast {...props} />,
};

function renderComponent({
    data,
    options,
    config,
    isVisible,
    show,
    hide,
}: ToastUIProps)
{
    const { title, message } = data;
    const { type, onPress, position, props } = options;

    const toastConfig = {
        ...defaultToastConfig,
        ...config,
    };
    const ToastComponent = toastConfig[type];

    if (!ToastComponent)
    {
        throw new Error(
            `Toast type: '${type}' does not exist. You can add it via the 'config' prop on the Toast instance. Learn more: https://github.com/calintamas/react-native-toast-message/blob/master/README.md`,
        );
    }

    return ToastComponent({
        position,
        type,
        isVisible,
        title,
        message,
        show,
        hide,
        onPress,
        ...props,
    });
}

export function ToastUI(props: ToastUIProps)
{
    const { isVisible, options, hide, clearTimer, startTimer } = props;
    const { position, topOffset, bottomOffset, keyboardOffset } = options;

    const handlePositionStart = () =>
    {
        clearTimer();
    };

    const handlePositionEnd = () =>
    {
        startTimer();
    };

    return (
        <AnimatedContainer
            isVisible={isVisible}
            position={position}
            topOffset={topOffset}
            bottomOffset={bottomOffset}
            keyboardOffset={keyboardOffset}
            onHide={hide}
            onPositionEnd={handlePositionEnd}
            onPositionStart={handlePositionStart}
        >
            {renderComponent(props)}
        </AnimatedContainer>
    );
}
