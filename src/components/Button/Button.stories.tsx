import React from 'react';
import { storiesOf } from '@storybook/react-native';

import Button from './Button';

storiesOf('Forms', module).add('Button', () => (
    <Button
        title="Button"
        onPress={() => console.log('button click!')}
    />
));
