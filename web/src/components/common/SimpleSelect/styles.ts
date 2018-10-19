import { Theme } from '@material-ui/core';
import { createStyles } from '@material-ui/core/styles';

export const styles = (theme: Theme) =>
    createStyles({
        selectEmpty: {
            marginTop: theme.spacing.unit * 2,
        },
    });
