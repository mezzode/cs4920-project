import {
    Avatar,
    Button,
    FormControl,
    Input,
    InputLabel,
    Theme,
    Typography,
    WithStyles,
} from '@material-ui/core';
import { createStyles, withStyles } from '@material-ui/core/styles';
import { LockOutlined as LockIcon } from '@material-ui/icons';
import * as React from 'react';
import { Nav } from '../components/common/Nav';

// TODO: fiddle with styling
const styles = (theme: Theme) =>
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
        submit: {
            marginTop: theme.spacing.unit * 3,
        },
    });
interface Props extends WithStyles<typeof styles> {}

const RawPasswordReset: React.SFC<Props> = ({ classes }) => (
    <>
        <Nav />
        <main className={classes.layout}>
            <Avatar className={classes.avatar}>
                <LockIcon />
            </Avatar>
            <Typography variant="headline">Reset password</Typography>
            <form
                className={classes.form}
                action="/reset-password"
                method="post"
            >
                <FormControl margin="normal" required={true} fullWidth={true}>
                    <InputLabel htmlFor="username">Username</InputLabel>
                    <Input
                        id="username"
                        name="username"
                        autoComplete="username"
                        autoFocus={true}
                    />
                </FormControl>
                <FormControl margin="normal" required={true} fullWidth={true}>
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <Input
                        name="email"
                        type="email"
                        id="email"
                        autoComplete="current-email"
                    />
                </FormControl>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    type="submit"
                >
                    Reset
                </Button>
            </form>
        </main>
    </>
);

export const PasswordReset = withStyles(styles)(RawPasswordReset);
