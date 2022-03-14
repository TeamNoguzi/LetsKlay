import React from 'react';
import {Card, Button} from 'react-bootstrap';

import styles from './Reward.module.css';

interface RewardProps {
    price:number,
    title:string,
    description:string,
    items: {
        name: string,
        quantity: number,
    }[],
    delievery: {
        start:Date,
        end:Date,
    }
    maxStock: number,
    stock: number
}

const Reward:React.FC<RewardProps> = 
({price, description, title, items, delievery, maxStock, stock}) => {

    const stockColor = () => {
        const ratio = stock/maxStock;
        if(!ratio || ratio <= 0.1)
            return '#E83E8C'
        else if (ratio <= 0.3)
            return '#F7CE5B'
        else return '#000000'
    }
    const startTime = delievery.start.toISOString().substring(0, 10);
    const endTime = delievery.end.toISOString().substring(0, 10);

    return (
        <Card className={styles['reward-card']}>
            <div className={styles['reward-mask']}>
                <h5>Select this reward</h5>
            </div>
            <Card.Body>
                <Card.Title className={`${styles['reward-title']} mb-3`}>{price} klay</Card.Title>
                <h4>{title}</h4>

                <h6 className="text-muted mb-4">{description}</h6>
                <p className={`${styles['text-small']} mb-0`}>Includes:</p>
                <ul>
                    {items.map(item => <li>{`${item.name} x ${item.quantity}`}</li>)}
                </ul>

                <p className={`${styles['text-small']} mb-0`}>Expected delievery:</p>
                <p>{`${startTime} ~ ${endTime}`}</p>

                <p className={`${styles['text-small']} mb-0`}>In stock:</p>
                <p style={{color:stockColor()}}>{`${stock} left out of ${maxStock}`}</p>
            </Card.Body>
        </Card>
    )
}

export default Reward;
export type {RewardProps};