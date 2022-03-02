import React from 'react';

import Navbar from '../Navbar/Navbar';
import Logo from '../Logo/Logo';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faInstagram,
    faFacebook,
    faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import {faEnvelope} from '@fortawesome/free-regular-svg-icons';
 
import styles from './Footer.module.css';

interface FooterProps {
    device:'pc'|'mobile';
}

const Footer:React.FC<FooterProps> = ({device}) => {

    return (
        <>  
            <Navbar type='footer' device={device}/>
            <div className="container d-flex align-items-center flex-column flex-md-row">
                <div className={`${styles[`Logo-container-${device}`]}`}>
                    <Logo/>
                    <span className={styles['logo-divider']}/>
                    <span className={styles['copyright']}>Team Noguzi. All rights reserved</span>
                </div>

                <div className="flex-grow-1"/>

                <div className={styles['icons']}>
                    <FontAwesomeIcon icon={faEnvelope} size="2x" color="#B7B7A4"/>
                    <FontAwesomeIcon icon={faTwitter} size="2x" color="#B7B7A4"/>
                    <FontAwesomeIcon icon={faFacebook} size="2x" color="#B7B7A4"/>
                    <FontAwesomeIcon icon={faInstagram} size="2x" color="#B7B7A4"/>
                </div>
            </div>
        </>
    )
}

export default Footer;
export type {FooterProps};