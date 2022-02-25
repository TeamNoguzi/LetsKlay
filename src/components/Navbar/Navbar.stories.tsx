import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Navbar, {NavbarProps} from './Navbar';

export default {
    title: 'Navbar',
    component: Navbar,
} as ComponentMeta<typeof Navbar>;

const Template:ComponentStory<typeof Navbar> = args => <Navbar {...args}/>;

export const Default = Template.bind({});
Default.args = {
}