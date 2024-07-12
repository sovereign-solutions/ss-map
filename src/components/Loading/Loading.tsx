import PropTypes from 'prop-types';
import React from 'react';
import { View, StyleSheet, Modal, Dimensions, ActivityIndicator } from 'react-native';
import Colors from '../theme/colors';

export type ILoadingSize = 'small' | 'large';

export type LoadingProps = {
    size?: ILoadingSize;
    visible?: boolean;
    fullScreen?: boolean;
    color?: 'Background' | 'Surface' | 'Primary' | 'OnSurface' | 'OnPrimary' | 'PrimaryVariants' | 'OnSurfaceVariants' | 'SurfaceVariants' | 'PrimaryLight' | 'PrimaryVariantsLight' | 'PrimaryVariantSecond' | 'PrimaryVariantsThird' | 'primaryLight2' | String;
};

const dvWidth = Dimensions.get('window').width;
const dvHeight = Dimensions.get('window').height;

const Loading: React.FC<LoadingProps> = ({
    size,
    visible,
    fullScreen,
    color,
}) =>
{
    visible = visible || false;
    const fullScreenContainerStyle = { ...styles.container, width: dvWidth, height: dvHeight, backgroundColor: 'rgba(0, 0, 0, 0.2)' };
    return (
        <>
            {
                fullScreen
                    ? (
                            <Modal
                                animationType="none"
                                visible={visible}
                                transparent
                            >
                                <View style={fullScreenContainerStyle}>
                                    <ActivityIndicator
                                        size={size || 'large'}
                                        color={Colors[`${color}`] ?? color ?? Colors.OnSurface}
                                    />
                                </View>
                            </Modal>
                        )
                    : visible
                        ? (
                                <View style={styles.container}>
                                    <ActivityIndicator
                                        size={size || 'large'}
                                        color={Colors[`${color}`] ?? color ?? Colors.OnSurface}
                                    />
                                </View>
                            )
                        : <></>
            }
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
    },
});

Loading.propTypes = {
    size: PropTypes.any || PropTypes.string,
    visible: PropTypes.bool.isRequired,
    fullScreen: PropTypes.bool,
    color: PropTypes.oneOfType([PropTypes.oneOf(['Background','Surface','Primary','OnSurface','OnPrimary','PrimaryVariants','OnSurfaceVariants','SurfaceVariants','PrimaryLight','PrimaryVariantsLight','PrimaryVariantSecond','PrimaryVariantsThird']),PropTypes.string]),
};

export default Loading;
