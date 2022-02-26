import React from "react";
import { Card,Button} from "react-bootstrap";
import styles from "./CardComponent.module.css";

interface CardProps {
  _title: string;
  _subtitle: string;
  _width: number;
  _heigth: number;
  _cardText: string;
  price: number;
  progress: {
    percent: number;
    totalPrice: number;
  };
}

const ItemCard: React.FC<CardProps> = ({ _title, _subtitle, _width, _heigth, _cardText, price, progress }) => {
  return (
    <Card style={{ width: _width, height: _heigth }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>{_title}</Card.Title>
        <Card.Subtitle>{_subtitle}</Card.Subtitle>
        <Card.Text>{_cardText}</Card.Text>
        <Button variant="primary">Gosomewhere</Button>
      </Card.Body>
    </Card>
  );
};

export default ItemCard;
export type { CardProps };
