import { Theme } from '@material-ui/core';
import { createStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';

export const styles = (theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing.unit,
            marginTop: '-12px',
            minWidth: 120,
        },
        formRoot: {
            all: 'inherit',
        },
        inputInput: {
            paddingBottom: theme.spacing.unit,
            paddingLeft: theme.spacing.unit * 10,
            paddingRight: theme.spacing.unit,
            paddingTop: theme.spacing.unit,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: 200,
            },
        },
        inputRoot: {
            color: 'inherit',
            width: '100%',
        },
        search: {
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            backgroundColor: fade(theme.palette.common.white, 0.15),
            borderRadius: theme.shape.borderRadius,
            marginLeft: 0,
            marginRight: theme.spacing.unit * 2,
            position: 'relative',
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing.unit * 3,
                width: 'auto',
            },
        },
        searchIcon: {
            alignItems: 'center',
            display: 'flex',
            height: '100%',
            justifyContent: 'center',
            pointerEvents: 'none',
            position: 'absolute',
            width: theme.spacing.unit * 9,
        },
        select: {
            alignItems: 'center',
            display: 'flex',
            height: '100%',
            justifyContent: 'center',
            pointerEvents: 'none',
            position: 'absolute',
            width: theme.spacing.unit * 20,
        },

        // formControl: {
        //     margin: theme.spacing.unit,
        //     minWidth: 120,
        // },
        // inputRoot: {
        //     width: '75%',
        // },
        // root: {
        //     display: 'flex',
        //     flexWrap: 'wrap',
        // },
        // search: {
        //     float: 'left',
        //     position: 'relative',
        //     top: '-4px',
        // },
        // selectEmpty: {
        //     marginTop: theme.spacing.unit * 2,
        // },
    });
