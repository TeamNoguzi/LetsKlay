import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Reward, {RewardProps} from './Reward';

export default {
    title: 'Reward',
    component: Reward,
} as ComponentMeta<typeof Reward>;

const Template:ComponentStory<typeof Reward> = args => <Reward {...args}/>;

export const Default = Template.bind({});
Default.args = {
    title: 'reward',
    options: ['hi'],
    delievery: {
        start: new Date(),
        end: new Date()
    },
    maxStock: 0,
    stock: 0
}