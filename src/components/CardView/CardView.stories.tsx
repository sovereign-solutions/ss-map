import React from 'react';
import { storiesOf } from '@storybook/react-native';

import CardView from './CardView';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text, SvgIcon } from '../../';
import Colors from '../theme/colors';

const map = [1,2,3,4,5,6,7,8,9];

storiesOf('Layout', module).add('CardView', () => (
    <ScrollView
        contentContainerStyle={{
            backgroundColor: 'white',
        }}
    >
        <CardView.Container style={{ padding: 10 }}>
            {map.map((i,key)=>(
                <View
                    key={key}
                    style={{ marginBottom: 10 }}
                >
                    <CardView.Item
                        shadow
                    >
                    
                        <View style={styles.padding5}>
                            <View style={[styles.topContent,{ borderColor: Colors.OnSurfaceVariants }]}>
                                <View style={[styles.paddingB5,styles.flexRowOnly]}>
                                    <Text
                                        title={'#Jobname: '}
                                        colorScheme={'OnSurfaceVariants'}
                                    />
                                    <Text
                                        title={'abyasd'}
                                        colorScheme={'OnSurfaceVariants'}
                                    />
                                </View>
                                <View style={[styles.paddingB10,styles.flexRowOnly]}>
                                    <Text
                                        title={'any'}
                                        colorScheme={'PrimaryLight'}
                                        size={'xl'}
                                        // fontFamily="Nunito-Bold"
                                    />
                                </View>
                                <View style={styles.flexRowOnly}>
                                    <View style={styles.marginR5}>
                                        <SvgIcon name="history tracking location" />
                                    </View>
                                    <Text title={'address_street'} />
                                </View>
                            </View>
                            <View style={styles.flexRowWithSpace}>
                                <View>
                                    <View style={[styles.flexRowOnly, styles.marginB5]}>
                                        <View style={[styles.dot, { 'backgroundColor': '#7B61FF' } ]} />
                                        <Text title={'333'} />
                                    </View>
                                    <View style={styles.flexRowOnly}>
                                        <View style={styles.marginR5}>
                                            <SvgIcon name="history tracking clock" />
                                        </View>
                                    </View>
                                </View>
                                <View>
                                    <View style={[styles.flexRowOnly,styles.alignRightWp4]}>
                                        <View>
                                            <Text
                                                title={'111'}
                                                colorScheme={'OnSurfaceVariants'}
                                                size={'5xl'}
                                                // fontFamily="Nunito-ExtraBold"
                                            />
                                        </View>
                                        <View style={styles.spaceBetweenDate} />
                                        <View>
                                            <Text
                                                title={'000'}
                                                colorScheme={'OnSurfaceVariants'}
                                                size={'xxs'}
                                                // fontFamily="Nunito-bold"
                                            />
                                            <Text
                                                title={'123'}
                                                colorScheme={'OnSurfaceVariants'}
                                                size={'xxs'}
                                                // fontFamily="Nunito-bold"
                                            />
                                        </View>
                                    </View>
                                    <View style={styles.alignRight}>
                                        <View style={[styles.flexRowOnly,styles.alignRight]}>
                                            <Text title={'tile'} />
                                            <View style={styles.marginL5}>
                                                <SvgIcon
                                                    name="avata"
                                                    width={18}
                                                    height={18}
                                                />
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </CardView.Item>
                </View>
            ))}
        </CardView.Container>
        
    </ScrollView>
));

const styles = StyleSheet.create({
    CtnBtn: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        width: '100%',
    },
    absolute: {
        // position: 'absolute',
        // top: 40,
        // zIndex: 200,
        // marginTop: 5,
    },
    alignRight: {
        justifyContent: 'flex-end',
        textAlign: 'right',
    },
    alignRightWp4: {
        justifyContent: 'flex-end',
        paddingRight: 4,
        textAlign: 'right',
    },
    btn: {
        marginHorizontal: 5,
        // marginVertical: 5,
        width: 70,
    },
    checkFilter: { bottom: -1, position: 'absolute', right: -2.5 },
    chooseRow: {
        paddingVertical: 2,
    },
    container: {
        // backgroundColor: bgGrayColor,
        flex: 1,
        // 'backgroundColor': 'pink',
        marginBottom: 50,
    },
    containerContent: {
        marginTop: -5,
        paddingBottom: 5,
        paddingHorizontal: 15,
        paddingVertical: 15,
    },
    dot: {
        borderRadius: 10,
        height: 12,
        marginRight: 5,
        width: 12,
    },
    dropDown: {
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 12,
    },
    flexRowOnly: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    flexRowWithSpace: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    header2: {
        // backgroundColor: bgWhiteBlack,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    marginB12: {
        marginBottom: 12,
    },
    marginB5: {
        marginBottom: 5,
    },
    marginL5: {
        marginLeft: 5,
    },
    marginR5: {
        marginRight: 5,
    },
    padding5: {
        padding: 5,
    },
    paddingB10: {
        paddingBottom: 10,
    },
    paddingB5: {
        paddingBottom: 5,
    },
    paddingT3: {
        paddingTop: 3,
    },
    spaceBetweenDate: {
        // borderRadius: 10,
        // borderRightWidth: 1,
        height: 34,
        marginRight: 2,
        width: 2,
    },
    topContent: {
        borderBottomWidth: 1,
        marginBottom: 8,
        paddingBottom: 8,
    },
});
