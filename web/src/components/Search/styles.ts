import { Theme } from '@material-ui/core';
import { createStyles } from '@material-ui/core/styles';

export const styles = (theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing.unit,
            minWidth: 120,
        },
        inputRoot: {
            width: '75%',
        },
        search: {
            float: 'left',
            position: 'relative',
            top: '-4px',
        },
        selectEmpty: {
            marginTop: theme.spacing.unit * 2,
        },
    });
