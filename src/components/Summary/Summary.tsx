import React from 'react';

import {
    Container,
    Row,
    Col,
    Image,
    Button,
    ProgressBar
} from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faRegularHeart} from '@fortawesome/free-regular-svg-icons';
import { faInstagram, faTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons';

import styles from './Summary.module.css';

interface SummaryProps {
    picURL:string,
    title:string,
    desc:string,
    likes:number,
    fund: {
        goal: number,
        now: number
    },
    supporters:number,
    liked: boolean
}

const Summary:React.FC<SummaryProps> = ({picURL, title, desc, likes, fund, liked, supporters}) => {
    return (
        <Container className={styles['root-container']}>
            <Row>
                <Col lg={8} xs={12}>
                    <Image className={styles['main-image']} src={picURL}/>
                </Col>
                <Col lg={4} xs={12}>
                    <Container className="px-0 py-2 mt-4 mt-lg-0 d-flex flex-column h-100">
                        <h2 className="mb-4 fw-bold">{title}</h2>
                        <p>{desc}</p>
                        <Container className="p-0 mt-auto">
                            <Row className="mb-3">
                                <Col xs={12}>
                                    <h3>{fund.now} klay</h3>
                                    <ProgressBar className={`${styles['progress-bar']} p-0`} now={fund.now/fund.goal * 100} />
                                    <div>
                                        <span> {Math.round(fund.now/fund.goal * 100)}% of {fund.goal} klay goal </span>
                                        <span className="float-end"> {supporters} supporters </span>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={8}>
                                    <Button className={styles['like-btn']} size="lg" variant="outline-primary">
                                        <FontAwesomeIcon icon={liked?faSolidHeart:faRegularHeart}/> {likes}
                                    </Button>
                                </Col>
                                <Col xs={4}>
                                    <Container className="p-0 w-100 h-100 d-flex flex-row justify-content-around align-items-center" >
                                        <FontAwesomeIcon className={styles['icon']} icon={faInstagram} size="2x"/>
                                        <FontAwesomeIcon className={styles['icon']} icon={faTwitter} size="2x"/>
                                        <FontAwesomeIcon className={styles['icon']} icon={faFacebook} size="2x"/>
                                    </Container>
                                </Col>
                            </Row>
                        </Container>
                    </Container>
                </Col>
            </Row>
        </Container>
    )
}

export default Summary;
export type {SummaryProps};