import {
    Avatar,
    Button,
    FormControl,
    Input,
    InputLabel,
    Typography,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { LockOutlined as LockIcon } from '@material-ui/icons';
import * as React from 'react';
import { Nav } from '../../components/common/Nav';
import { styles } from './styles';
import { Props } from './types';

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

export const PasswordResetComponent = withStyles(styles)(RawPasswordReset);
