import React from 'react';
import { css } from './UserProfileCard.module';

const UserProfileCard = ({ profileUser }) => {
    // if (!profileUser) {
    //     return null;
    // }
    console.log({ profileUser });
    return <div className={css.card}>UserProfileCard</div>;
};

export default UserProfileCard;
