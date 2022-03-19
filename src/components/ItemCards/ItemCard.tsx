import React from "react";
import { Card, ProgressBar } from "react-bootstrap";
import styles from "./ItemCard.module.css"; //module.css로 가져올때, 클래스이름을 알아서 바꿔준다..!! 오호!
import doge from "/public/images/doge.jpg";

interface CardProps {
  mode: string;
  title: string;
  subtitle: string;
  cardText: string;
  price: number;
  progress: {
    percent: number;
    totalPrice: number;
  };
}

const ItemCard: React.FC<CardProps> = ({ mode, title, subtitle, cardText, price, progress }) => {
  //훅을 그냥.. 컨벤션의 문제다! 넌 다 합치는 편이야?
  return (
    <Card className={styles["item-card"]}>
      <Card.Img className={styles["card-img"]} variant="top" src={doge} />
      <Card.Body className={styles["card-body"]}>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className={styles["sub-title"]}>{subtitle}</Card.Subtitle>
        <Card.Text className={styles["card-text"]}>
          {" "}
          {mode === "Default" ? cardText : undefined}{" "}
        </Card.Text>
        <div className="mt-auto">
          <div>
            <span>${price}</span>
            <span className="float-end">
              {progress.percent}% of ${progress.totalPrice.toLocaleString("en")}
            </span>
          </div>
          <ProgressBar now={progress.percent} />
        </div>
      </Card.Body>
    </Card>
  );
};

export default ItemCard;
export type { CardProps };
