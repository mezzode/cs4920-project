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
// import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
// import { Action } from 'redux';
// import { ThunkDispatch } from 'redux-thunk';
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

class RawLogin extends React.Component<Props> {
    public constructor(props: Props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    public async handleSubmit(event: any) {
        event.preventDefault();
        const data = new FormData(event.target);

        const res = await fetch('/login', {
            body: data,
            method: 'post',
        });
        // TODO
        // if successful go to dashboard
        // <Redirect to='/dashboard' />
        // set display name to username
        // dispatch(setUser);
    }

    public render() {
        const { classes } = this.props;
        return (
            <>
                <Nav />
                <main className={classes.layout}>
                    <Avatar className={classes.avatar}>
                        <LockIcon />
                    </Avatar>
                    <Typography variant="headline">Log in</Typography>
                    <form
                        className={classes.form}
                        onSubmit={this.handleSubmit}
                        action="/login"
                        method="post"
                    >
                        <FormControl
                            margin="normal"
                            required={true}
                            fullWidth={true}
                        >
                            <InputLabel htmlFor="username">Username</InputLabel>
                            <Input
                                id="username"
                                name="username"
                                autoComplete="username"
                                autoFocus={true}
                            />
                        </FormControl>
                        <FormControl
                            margin="normal"
                            required={true}
                            fullWidth={true}
                        >
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
                </main>
            </>
        );
    }
}

export const Login = withStyles(styles)(RawLogin);
// export const Login = connect(
//     mapStateToProps,
//     mapDispatchToProps,
// )(withStyles(styles)(RawLogin));
