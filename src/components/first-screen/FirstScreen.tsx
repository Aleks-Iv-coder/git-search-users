import React, { FC, useEffect, useState } from 'react';
import { Typography, makeStyles, Theme, } from '@material-ui/core';
import {useDebouncedValue} from '../../common/hooks';
import {SearchBar} from '../../common/search-bar/SearchBar';
import {service} from '../../api/service';
import {UsersList} from '../users-list/UsersList';

const useFirstScreenStyles = makeStyles<Theme>(({spacing}) => ({
    root: {
        display: 'grid',
        gridRowGap: spacing(2),
    },
    header: {
        justifySelf: 'center',
    },
}));

export interface UserInfo {
    id: number;
    login: string;
    avatar_url: string;
}

interface FirstScreenProps {
    selectedUser?: string;
    onSelectUser: (login: string) => void;
}

export const FirstScreen: FC<FirstScreenProps> = props => {
    const {selectedUser, onSelectUser} = props;
    const [users, setUsers] = useState<UserInfo[]>([]);
    const [search, setSearch] = useState<string>();
    const debouncedSearch = useDebouncedValue(300, search);

    const styles = useFirstScreenStyles();

    useEffect(() => {
        service.searchUsers(debouncedSearch)
            .then((users: UserInfo[]) => {
                setUsers(users);
            })
            .catch(() => {
                setUsers([]);
            });
    }, [debouncedSearch]);

    const handleChangeSearch = (value?: string) => setSearch(value);

    return (
        <div className={styles.root}>
            <Typography variant='h5' className={styles.header}>
                GitHub Searcher
            </Typography>
            <SearchBar label='Search for Users' value={search} onChange={handleChangeSearch} />
            <UsersList selectedUser={selectedUser} users={users} onSelectUser={onSelectUser} />
        </div>
    );
}
