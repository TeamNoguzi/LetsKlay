import React, {useState} from 'react';
import {
    Navbar,
    Container,
    Nav,
    InputGroup,
    FormControl,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faPlus, faBars } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';

import SideMenu from '../SideMenu/SideMenu';

import styles from './Navbar.module.css';

interface NavbarProps {
    type:'header'|'footer';
    device:'pc'|'mobile';
}

const Header:React.FC<NavbarProps> = ({type, device}) => {
    const [showInput, setShowInput] = useState<boolean>(false);
    const [showMenu, setShowMenu] = useState<boolean>(false);

    const hideMenu = () => setShowMenu(false);
    const toggleMenu = () => setShowMenu(!showMenu);

    return (
        <>
        <Navbar 
            bg="white" 
            variant="light"
            className={styles['nav-bar']}
        >
            <Container>
                <Nav className={styles['nav-container']}>
                    {
                        device === 'pc' ?
                        <>
                            <Nav.Link className="mx-lg-4 mx-md-3 mx-sm-2">Home</Nav.Link>
                            <Nav.Link className="mx-lg-4 mx-md-3 mx-sm-2">Features</Nav.Link>
                            <Nav.Link className="mx-lg-4 mx-md-3 mx-sm-2">Pricing</Nav.Link>
                        </>:
                        <>
                            <Nav.Link onClick={toggleMenu}>
                                <FontAwesomeIcon icon={faBars}/>
                            </Nav.Link>
                        </>
                    }

                    <div className={`${styles['nav-padding']} flex-grow-1`}/>
                    <InputGroup 
                        className={`${styles[`input-group-${device}-${showInput?'show':'hide'}`]}`}
                        style={{width:device==='pc' && type==='header'?240:320,}}
                    >
                        <FormControl
                            className={styles['form-control']}
                            placeholder="Search"
                            aria-label="Recipient's username"
                        />
                        <InputGroup.Text
                            className={styles['search-icon']}
                            onClick={()=>setShowInput(!showInput)}
                        >
                            <FontAwesomeIcon icon={faMagnifyingGlass}/>
                        </InputGroup.Text>
                    </InputGroup>

                    <div className={styles['icons']}>
                        {
                            /* header only */
                            type==='header'?
                            <>
                                <FontAwesomeIcon icon={faUser} />
                                <FontAwesomeIcon icon={faPlus}/>
                            </>
                            :undefined
                        }
                    </div>
                </Nav>
            </Container>
        </Navbar>
        <SideMenu show={showMenu} onHide={hideMenu}/>
        </>
    )
}

export default Header;
export type {NavbarProps};