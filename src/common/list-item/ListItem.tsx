import React, { FC, ReactNode } from 'react';
import { makeStyles, Theme } from '@material-ui/core';

const useListItemStyles = makeStyles<Theme>(({palette, spacing}) => ({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        border: `1px solid ${palette.divider}`,
        alignItems: 'center',
        borderRadius: spacing(0.5),
        padding: spacing(0.5, 2),
    }
}));

interface ListItemProps {
    mainText: ReactNode;
    additionalText?: ReactNode;
    onClick?: () => void;
    className?: string;
}

export const ListItem: FC<ListItemProps> = props => {
    const {mainText, additionalText, onClick, className} = props;
    const styles = useListItemStyles();

    return (
        <div className={`${styles.root} ${className}`} onClick={onClick}>
            <span>{mainText}</span>
            <span>{additionalText}</span>
        </div>
    );
};
