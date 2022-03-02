import React from 'react';

import {
    Offcanvas
} from 'react-bootstrap';

import Logo from '../Logo/Logo';

import styles from './SideMenu.module.css';

interface SideMenuProps {
    show:boolean;
    onHide:()=>void;
}

const Header:React.FC<SideMenuProps> = ({show, onHide}) => {
    return (
        <Offcanvas 
            className={styles['canvas-container']}
            show={show} 
            onHide={onHide} 
            scroll 
            backdrop
        >
            <Offcanvas.Header closeButton className="pb-0">
                <Offcanvas.Title><Logo/></Offcanvas.Title>
            </Offcanvas.Header>
            <hr/>
            <Offcanvas.Body className={styles['canvas-body']}>
                <div>
                    <h5>hi</h5>
                </div>
                <div>
                    <h5>hi</h5>
                </div>
                <div>
                    <h5>hi</h5>
                </div>
                <div>
                    <h5>hi</h5>
                </div>
            </Offcanvas.Body>
        </Offcanvas>
    )
}

export default Header;
export type {SideMenuProps};