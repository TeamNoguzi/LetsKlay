import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import CardComponent, {CardProps} from './CardComponent';

export default {
    title: 'CardComponent',
    component: CardComponent,
} as ComponentMeta<typeof CardComponent>;

const Template:ComponentStory<typeof CardComponent> = args => <CardComponent {...args}/>;

export const Default = Template.bind({});
Default.args = {
}


