import { Typography, withStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import * as React from 'react';
import { Logout } from '../../Logout';
import { Search } from '../../Search';
import { LinkTo } from '../util';
import { styles } from './styles';
import { Props } from './types';

export const RawNav: React.SFC<Props> = ({ classes, transparent, user }) => (
    <AppBar
        position="static"
        className={transparent ? classes.transparent : undefined}
    >
        <Toolbar className={classes.parent}>
            <Button component={LinkTo('/')}>
                <Typography variant="h6" color="inherit">
                    medialog
                </Typography>
            </Button>
            <div className={classes.grow} />
            <Search />
            <div>
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
                        <Button
                            component={LinkTo(
                                `/user/${user.displayName}/lists/games`,
                            )}
                            color="inherit"
                        >
                            Lists
                        </Button>
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
