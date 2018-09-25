import { Theme } from '@material-ui/core';
import { createStyles } from '@material-ui/core/styles';

export const styles = (theme: Theme) =>
    createStyles({
        avatar: {
            backgroundColor: theme.palette.secondary.main,
            margin: theme.spacing.unit,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        form: {
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            marginTop: theme.spacing.unit * 8,
            padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit *
                3}px ${theme.spacing.unit * 3}px`,
            width: '100%', // Fix IE11 issue.
        },
        layout: {
            marginLeft: theme.spacing.unit * 3,
            marginRight: theme.spacing.unit * 3,
            marginTop: theme.spacing.unit * 3,
            textAlign: 'center',
            width: 'auto',
        },
        profileImage: {
            textAlign: 'left',
        },
        submit: {
            marginTop: theme.spacing.unit * 3,
        },
    });
