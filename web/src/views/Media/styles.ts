import { Theme } from '@material-ui/core';
import { createStyles } from '@material-ui/core/styles';

export const styles = (theme: Theme) =>
    createStyles({
        card: {
            flexBasis: 0,
            marginBottom: theme.spacing.unit * 2,
        },
        details: {
            flexDirection: 'column',
            flexWrap: 'nowrap',
        },
        img: {
            display: 'block',
            margin: 'auto',
            maxHeight: '100%',
            maxWidth: '100%',
        },
        layout: {
            marginLeft: theme.spacing.unit * 3,
            marginRight: theme.spacing.unit * 3,
            marginTop: theme.spacing.unit * 3,
            width: 'auto',
        },
        paper: {
            elevation: 20,
            padding: theme.spacing.unit * 2,
        },
    });
