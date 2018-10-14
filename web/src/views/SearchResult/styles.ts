import { Theme } from '@material-ui/core';
import { createStyles } from '@material-ui/core/styles';

export const styles = (theme: Theme) =>
    createStyles({
        header: {
            height: '48px',
        },
        image: {
            height: 128,
            width: 128,
        },
        img: {
            display: 'block',
            margin: 'auto',
            maxHeight: '100%',
            maxWidth: '100%',
        },
        root: {
            elevation: 20,
            flexGrow: 1,
            padding: 2 * theme.spacing.unit,
        },
    });
