import { ComponentStory, ComponentMeta } from '@storybook/react';
import _Template, {_TemplateProps} from './_Template';

export default {
    title: '_Template',
    component: _Template,
} as ComponentMeta<typeof _Template>;

const Template:ComponentStory<typeof _Template> = args => <_Template {...args}/>;

export const Default = Template.bind({});
Default.args = {
}