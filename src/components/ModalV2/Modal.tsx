import React from 'react';
import { Modal as BaseModal, StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import ModalContent from './ModalContent';
import ModalHeader from './ModalHeader';
import ModalFooter from './ModalFooter';
import ModalBody from './ModalBody';
import ModalCloseButton from './ModalCloseButton';

export type Props = {
    children: JSX.Element | JSX.Element[];
    isOpen: boolean;
    onClose: () => void;
    size: 'full' | 'xl' | 'lg' | 'sm' | 'xs';
};

const customSize = {
    full: '100%',
    xl: '85%',
    lg: '70%',
    sm: '60%',
    xs: '50%',
};


const Modal: React.FC<any> = ({
    isOpen,
    onClose,
    children,
    size,
    ...props
}) =>
{
    return (
        <>
            <BaseModal
                animationType="fade"
                visible={isOpen}
                transparent
                {...props}
            >
                <View style={styles.modalViewCotainer}>
                    <TouchableWithoutFeedback onPress={onClose}>
                        <View style={styles.modalOverlay}/>
                    </TouchableWithoutFeedback>
                    <View style={[styles.modalView, { width: customSize[size] }]}>
                        {children}
                    </View>
                </View>
            </BaseModal>
        </>
    );
};


const styles = StyleSheet.create({
    modalOverlay: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        bottom: 0,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
    },
    modalView: {
        // alignItems: 'center',
        // backgroundColor: 'white',
        borderRadius: 20,
        elevation: 7,
        // justifyContent: 'center',
        shadowColor: 'rgba(0,0,0,0.3)',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        zIndex: 9999,
    },
    modalViewCotainer: {
        alignItems: 'center',
        height: '100%',
        justifyContent: 'center',
        width: '100%',
    },
});


export default Object.assign(Modal, {
    Content: ModalContent,
    Header: ModalHeader,
    Body: ModalBody,
    Footer: ModalFooter,
    CloseButton: ModalCloseButton,
});
