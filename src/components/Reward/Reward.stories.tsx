import React from 'react';

import Reward, {RewardProps} from './Reward';

export default {
    component: Reward,
    title: 'Reward'
};

const Template:React.FC<RewardProps> = args => <Reward {...args}/>;

const DefaultProps:RewardProps = {
    title: 'reward',
    options: [],
    delievery: {
        start: new Date(),
        end: new Date()
    },
    maxStock: 0,
    stock: 0
}

export const Default = Template.bind(DefaultProps);
