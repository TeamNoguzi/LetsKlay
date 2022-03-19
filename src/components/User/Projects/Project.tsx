import React, {useState} from 'react';
import { 
    Container, 
    Row, 
    Col 
} from 'react-bootstrap';

import ItemCard, {CardProps} from '../../ItemCards/ItemCard';

import styles from './Project.module.css';

// 추후에 props 말고 여기 안에서 ajax로 받아오도록 변경?
interface ProjectProps {
    projects: {
        preparing: CardProps[],
        launched: CardProps[],
        supported: CardProps[],
        following: CardProps[]
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
                                        <h5>{val.length}</h5>
                                    </Col>
                                )
                            })
                        }
                    </Row>
                </div>
            </div>

            <Container>
                <Row>
                    <Col xs={12} sm={6} lg={3}>
                        {
                            Object.values(projects)[selectedMenu].map((val, idx)=> {
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