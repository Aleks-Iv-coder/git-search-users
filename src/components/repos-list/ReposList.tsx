import React, {FC} from 'react';
import {RepoInfo} from '../second-screen/SecondScreen';
import {ReposListItem} from '../repos-list/ReposListItem';

interface ReposListProps {
    repos: RepoInfo[];
}

export const ReposList: FC<ReposListProps> = props => {
    const {repos} = props;

    const items = repos.map((repo: RepoInfo) => (
        <ReposListItem
            key={repo.id}
            repo={repo}
        />)
    );

    return (<div>{items}</div>);
};

