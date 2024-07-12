/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
// react native
import React, { memo } from 'react';
import {
    FlatList,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';

// base/mui component,const,enum
import Colors from '../../../theme/colors';

import Text from '../../../Text/Text';

export type Props = {
    data: any[];
    handleClickItem: (_item: any, _index: number) => void
};

const SearchLocationMapLayer: React.FC<Props> = ({
    data,
    handleClickItem,
}) =>
{
    return (
        <>
            <View style={styles.container}>
                <FlatList
                    data={data ?? []}
                    keyExtractor={(_e, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <RenderItemSearch
                            item={item}
                            index={index}
                            handleClickItem={handleClickItem}
                        />
                    )}
                    style={{ marginBottom: '1%' }}
                    keyboardShouldPersistTaps="always"
                />
            </View>
        </>
    );
};

const RenderItemSearch = memo((props: any) =>
{
    const { item, handleClickItem, index } = props;
    return (
        <TouchableOpacity
            style={{ ...styles.item, borderBottomColor: Colors.OnSurfaceVariants }}
            onPress={() => handleClickItem(item, index)}
        >
            <Text
                title={`${item?.Title || ''}`}
            />
        </TouchableOpacity>
    );
});
const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    item: {
        borderBottomWidth: 0.4,
        paddingHorizontal: 15,
        paddingVertical: 14,
    },
});

export default SearchLocationMapLayer;
