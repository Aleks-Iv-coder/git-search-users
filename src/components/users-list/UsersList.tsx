import React, {FC} from 'react';
import {UsersListItem} from './UsersListItem';
import {UserInfo} from '../first-screen/FirstScreen';

interface UsersListProps {
    selectedUser?: string;
    onSelectUser: (login: string) => void;
    users: UserInfo[];
}

export const UsersList: FC<UsersListProps> = props => {
    const {users, selectedUser,  onSelectUser} = props;
    const handleSelectUser = (login: string) => () => onSelectUser(login);

    const items = users.map((user: UserInfo) => (
        <UsersListItem
            key={user.id}
            user={user}
            isSelected={!!selectedUser && selectedUser === user.login}
            onSelectUser={handleSelectUser(user.login)}
        />)
    );

    return (<div>{items}</div>);
};

