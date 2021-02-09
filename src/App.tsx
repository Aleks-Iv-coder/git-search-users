import React, { FC, useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import {SecondScreen} from './components/second-screen/SecondScreen';
import {FirstScreen} from './components/first-screen/FirstScreen';

const useAppStyles = makeStyles<Theme>(({ spacing }) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridColumnGap: spacing(5),
    margin: spacing(2),
  },
}));

export const App: FC = () => {
  const [selectedUser, setSelectedUser] = useState<string>();
  const styles = useAppStyles();

  const handleSelectUser = (login?: string) => setSelectedUser(login);

  return (
    <div className={styles.root}>
      <FirstScreen selectedUser={selectedUser} onSelectUser={handleSelectUser}/>
      <SecondScreen selectedUser={selectedUser} />
    </div>
  );
}

export default App;
