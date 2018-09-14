import { createStyles, Typography, withStyles } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import * as React from "react";
import { Link } from "react-router-dom";
import { IProps } from "./types";

export const styles = createStyles({
    parent: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    transparent: {
        background: 'transparent',
        boxShadow: 'none',
    }
});


const HomeLink: React.SFC = props => <Link to="/" {...props} />

export const RawNav: React.SFC<IProps> = ({ classes, transparent, user }) => (
    <AppBar position="static" className={transparent ? classes.transparent : undefined}>
        <Toolbar className={classes.parent}>
            <Button component={HomeLink}>
                <Typography variant="title" color="inherit">medialog</Typography>
            </Button>
            <div>
                <Button color="inherit">Sign up</Button>
                <Button color="inherit">Log in</Button>
            </div>
        </Toolbar>
    </AppBar>
);

export const NavComponent = withStyles(styles)(RawNav);
