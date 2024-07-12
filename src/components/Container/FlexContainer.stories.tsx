import React from 'react';
import { storiesOf } from '@storybook/react-native';

import FlexContainer from './FlexContainer';
import Text from '../Text/Text';

storiesOf('Layout', module).add('FlexContainer', () => (
    <FlexContainer direction={'column'}>
        <Text title="a"/>
        <Text title="b"/>
    </FlexContainer>
));
