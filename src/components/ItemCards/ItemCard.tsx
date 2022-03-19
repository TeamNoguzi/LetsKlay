import React from "react";
import { Card, ProgressBar } from "react-bootstrap";
import styles from "./ItemCard.module.css"; //module.css로 가져올때, 클래스이름을 알아서 바꿔준다..!! 오호!
import doge from "/public/images/doge.jpg";

interface CardProps {
  mode: "Default" | "Mini";
  title: string;
  subtitle: string;
  cardText: string;
  nowPrice: number;
  totalPrice: number;
}

const ItemCard: React.FC<CardProps> = ({
  mode = "Default",
  title = "default title",
  subtitle = "default subtitle",
  cardText = "No Addtional Text in this Project",
  nowPrice = 0,
  totalPrice = 0,
}) => {
  //훅을 그냥.. 컨벤션의 문제다! 넌 다 합치는 편이야?
  let progress = (nowPrice / totalPrice) * 100;

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
            <span>${nowPrice.toLocaleString("en")}</span>
            <span className="float-end">
              {progress}% of ${totalPrice.toLocaleString("en")}
            </span>
          </div>
          <ProgressBar now={progress} />
        </div>
      </Card.Body>
    </Card>
  );
};

export default ItemCard;
export type { CardProps };
