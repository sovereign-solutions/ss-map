import React from 'react';
import { storiesOf } from '@storybook/react-native';
import SvgIcon from './SvgIcon';
import { View } from 'react-native';

storiesOf('Forms', module).add('SvgIcon', () => (
    <View style={{ backgroundColor: 'black' }}>
        <SvgIcon
            name="humbuger menu"
        />
    </View>
));
