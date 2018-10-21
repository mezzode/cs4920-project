import { Theme } from '@material-ui/core';
import { createStyles } from '@material-ui/core/styles';

export const styles = (theme: Theme) =>
    createStyles({
        details: {
            padding: 0,
        },
        // header: {
        //     height: '48px', // TODO: get var from theme instead of hardcoding?
        // },
        link: {
            '&:link': {
                ...theme.typography.body1,
                textDecoration: 'none',
            },
            // tslint:disable-next-line:object-literal-sort-keys since must overwrite :link
            '&:hover': {
                ...theme.typography.body1,
                textDecoration: 'underline',
            },
            '&:visited': {
                ...theme.typography.body1,
                textDecoration: 'none',
            },
        },
        tableText: {
            color: 'white',
        },
    });
