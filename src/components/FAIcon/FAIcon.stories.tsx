import React from 'react';
import { storiesOf } from '@storybook/react-native';

import FAIcon from './FAIcon';

storiesOf('Forms', module).add('FAIcon', () =>
{
    return (
        <>
            <FAIcon icon="search" />
            <FAIcon
                icon="search"
                disabled
            />
            <FAIcon
                icon="search"
                color="red"
            />
            <FAIcon
                icon="search"
                color="red"
                size="50px"
            />
        </>
    );
},
);
