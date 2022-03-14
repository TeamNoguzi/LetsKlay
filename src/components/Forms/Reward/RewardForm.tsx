import React, {useState, useEffect} from 'react';

import {
    Container,
    Row,
    Col,
    Form,
    Button,
    Image,
    InputGroup,
    FormControl,
    Placeholder,
    Accordion
} from 'react-bootstrap';

import Reward, { RewardProps } from '../../Reward/Reward';

import styles from './RewardForm.module.css';

interface RewardFormProps {
    rewards:RewardProps[]
};

const RewardForm:React.FC<RewardFormProps> = ({rewards}) => {
    const [rewardsCopy, setRewardsCopy] = useState<RewardProps[]>(rewards);
    const [activeKey, setActiveKey] = useState<string>();

    const formatDate = (date:Date) => {
        return `${date.getUTCFullYear()}-${String(date.getUTCMonth()+1).padStart(2, '0')}-${String(date.getUTCDate()).padStart(2, '0')}`;
    }

    const addNewReward = () => {
        setRewardsCopy(prev => {
            const arr = [...prev];
            arr.push({
                price:0,
                title:'New Reward',
                description:'',
                items: [
                  {
                    name: 'option',
                    quantity: 1,
                  }
                ],
                delievery: {
                    start:new Date(),
                    end:new Date(),
                },
                maxStock: 0,
                stock: 0
            });
            return arr;
        });
    }
    const addNewOption = (rewardIndex:number) => {
        setRewardsCopy(prev => {
            const arr = [...prev];
            arr[rewardIndex].items.push( {name: 'New Option', quantity: 0})
            return arr;
        })
    }
    const changeReward = (rewardIndex:number, reward:RewardProps) => {
        setRewardsCopy(prev => {
            const arr = [...prev];
            arr[rewardIndex] = reward;
            return arr;
        });
    }
    const changeItem = (rewardIndex:number, itemIndex:number, item:{name:string, quantity:number}) => {
        setRewardsCopy(prev => {
            const arr = [...prev];
            arr[rewardIndex].items = [...arr[rewardIndex].items];
            arr[rewardIndex].items[itemIndex] = item;
            return arr;
        })
    }

    return (
        <Container className={styles['container']}>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Etiam bibendum erat id arcu suscipit mattis. 
                Pellentesque dignissim nunc eu tortor molestie luctus. 
                In a magna ipsum. Vestibulum sed metus sed.
            </p>
            <Button className={styles['add-btn']} onClick={addNewReward}>Add New Reward</Button>
            <Accordion className="mt-4">
            {
                rewardsCopy.map((reward, rewardIndex, rewardArr) => {
                    return (
                        <Accordion.Item key={`reward-${rewardIndex}`} eventKey={`${rewardIndex}`} className={`${styles['accordion-item']} mb-1`}>
                            <Accordion.Header className={styles['accordion-header']}>
                                {reward.title}
                            </Accordion.Header>
                            
                            <Accordion.Body>
                                <Container>
                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="reward-title">
                                                <Form.Label className={styles['label']}>Title</Form.Label>
                                                <Form.Control 
                                                    type="text" 
                                                    placeholder="Enter title"
                                                    value={reward.title}
                                                    onChange={(e)=>changeReward(rewardIndex, {...reward, title:e.target.value})}
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="reward-label">
                                                <Form.Label className={styles['label']}>Description</Form.Label>
                                                <Form.Control 
                                                    as="textarea" 
                                                    placeholder="Enter description" 
                                                    value={reward.description}
                                                    onChange={e=>changeReward(rewardIndex, {...reward, description:String(e.target.value)})}
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="reward-price">
                                                <Form.Label className={styles['label']}>Price</Form.Label>
                                                <Form.Control 
                                                    type="number"
                                                    value={reward.price}
                                                    onChange={(e)=>changeReward(rewardIndex, {...reward, price:Number(e.target.value)})}
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="reward-stock">
                                                <Form.Label className={styles['label']}>Stock</Form.Label>
                                                <Form.Control 
                                                    type="number" 
                                                    value={reward.maxStock}
                                                    onChange={(e)=>changeReward(rewardIndex, {...reward, maxStock:Number(e.target.value)})}
                                                />
                                            </Form.Group>
                                            {
                                                /* reward option starts here */
                                                reward.items.map((item, itemIndex, itemArr) => {
                                                    return (
                                                        <Row>
                                                            <Col className={styles['reward-item-cnt']} xs={12} >
                                                                <Form.Group className="mb-1 mb-sm-2" controlId="reward-option-count">
                                                                    {
                                                                        itemIndex == 0?
                                                                        <Form.Label className={styles['label']}>Items</Form.Label>
                                                                        : undefined
                                                                    }
                                                                    <Form.Control 
                                                                        type="number"
                                                                        value={item.quantity}
                                                                        onChange={e=>changeItem(rewardIndex, itemIndex, {...item, quantity:Number(e.target.value)})}
                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                            <Col>
                                                                <Form.Group className="mb-2" controlId="reward-option-item">
                                                                    {
                                                                        itemIndex == 0?
                                                                        <Form.Label className="d-none d-sm-inline-block"/>
                                                                        : undefined
                                                                    }                                                                    
                                                                    <Form.Control 
                                                                        type="text" 
                                                                        placeholder="Enter item name" 
                                                                        value={item.name}
                                                                        onChange={e=>changeItem(rewardIndex, itemIndex, {...item, name:e.target.value})}
                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>
                                                    );
                                                })
                                                /* reward option ends here */
                                            }
                                            <Button 
                                                className={`${styles['option-add-btn']} mb-3`} 
                                                onClick={()=>addNewOption(rewardIndex)}
                                            >
                                                +
                                            </Button>
                                            <Row>
                                                <Col xs={12} lg={4}>
                                                    <Form.Group className="mb-1" controlId="reward-delievery-start">
                                                        <Form.Label className={styles['label']}>Estimated Delievery(From)</Form.Label>
                                                        <Form.Control 
                                                            type="date" 
                                                            value={formatDate(reward.delievery.start)}
                                                            onChange={e=> {
                                                                const startDate = new Date(e.target.value);
                                                                if(startDate > reward.delievery.end) {
                                                                    alert('Delievery start date should be earlier than the end date');
                                                                    return;
                                                                }
                                                                changeReward(rewardIndex, {...reward, delievery:{...reward.delievery, start: startDate }});
                                                            }}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={12} lg={4}>
                                                    <Form.Group className="mb-3" controlId="reward-delievery-end">
                                                        <Form.Label className={styles['label']}>Estimated Delievery(To)</Form.Label>
                                                        <Form.Control 
                                                            type="date" 
                                                            value={formatDate(reward.delievery.end)}
                                                            onChange={e=> {
                                                                const endDate = new Date(e.target.value);
                                                                if(reward.delievery.end > endDate) {
                                                                    alert('Delievery end date should be later than the end date');
                                                                    return;
                                                                }
                                                                changeReward(rewardIndex, {...reward, delievery:{...reward.delievery, end: endDate }});
                                                            }}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col style={{maxWidth:300}}>
                                            <Reward {...reward}/>
                                        </Col>
                                    </Row>
                                </Container>
                            </Accordion.Body>
                        </Accordion.Item>
                    )
                })
            }
            </Accordion>
            <hr/>
        </Container>
    );
}

export default RewardForm;
export type {RewardFormProps}