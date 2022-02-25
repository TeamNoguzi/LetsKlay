import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Navbar, {NavbarProps} from './Navbar';

export default {
    title: 'Navbar',
    component: Navbar,
} as ComponentMeta<typeof Navbar>;

const Template:ComponentStory<typeof Navbar> = args => <Navbar {...args}/>;

export const Header = Template.bind({});
Header.args = {
    type:'header'
}

export const Footer = Template.bind({});
Footer.args = {
    type:'footer'
}