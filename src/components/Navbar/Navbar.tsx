import React from 'react';
import {
    Navbar,
    Container,
    Nav
} from 'react-bootstrap';

import styles from './Navbar.module.css';

interface NavbarProps {
    
}

const Header:React.FC<NavbarProps> = () => {

    return (
        <Navbar 
            bg="light" 
            variant="light"
        >
            <Container >
                <Nav className="me-auto">
                    <Nav.Link>Home</Nav.Link>
                    <Nav.Link>Features</Nav.Link>
                    <Nav.Link>Pricing</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Header;
export type {NavbarProps};