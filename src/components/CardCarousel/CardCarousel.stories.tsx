import { ComponentStory, ComponentMeta } from '@storybook/react';
import CardCarousel, {_CarouselProps} from './CardCarousel';

export default {
    title: 'CardCarousel',
    component: CardCarousel,
} as ComponentMeta<typeof CardCarousel>;

const Template:ComponentStory<typeof CardCarousel> = args => <CardCarousel {...args}/>;

export const Default = Template.bind({});
Default.args = {
}