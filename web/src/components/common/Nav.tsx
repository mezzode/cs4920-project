import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import * as React from "react";

const styles = createStyles({
    parent: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    transparent: {
        background: 'transparent',
        boxShadow: 'none',
    }
});

export interface IProps extends WithStyles<typeof styles> {
    transparent?: boolean;
}

const Nav: React.SFC<IProps> = ({ classes, transparent }) => (
    <AppBar position="static" className={transparent ? classes.transparent : undefined}>
        <Toolbar className={classes.parent}>
            <Typography variant="title" color="inherit">medialog</Typography>
            <div>
                <Button color="inherit">Sign up</Button>
                <Button color="inherit">Log in</Button>
            </div>
        </Toolbar>
    </AppBar>
);

export default withStyles(styles)(Nav);
