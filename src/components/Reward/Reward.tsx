import React from 'react';
import {Card, Button} from 'react-bootstrap';

interface RewardProps {
    title:string,
    options:string[],
    delievery: {
        start:Date,
        end:Date,
    }
    maxStock: number,
    stock: number
}

const Reward:React.FC<RewardProps> = 
({title, options, delievery, maxStock, stock}) => {

    return (
        <Card>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
    )
}

export default Reward;
export type {RewardProps};