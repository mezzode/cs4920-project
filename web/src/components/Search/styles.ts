import { Theme } from '@material-ui/core';
import { createStyles } from '@material-ui/core/styles';

export const styles = (theme: Theme) =>
    createStyles({
        inputRoot: {
            width: '75%',
        },
        search: {
            float: 'left',
            position: 'relative',
            top: '-4px',
        },
    });
