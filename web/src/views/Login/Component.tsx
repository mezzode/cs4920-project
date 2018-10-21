import {
    // Avatar,
    Button,
    Card,
    CardContent,
    CardHeader,
    Grid,
    TextField,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { Nav } from '../../components/common/Nav/index';
import { Snackbar } from '../../components/common/Snackbar';
import { styles } from './styles';
import { Props, State } from './types';

export const LoginComponent = withStyles(styles)(
    class extends React.Component<Props, State> {
        public state: State = {
            password: '',
            username: '',
        };

        public render() {
            const { classes, handleSubmit } = this.props;
            const { username, password } = this.state;
            return (
                <>
                    <Nav />
                    <main className={classes.layout}>
                        <Grid container={true}>
                            <Grid xs={4} item={true} />
                            <Grid xs={4} item={true}>
                                <Card>
                                    <CardHeader title="Log In" />
                                    <CardContent>
                                        <TextField
                                            margin="dense"
                                            required={true}
                                            fullWidth={true}
                                            id="username"
                                            name="username"
                                            autoComplete="username"
                                            autoFocus={true}
                                            label="Username"
                                            variant="outlined"
                                            value={username}
                                            onChange={this.handleInput}
                                        />
                                        <TextField
                                            margin="dense"
                                            required={true}
                                            fullWidth={true}
                                            id="password"
                                            name="password"
                                            autoComplete="password"
                                            autoFocus={true}
                                            label="Password"
                                            variant="outlined"
                                            value={password}
                                            onChange={this.handleInput}
                                            type="password"
                                        />
                                        <Grid
                                            container={true}
                                            justify="flex-end"
                                            className={classes.button}
                                        >
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={handleSubmit(
                                                    username,
                                                    password,
                                                )}
                                            >
                                                Log in
                                            </Button>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid xs={4} item={true} />
                        </Grid>
                        <Snackbar
                            variant="warning"
                            message="Login attempt unsuccessful"
                        />
                    </main>
                </>
            );
        }

        private handleInput: React.ChangeEventHandler<HTMLInputElement> = e => {
            const { name, value } = e.target;
            this.setState({
                [name]: value,
            } as Pick<State, keyof State>);
        };
    },
);
