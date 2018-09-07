import { createStyles, Typography, withStyles, WithStyles } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import * as React from "react";
import { connect, MapStateToProps } from "react-redux";
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

interface IStateProps {
    user: IUserState;
}

interface IOwnProps {
    /** If true, nav is made transparent and shadowless. */
    transparent?: boolean;
}

interface IProps extends IStateProps, IOwnProps, WithStyles<typeof styles> { }

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

const mapStateToProps: MapStateToProps<IStateProps, IOwnProps, IState> = state => ({
    user: state.user
})

export const UnconnectedNav = withStyles(styles)(RawNav);
const Nav = connect(mapStateToProps)(UnconnectedNav);
export default Nav;
