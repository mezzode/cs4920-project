import amber from '@material-ui/core/colors/amber';
import green from '@material-ui/core/colors/green';

export const styles1 = (theme: any) => ({
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        marginRight: theme.spacing.unit,
        opacity: 0.9,
    },
    info: {
        backgroundColor: theme.palette.primary.dark,
    },
    message: {
        alignItems: 'center',
        display: 'flex',
    },
    success: {
        backgroundColor: green[600],
    },
    warning: {
        backgroundColor: amber[700],
    },
});

export const styles2 = (theme: any) => ({
    margin: {
        margin: theme.spacing.unit,
    },
});
