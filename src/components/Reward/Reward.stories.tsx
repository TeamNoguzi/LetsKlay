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
    price: 0,
    title: 'Reward Title',
    options: [
        {
            option: 'Delicious burger',
            quantity: 1,
        },
        {
            option: 'French Fries',
            quantity: 1,
        },
        {
            option: 'Zero coke',
            quantity: 1,
        }
    ],
    delievery: {
        start: new Date(),
        end: new Date()
    },
    maxStock: 0,
    stock: 0
}