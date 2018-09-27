import {
    createStyles,
    IconButton,
    Typography,
    withStyles,
} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Toolbar from '@material-ui/core/Toolbar';
import SearchIcon from '@material-ui/icons/Search';
import * as React from 'react';
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
                <form action="/search" className={classes.search}>
                    <IconButton type="submit">
                        <SearchIcon />
                    </IconButton>
                    <Input
                        name="q"
                        type="text"
                        id="q"
                        placeholder="Search"
                        classes={{
                            root: classes.inputRoot,
                        }}
                    />
                </form>
                <Button color="inherit">Sign up</Button>
                <Button color="inherit">Log in</Button>
            </div>
        </Toolbar>
    </AppBar>
);

export const NavComponent = withStyles(styles)(RawNav);
