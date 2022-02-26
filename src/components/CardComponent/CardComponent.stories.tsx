import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import CardComponent, { CardProps } from "./CardComponent";

export default {
  title: "CardComponent",
  component: CardComponent,
} as ComponentMeta<typeof CardComponent>;

const Template: ComponentStory<typeof CardComponent> = (args) => <CardComponent {...args} />;

export const Default = Template.bind({});
Default.args = {
  _title: "Card title",
  _subtitle: "Card subtitle",
  _width: 318,
  _heigth: 461,
  _cardText: "Some quick example text to build on the card title and make up the bulk of the card's content.",
  price: 1000,
  progress: {
    percent: 50,
    totalPrice: 100000,
  },
};

/* 
  interface CardProps {
  title : string,
  subtitle : string,
  _width : number,
  _heigth : number,
  cardText : string,
  price : number,
  progress : {
    percent : number,
    totalPrice : number,
  }
}*/
