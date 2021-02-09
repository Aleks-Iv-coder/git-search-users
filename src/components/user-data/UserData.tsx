import React, { FC, useEffect, useState } from 'react';
import { Avatar, makeStyles, Theme } from '@material-ui/core';
import {service} from '../../api/service';
import {UserBiography} from '../second-screen/SecondScreen';

const AVATAR_SIZE = 150;

const useUserBiographyStyles = makeStyles<Theme>(({spacing}) => ({
    root: {
        display: 'grid',
        gridTemplateColumns: `${AVATAR_SIZE}px auto`,
        gridColumnGap: spacing(2),
        alignItems: 'center',
        justifyItems: 'center',
    },
    userInfo: {
        paddingLeft: 0,
        listStyle: 'none',
    },
    userInfoData: {
        marginRight: '10px',
    },
    avatar: {
      width: 'auto',
      height: 'auto',
    },
}));

interface UserDataProps {
    selectedUser: string;
}

export const UserData: FC<UserDataProps> = ({selectedUser}) => {
    const [userData, setUserData] = useState<UserBiography>();
    const [loading, setLoading] = useState<boolean>(false);
    const styles = useUserBiographyStyles()

    useEffect(() => {
        setLoading(true);
        service.getUserData(selectedUser)
            .then((data: UserBiography) => {
                setUserData(data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, [selectedUser]);

    if (loading) {
        return null; // todo spinner
    }

    if (!userData) {
        return null;
    }

    let userBio = userData.bio;
    if (!!userData.bio || null) {
        userBio = "biography is missing on the GitHub page";
    }

    return (
        <div>
            <div className={styles.root}>
                <Avatar src={userData.avatar_url} className={styles.avatar}/>
                <ul className={styles.userInfo}>
                    <li><strong className={styles.userInfoData}>UserName:</strong>{userData.userName}</li>
                    <li><strong className={styles.userInfoData}>Email:</strong>{userData.email}</li>
                    <li><strong className={styles.userInfoData}>Location:</strong>{userData.location}</li>
                    <li><strong className={styles.userInfoData}>Join Date:</strong>{userData.join_date}</li>
                    <li><span className={styles.userInfoData}>{userData.followers}</span><strong>Followers</strong></li>
                    <li><strong className={styles.userInfoData}>Following</strong>{userData.following}</li>
                </ul>
            </div>
        </div>
    );
};

