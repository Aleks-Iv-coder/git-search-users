import React, {ChangeEvent, FC } from 'react';
import { makeStyles, TextField, Theme } from '@material-ui/core';

export const useSearchBarStyles = makeStyles<Theme>(({spacing}) => ({
    root: {
        margin: '0',
    },
}));
interface SearchBarProps {
    label: string;
    value?: string;
    onChange: (value?: string) => void;
}

export const SearchBar: FC<SearchBarProps> = props => {
    const {label, value, onChange} = props;
    const styles = useSearchBarStyles();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value);

    return (
        <TextField
            label={label}
            variant='outlined'
            value={value || ''}
            onChange={handleChange}
            className={styles.root}
        />
    );
};
