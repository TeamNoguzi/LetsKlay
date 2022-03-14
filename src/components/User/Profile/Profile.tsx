import React from 'react';

import {
    Container, 
    Image,
} from 'react-bootstrap';

import styles from './Profile.module.css';

interface ProfileProps {
    imageURL:string;
    name:string;
    email:string;
    location:string;
}

const Profile:React.FC<ProfileProps> = 
({imageURL, name, email, location}) => {
    return (
        <Container className={styles['wrapper']}>
            <Image className={styles['image']} src={imageURL}></Image>
            
            <h2 className="my-3">{name}</h2>

            <div className={styles['info']}>
                <span>Email</span>
                <h5>{email}</h5>
                <span>Location</span>
                <h5>{location}</h5>
            </div>
        </Container>
    )
}

export default Profile;
export type {ProfileProps};