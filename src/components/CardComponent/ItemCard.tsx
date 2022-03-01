import React from "react";
import { Card, ProgressBar } from "react-bootstrap";
import styles from "./ItemCard.module.css"; //module.css로 가져올때, 클래스이름을 알아서 바꿔준다..!! 오호!
import doge from "/public/images/doge.jpg";

interface CardProps {
  mode : string;
  _title: string;
  _subtitle: string;
  _cardText: string;
  price: number;
  progress: {
    percent: number;
    totalPrice: number;
  };
}
interface ProgressProps {
  price: number;
  progress: {
    percent: number;
    totalPrice: number;
  };
}
const CardProgress: React.FC<ProgressProps> = (props: ProgressProps) => {
  return (
    <div className="mt-auto">
      <div>
        <span>${props.price}</span>
        <span className="float-end">
          {props.progress.percent}% of ${props.progress.totalPrice.toLocaleString("en")}
        </span>
      </div>
      <ProgressBar now={props.progress.percent} />
    </div>
  );
};

const ItemCard: React.FC<CardProps> = ({ mode, _title, _subtitle, _cardText, price, progress }) => {
  //훅을 그냥.. 컨벤션의 문제다! 넌 다 합치는 편이야?
  return (
    <Card className={styles["item-card"]}>
      <Card.Img className={styles["card-img"]} variant="top" src={doge} />
      <Card.Body className={styles["card-body"]}>
        <Card.Title>{_title}</Card.Title>
        <Card.Subtitle className={styles["sub-title"]}>{_subtitle}</Card.Subtitle>
          <Card.Text className = {styles["card-text"]}> {mode==='Default'?_cardText:undefined} </Card.Text> 
        <CardProgress price={price} progress={progress} />
      </Card.Body>
    </Card>
  );
};

export default ItemCard;
export type { CardProps };
