import React from 'react';

import Navbar from '../Navbar/Navbar';
import Logo from '../Logo/Logo';

import styles from './Header.module.css';

interface HeaderProps {
    device:'pc'|'mobile';
}

const Header:React.FC<HeaderProps> = ({device}) => {

    return (
        <>  
            <div className={`${styles[`Logo-container-${device}`]}`}>
                <Logo/>
            </div>
            <Navbar type='header' device={device}/>
        </>
    )
}

export default Header;
export type {HeaderProps};