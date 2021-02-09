import React, {FC} from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import {RepoInfo} from '../second-screen/SecondScreen';
import {ListItem} from '../../common/list-item/ListItem';

const useReposListItemStyles = makeStyles<Theme>(({palette}) => ({
    repoInfo: {
        display: 'grid',
    },

    repoItemStyle: {
        padding: '0 10px',
    }
}));

interface ReposListItemProps {
    repo: RepoInfo;
}

export const ReposListItem: FC<ReposListItemProps> = ({repo}) => {
    const styles = useReposListItemStyles();

    const handleRedirect = () => {
        window.open(`${repo.url}`);
    };

    return (
        <ListItem 
            mainText={repo.name}
            additionalText={
                <span className={styles.repoInfo}>
                    <span><strong>{repo.forks} Forks</strong></span>
                    <span><strong>{repo.stars} Stars</strong></span>
                </span>
            }
            onClick={handleRedirect}
        />
    );
};
