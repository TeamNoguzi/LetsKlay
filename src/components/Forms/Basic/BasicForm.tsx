import React from 'react';

import {
    Container,
    Row,
    Col,
    Form
} from 'react-bootstrap';

import styles from './BasicForm.module.css';

interface BasicFormProps {

};

const BasicForm:React.FC<BasicFormProps> = ({}) => {

    return (
        <Container className={styles['container']}>
            <Row>
                <h4>Title</h4>
            </Row>
            <Row className="d-lg-none">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Etiam bibendum erat id arcu suscipit mattis. 
                    Pellentesque dignissim nunc eu tortor molestie luctus. 
                    In a magna ipsum. Vestibulum sed metus sed.
                </p>
            </Row>
            <Row>
                <Col lg={8} xs={12}>
                    <Form.Group className="mb-3" controlId="basic-form-title">
                        <Form.Label className={styles['label']}>title</Form.Label>
                        <Form.Control type="text" placeholder="Enter title" />
                    </Form.Group>
                </Col>
                <Col lg={4} className="d-none d-lg-block">
                    <p className="pt-2">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Etiam bibendum erat id arcu suscipit mattis. 
                        Pellentesque dignissim nunc eu tortor molestie luctus. 
                        In a magna ipsum. Vestibulum sed metus sed.
                    </p>
                </Col>
            </Row>
            <Row>
                <Col lg={8} xs={12}>
                    <Form.Group className="mb-3" controlId="basic-form-subtitle">
                        <Form.Label className={styles['label']}>subtitle</Form.Label>
                        <Form.Control type="text" placeholder="Enter subtitle" />
                    </Form.Group>
                </Col>
                <Col lg={4} className="d-none d-lg-block">
                    <p className="pt-2">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Etiam bibendum erat id arcu suscipit mattis. 
                        Pellentesque dignissim nunc eu tortor molestie luctus. 
                        In a magna ipsum. Vestibulum sed metus sed.
                    </p>
                </Col>
            </Row>

            <hr/>

            <Row>
                <h4>Summary</h4>
            </Row>
            <Row className="d-lg-none">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Etiam bibendum erat id arcu suscipit mattis. 
                    Pellentesque dignissim nunc eu tortor molestie luctus. 
                    In a magna ipsum. Vestibulum sed metus sed.
                </p>
            </Row>
            <Row>
                <Col lg={8} xs={12}>
                    <Form.Group className="mb-3" controlId="basic-form-summary">
                        <Form.Label className={styles['label']}>Summary</Form.Label>
                        <Form.Control as="textarea" style={{height:'200px'}} placeholder="Enter summary" />
                    </Form.Group>
                </Col>
                <Col lg={4} className="d-none d-lg-block">
                    <p className="pt-2">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Etiam bibendum erat id arcu suscipit mattis. 
                        Pellentesque dignissim nunc eu tortor molestie luctus. 
                        In a magna ipsum. Vestibulum sed metus sed.
                    </p>
                </Col>
            </Row>

            <hr/>
            
            <Row>
                <h4>Seller Information</h4>
            </Row>
            <Row className="d-lg-none">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Etiam bibendum erat id arcu suscipit mattis. 
                    Pellentesque dignissim nunc eu tortor molestie luctus. 
                    In a magna ipsum. Vestibulum sed metus sed.
                </p>
            </Row>
            <Row>
                <Col lg={8} xs={12}>
                    <Form.Group className="mb-3" controlId="basic-form-name">
                        <Form.Label className={styles['label']}>Company or Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter name" />
                    </Form.Group>
                </Col>
                <Col lg={4} className="d-none d-lg-block">
                    <p className="pt-2">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Etiam bibendum erat id arcu suscipit mattis. 
                        Pellentesque dignissim nunc eu tortor molestie luctus. 
                        In a magna ipsum. Vestibulum sed metus sed.
                    </p>
                </Col>
            </Row>
            <Row>
                <Col lg={8} xs={12}>
                    <Form.Group className="mb-3" controlId="basic-form-email">
                        <Form.Label className={styles['label']}>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>
                </Col>
                <Col lg={4} className="d-none d-lg-block">
                    <p className="pt-2">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Etiam bibendum erat id arcu suscipit mattis. 
                        Pellentesque dignissim nunc eu tortor molestie luctus. 
                        In a magna ipsum. Vestibulum sed metus sed.
                    </p>
                </Col>
            </Row>
            <Row>
                <Col lg={8} xs={12}>
                    <Form.Group className="mb-3" controlId="basic-form-phone">
                        <Form.Label className={styles['label']}>Phone</Form.Label>
                        <Form.Control type="phone" placeholder="Enter phone" />
                    </Form.Group>
                </Col>
                <Col lg={4} className="d-none d-lg-block">
                    <p className="pt-2">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Etiam bibendum erat id arcu suscipit mattis. 
                        Pellentesque dignissim nunc eu tortor molestie luctus. 
                        In a magna ipsum. Vestibulum sed metus sed.
                    </p>
                </Col>
            </Row>

            <hr/>
        </Container>
    )
}

export default BasicForm;
export type {BasicFormProps}