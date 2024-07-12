import React from 'react';
import { storiesOf } from '@storybook/react-native';

import Loading from './Loading';

storiesOf('Loading', module).add('Loading', () => (
    <Loading visible={true}/>
));
