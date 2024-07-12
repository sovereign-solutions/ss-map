import React, { ForwardedRef } from 'react';
import { StyleSheet, View } from 'react-native';
import Colors from '../theme/colors';
import PropTypes from 'prop-types';

export interface Props {
    children?: any;
    shadow?: boolean;
    border?: boolean;
    borderRadius?: string;
    shadowColor?: string;
}

const CardView = React.forwardRef((props: Props, ref: ForwardedRef<View>) =>
{
    const bordered = props.border !== undefined ? (props.border ? true : false) : false;
    const borderRadius =
        props.borderRadius !== undefined
            ? props.borderRadius === 'small'
                    ? 'small'
                    : props.borderRadius === 'medium'
                        ? 'medium'
                        : props.borderRadius === 'large'
                            ? 'large'
                            : 'small'
            : 'small';
    const black = '#000';
    return (
        <View
            ref={ref}
            style={[
                styles.view,
                props.shadow && styles.shadow,
                bordered && styles.border,
                { backgroundColor: Colors.Surface, shadowColor: props.shadowColor !== undefined ? props.shadowColor : black },
                borderRadius === 'small'
                    ? { borderRadius: 4 }
                    : borderRadius === 'medium'
                        ? { borderRadius: 8 }
                        : borderRadius === 'large'
                            ? { borderRadius: 12 }
                            : { borderRadius: 3 },
            ]}
        >
            {props.children}
        </View>
    );
});

const styles = StyleSheet.create({
    border: {
        borderColor: '#E8E8E8',
        borderWidth: 1,
    },
    shadow: {
        elevation: 5,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.7,

        shadowRadius: 1.41,
    },
    view: {
        height: 'auto',
        overflow: 'hidden',
        width: '100%',
    },
});

CardView.propTypes = {
    children: PropTypes.any,
    shadow: PropTypes.bool,
    border: PropTypes.bool,
    borderRadius: PropTypes.string,
    shadowColor: PropTypes.string,
};

export default CardView;
