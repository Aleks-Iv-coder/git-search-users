import React, { FC, useEffect, useState } from 'react';
import { Avatar, CircularProgress, makeStyles, Theme } from '@material-ui/core';
import {ListItem} from '../../common/list-item/ListItem';
import {service} from '../../api/service';
import {UserInfo} from '../first-screen/FirstScreen';

const useUserListItemStyles = makeStyles<Theme>(({palette}) => ({
    userInfo: {
        display: 'grid',
        gridTemplateColumns: '50px auto',
        alignItems: 'center',
        justifyItems: 'center',
    },
    userLogin: {
        marginLeft: '20px'
    },
    selected: {
        backgroundColor: '#d6d1d1'
    },
}));

interface UsersListItemProps {
    user: UserInfo;
    isSelected: boolean;
    onSelectUser: () => void;
}

export const UsersListItem: FC<UsersListItemProps> = props => {
    const {user, isSelected, onSelectUser} = props;
    const [repos, setRepos] = useState<number>();
    const [loading, setLoading] = useState<boolean>(false);
    const styles = useUserListItemStyles();

    useEffect(() => {
        setLoading(true);
        service.getUserRepoCount(user.login)
            .then((total: number) => {
                setLoading(false);
                setRepos(total);
            })
            .catch(() => {
                setLoading(false);
            });
    }, [user.login]);

    const reposCount = loading ? <CircularProgress size={30} className={styles.progress}/> :
        (repos !== undefined && <span className='item-repo'> Repo: {repos} </span>);

    return (
        <ListItem
            mainText={
                <div className={styles.userInfo}>
                    <Avatar src={user.avatar_url}/>
                    <span className={styles.userLogin}>{user.login}</span>
                </div>
            }
            additionalText={reposCount}
            onClick={onSelectUser}
            className={isSelected ? styles.selected : undefined}
        />
    );
};
