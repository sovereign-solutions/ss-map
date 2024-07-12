import React from 'react';
import { Animated, Dimensions, GestureResponderEvent, PanResponderGestureState } from 'react-native';

import { useLogger } from '../LoggerContext';
import { usePanResponder, useSlideAnimation, useViewDimensions } from '../hooks';
import { ReactChildren, ToastHideParams, ToastPosition } from '../types';
import { bound, getTestId, noop } from '../utils';
import { styles } from './AnimatedContainer.styles';

export type AnimatedContainerProps = {
    children: ReactChildren;
    isVisible: boolean;
    position: ToastPosition;
    topOffset: number;
    bottomOffset: number;
    keyboardOffset: number;
    onHide: (p?: ToastHideParams) => void;
    onRestorePosition?: () => void;
    onPositionStart?: () => void;
    onPositionEnd?: () => void
};

export function dampingFor(
    gesture: PanResponderGestureState,
    position: ToastPosition,
)
{
    const { moveY } = gesture;

    switch (position)
    {
        case 'bottom':
        {
            const { height: screenHeight } = Dimensions.get('screen');
            return screenHeight - moveY;
        }
        case 'top':
            return moveY;
        default:
            throw new Error(`Toast position: ${position} not implemented`);
    }
}

export function animatedValueFor(
    gesture: PanResponderGestureState,
    position: ToastPosition,
    damping: number,
)
{
    const boundValue = (val: number) => bound(val, 0, 2);
    const { dy } = gesture;

    switch (position)
    {
        case 'bottom':
            return boundValue(1 - dy / damping);
        case 'top':
            return boundValue(1 + dy / damping);
        default:
            throw new Error(`Toast position: ${position} not implemented`);
    }
}

export function AnimatedContainer({
    children,
    isVisible,
    position,
    topOffset,
    bottomOffset,
    keyboardOffset,
    onHide,
    onRestorePosition = noop,
    onPositionEnd = noop,
    onPositionStart = noop,
}: AnimatedContainerProps)
{
    const { log } = useLogger();

    const { computeViewDimensions, height } = useViewDimensions();

    const { animatedValue, animate, animationStyles } = useSlideAnimation({
        position,
        height,
        topOffset,
        bottomOffset,
        keyboardOffset,
    });

    const onDismiss = React.useCallback(() =>
    {
        log('Swipe, dismissing');
        animate(0);
        onHide();
    }, [animate, log, onHide]);

    const onRestore = React.useCallback(() =>
    {
        log('Swipe, restoring to original position');
        animate(1);
        onRestorePosition();
    }, [animate, log, onRestorePosition]);

    const computeNewAnimatedValueForGesture = React.useCallback(
        (gesture: PanResponderGestureState) =>
        {
            const damping = dampingFor(gesture, position);
            return animatedValueFor(gesture, position, damping);
        },
        [position],
    );
    const { panResponder } = usePanResponder({
        animatedValue,
        computeNewAnimatedValueForGesture,
        onDismiss,
        onRestore,
    });

    const onResponderEnd = (event: GestureResponderEvent) =>
    {
        if (typeof onPositionEnd === 'function')
        {
            onPositionEnd();
        }
        if (typeof panResponder.panHandlers.onResponderEnd === 'function')
        {
            panResponder.panHandlers.onResponderEnd(event);
        }
    };

    const onResponderStart = (event: GestureResponderEvent) =>
    {
        if (typeof onPositionStart === 'function')
        {
            onPositionStart();
        }
        if (typeof panResponder.panHandlers.onResponderStart === 'function')
        {
            panResponder.panHandlers.onResponderStart(event);
        }
    };

    React.useLayoutEffect(() =>
    {
        const newAnimationValue = isVisible ? 1 : 0;
        animate(newAnimationValue);
    }, [animate, isVisible]);

    return (
        <Animated.View
            testID={getTestId('AnimatedContainer')}
            style={[styles.base, styles[position], animationStyles]}
            onLayout={computeViewDimensions}
            {...panResponder.panHandlers}
            onResponderEnd={onResponderEnd}
            onResponderGrant={onResponderStart}
        >
            {children}
        </Animated.View>
    );
}
