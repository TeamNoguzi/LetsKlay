import React from 'react';

import {
    Container,
    Row,
    Col,
    Image,
    Button
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
}

const Summary:React.FC<SummaryProps> = ({picURL, title, desc, likes}) => {
    return (
        <Container className={styles['root-container']}>
            <Row>
                <Col lg={8} xs={12}>
                    <Image className={styles['main-image']} src={picURL}/>
                </Col>
                <Col lg={4} xs={12}>
                    <Container className="p-0 mt-4 mt-lg-0 d-flex flex-column h-100">
                        <h2 className="mb-4">{title}</h2>
                        <p>{desc}</p>
                        <Container className="p-0 mt-auto">
                            <Row>
                                <Col xs={8}>
                                    <Button className={styles['like-btn']} size="lg" variant="outline-primary">
                                        <FontAwesomeIcon icon={faRegularHeart}/> {likes}
                                    </Button>
                                </Col>
                                <Col xs={4}>
                                    <Container className="p-0 w-100 h-100 d-flex flex-row justify-content-evenly align-items-center" >
                                        <FontAwesomeIcon icon={faInstagram} size="2x"/>
                                        <FontAwesomeIcon icon={faTwitter} size="2x"/>
                                        <FontAwesomeIcon icon={faFacebook} size="2x"/>
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