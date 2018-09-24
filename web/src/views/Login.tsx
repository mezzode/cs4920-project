import {
    Theme,
} from '@material-ui/core';
import { createStyles, withStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { Nav } from '../components/common/Nav';

// TODO: fiddle with styling
const styles = (theme: Theme) =>
    createStyles({
        layout: {
            marginLeft: theme.spacing.unit * 3,
            marginRight: theme.spacing.unit * 3,
            marginTop: theme.spacing.unit * 3,
            width: 'auto',
        },
        paper: {
        },
    });

interface Props { };

const RawLogin: React.SFC<Props> = () => (
    <>
        <Nav />
        <form action="/login" method="post">
            <div>
                <label>Username:</label>
                <input type="text" name="username" />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" name="password" />
            </div>
            <div>
                <input type="submit" value="Log In" />
            </div>
        </form>
    </>
);

export const Login = withStyles(styles)(RawLogin);
