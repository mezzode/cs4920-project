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
import { Nav } from '../../components/common/Nav/index';
import { Snackbar } from '../../components/common/Snackbar';
import { styles } from './styles';
import { Props } from './types';

const RawLogin: React.SFC<Props> = ({ classes, showFail, handleSubmit }) => (
    <>
        <Nav />
        <main className={classes.layout}>
            <Avatar className={classes.avatar}>
                <LockIcon />
            </Avatar>
            <Typography variant="headline">Log in</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
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
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input
                        name="password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                </FormControl>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    type="submit"
                >
                    Log in
                </Button>
            </form>
            <Snackbar variant="warning" message="Login attempt unsuccessful" />
        </main>
    </>
);

export const LoginComponent = withStyles(styles)(RawLogin);
