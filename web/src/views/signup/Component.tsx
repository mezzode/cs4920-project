import {
    Avatar,
    Button,
    FormControl,
    FormLabel,
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

const RawSignUp: React.SFC<Props> = ({
    classes,
    authAttempt,
    handleSubmit,
}) => (
    <>
        <Nav />
        <main className={classes.layout}>
            <Avatar className={classes.avatar}>
                <LockIcon />
            </Avatar>
            <Typography variant="headline">Sign up</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <FormControl margin="normal" required={true} fullWidth={true}>
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <Input
                        id="email"
                        name="email"
                        autoComplete="email"
                        autoFocus={true}
                    />
                </FormControl>
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
                <FormControl margin="normal" required={true} fullWidth={true}>
                    <FormLabel className={classes.profileImage}>
                        Profile picture
                    </FormLabel>
                    <Input type="file" name="profileImage" id="profileImage" />
                </FormControl>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    type="submit"
                >
                    Create account
                </Button>
            </form>
            {authAttempt > 0 && (
                <Snackbar
                    variant="warning"
                    message="Sign up attempt unsuccessful"
                />
            )}
        </main>
    </>
);

export const SignUpComponent = withStyles(styles)(RawSignUp);
