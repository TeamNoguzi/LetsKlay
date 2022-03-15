import React, {useState} from 'react';
import { 
    Container, 
    Row, 
    Col 
} from 'react-bootstrap';

import ItemCard, {CardProps} from '../../ItemCards/ItemCard';

import styles from './Project.module.css';

interface ProjectProps {
    projects: {
        preparing: {
            count: number,
            cards: CardProps[]
        },
        launched: {
            count: number,
            cards: CardProps[]
        },
        supported: {
            count: number,
            cards: CardProps[]
        },
        following: {
            count: number,
            cards: CardProps[]
        },
    }
}

const Project:React.FC<ProjectProps> = ({projects}) => {
    const [selectedMenu, setSelectedMenu] = useState<number>(0);
    const menuNames = ['Preparing Projects', 'Launched Projects', 'Supported Projects', 'Following Projects'];

    return (
        <Container>
            <div className={styles['menu-wrapper']}>
                <div className={`${styles['menu']} ${styles[`menu-selected-${selectedMenu}`]}`}>
                    <Row>
                        {
                            Object.entries(projects).map(([key, val], idx)=> {
                                return (
                                    <Col 
                                        xs={3} 
                                        className={styles['menu-item']}
                                        onClick={()=>setSelectedMenu(idx)}
                                    >
                                        <span>{menuNames[idx]}</span>
                                        <h5>{val.count}</h5>
                                    </Col>
                                )
                            })
                        }
                    </Row>
                </div>
            </div>

            <Container>
                <Row>
                    <Col xs={4} sm={3} lg={3}>
                        {
                            Object.values(projects)[selectedMenu].cards.map((val, idx)=> {
                                return (
                                    <ItemCard {...val}/>
                                )
                            })
                        }
                    </Col>
                </Row>
            </Container>
        </Container>
    )
}

export default Project;
export type {ProjectProps};