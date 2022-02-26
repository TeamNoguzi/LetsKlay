import React from 'react';
import {
    Navbar,
    Container,
    Nav,
    InputGroup,
    FormControl
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';

import styles from './Navbar.module.css';

interface NavbarProps {
    type:'header'|'footer';
}

const Header:React.FC<NavbarProps> = ({type}) => {

    return (
        <Navbar 
            bg="light" 
            variant="light"
            className={styles['nav-bar']}
        >
            <Container>
                <Nav className={styles['nav-container']}>
                    <Nav.Link className="mx-lg-4 mx-md-3 mx-sm-2">Home</Nav.Link>
                    <Nav.Link className="mx-lg-4 mx-md-3 mx-sm-2">Features</Nav.Link>
                    <Nav.Link className="mx-lg-4 mx-md-3 mx-sm-2">Pricing</Nav.Link>

                    <div className={`${styles['nav-padding']} flex-grow-1`}/>
                    <InputGroup 
                        className={`styles['input-group']`}
                        style={{
                            width:type==='header'?240:320,
                        }}
                    >
                        <FormControl
                            className={styles['form-control']}
                            placeholder="Search"
                            aria-label="Recipient's username"
                        />
                        <InputGroup.Text
                            className={styles['search-icon']}
                        >
                            <FontAwesomeIcon icon={faMagnifyingGlass}/>
                        </InputGroup.Text>
                    </InputGroup>
                    {
                        type==='header'?
                        <div className={styles['icons']}>
                            <FontAwesomeIcon icon={faUser} />
                            <FontAwesomeIcon icon={faPlus}/>
                        </div>:
                        undefined
                    }
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Header;
export type {NavbarProps};