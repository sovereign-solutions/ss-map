import React from 'react';
import { storiesOf } from '@storybook/react-native';

import Text from './Text';

storiesOf('Forms', module).add('Text', () => (
    <Text
        title="Text"
    />
));
