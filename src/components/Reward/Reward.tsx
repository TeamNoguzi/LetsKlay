import React from 'react';
import {Card, Button} from 'react-bootstrap';

import styles from './Reward.module.css';

interface RewardProps {
    price:number,
    title:string,
    options: {
        option: string,
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
({price, title, options, delievery, maxStock, stock}) => {

    return (
        <Card className={styles['reward-card']}>
            <div className={styles['reward-mask']}>
                Select this reward
            </div>
            <Card.Body>
                <Card.Title>{price} klay</Card.Title>
                <h4>{title}</h4>

                <h6 className="text-muted">This option gives you a lot of pleasure</h6>
                <p className="text-small mb-0">includes:</p>
                <ul>
                    {options.map(option => <li>{`${option.option} x ${option.quantity}`}</li>)}
                </ul>

                <p className="text-small mb-0">estimated delievery:</p>
                <p>{delievery.start.toISOString()} ~ {delievery.end.toISOString()}</p>

                <p className="text-small mb-0">in stock:</p>
                <p>{`${stock} left out of ${maxStock}`}</p>
            </Card.Body>
        </Card>
    )
}

export default Reward;
export type {RewardProps};