import React from 'react';

import styles from './Logo.module.css';

interface LogoProps {
    // device:'pc'|'mobile';
}

const Logo:React.FC<LogoProps> = ({}) => {
    return (
        <h2 className={styles['Logo']}>LetsKlay</h2>
    )
}

export default Logo;
export type {LogoProps};