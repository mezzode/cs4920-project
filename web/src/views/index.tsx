import { CssBaseline } from "@material-ui/core";
import * as React from "react";
import { connect, MapStateToProps } from "react-redux";
import { Route, RouteComponentProps, Switch, withRouter } from "react-router";
import { IState } from "../reducers";
import { Landing } from "./Landing";
import { NotFound } from "./NotFound";

const ViewComponent: React.SFC<IProps> = ({auth}) => {
    const authRoutes = (
        <Switch>
            <Route component={NotFound} />
        </Switch>
    )
    const unauthRoutes = (
        <Switch>
            <Route exact={true} path="/" component={Landing} />
            <Route component={NotFound} />
        </Switch>
    );
    return (
        <>
            <CssBaseline />
            {auth ? authRoutes : unauthRoutes}
        </>
    );
}

interface IStateProps {
    auth: boolean;
}

interface IOwnProps extends RouteComponentProps<{}> { }

type IProps = IStateProps;

const mapStateToProps: MapStateToProps<IStateProps, IOwnProps, IState> = state => ({
    auth: state.user.displayName !== null
})

export const View = withRouter(connect(mapStateToProps)(ViewComponent));
