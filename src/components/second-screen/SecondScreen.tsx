import React, { FC, useEffect, useState } from 'react';
import { Typography, makeStyles, Theme } from '@material-ui/core';
import {ReposList} from '../repos-list/ReposList';
import {UserData} from '../user-data/UserData';
import {UserInfo} from '../first-screen/FirstScreen';
import {useDebouncedValue} from '../../common/hooks';
import {SearchBar} from '../../common/search-bar/SearchBar';
import {service} from '../../api/service';

const useSecondScreenStyles = makeStyles<Theme>(({spacing}) => ({
    root: {
        display: 'grid',
        gridRowGap: spacing(2),
        alignSelf: 'start',
    },
    header: {
        justifySelf: 'center',
    },
}));

export interface RepoInfo {
    id: number;
    name: string;
    forks: number;
    stars: number;
    url: string;
}

export interface UserBiography extends UserInfo {
    userName?: string;
   email?: string;
   location?: string;
   join_date?: string;
   followers?: number;
   following?: number;
   bio?: string;
}

interface SecondScreenProps {
    selectedUser?: string;
}

export const SecondScreen: FC<SecondScreenProps> = props => {
    const {selectedUser} = props;
    const [repos, setRepos] = useState<RepoInfo[]>([]);
    const [search, setSearch] = useState<string>('');
    const debouncedSearch = useDebouncedValue(300, search);

    const styles = useSecondScreenStyles();

    useEffect(() => {
        setSearch('');
    }, [selectedUser]);

    useEffect(() => {
        if (selectedUser) {
            service.searchRepos(selectedUser, debouncedSearch)
                .then((repos: RepoInfo[]) => {
                    setRepos(repos);
                })
                .catch(() => {
                    setRepos([]);
                });
        }
    }, [debouncedSearch, selectedUser]);

    const handleChangeSearch = (value?: string) => setSearch(value || '');

    if (!selectedUser) {
        return null;
    }

    return (
        <div className={styles.root}>
            <Typography variant='h5' className={styles.header}>
                GitHub User Information
            </Typography>
             <UserData selectedUser={selectedUser}/>
            <SearchBar label='Repos search' value={search} onChange={handleChangeSearch}/>
            <ReposList repos={repos}/>
        </div>
    );
}
