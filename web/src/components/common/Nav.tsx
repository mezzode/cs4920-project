import { createStyles, Typography, withStyles, WithStyles } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { IState } from "../../reducers";
import { IUserState } from "../../reducers/user";

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
    user: IUserState;
}

const HomeLink: React.SFC = props => <Link to="/" {...props} />

const Nav: React.SFC<IProps> = ({ classes, transparent, user }) => (
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

const mapStateToProps = (state: IState) => ({
    user: state.user
})

export default connect(mapStateToProps)(withStyles(styles)(Nav));
