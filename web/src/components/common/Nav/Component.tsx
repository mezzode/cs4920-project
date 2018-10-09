import { createStyles, Typography, withStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import * as React from 'react';
import { Logout } from '../../Logout';
import { Search } from '../../Search';
import { LinkTo } from '../util';
import { Props } from './types';

export const styles = createStyles({
    inputRoot: {
        width: '75%',
    },
    parent: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    search: {
        float: 'left',
        position: 'relative',
        top: '-4px',
    },
    transparent: {
        background: 'transparent',
        boxShadow: 'none',
    },
});

export const RawNav: React.SFC<Props> = ({ classes, transparent, user }) => (
    <AppBar
        position="static"
        className={transparent ? classes.transparent : undefined}
    >
        <Toolbar className={classes.parent}>
            <Button component={LinkTo('/')}>
                <Typography variant="title" color="inherit">
                    medialog
                </Typography>
            </Button>
            <div>
                <Search />
                {!user.displayName ? (
                    <>
                        <Button component={LinkTo('/sign-up')} color="inherit">
                            Sign up
                        </Button>
                        <Button component={LinkTo('/login')} color="inherit">
                            Log in
                        </Button>
                    </>
                ) : (
                    <>
                        <Button component={LinkTo('/profile')} color="inherit">
                            Profile
                        </Button>
                        <Logout component={LinkTo('/')} />
                    </>
                )}
            </div>
        </Toolbar>
    </AppBar>
);

export const NavComponent = withStyles(styles)(RawNav);
