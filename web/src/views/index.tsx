import { CssBaseline } from '@material-ui/core';
import * as React from 'react';
import { connect, MapStateToProps } from 'react-redux';
import { Route, RouteComponentProps, Switch, withRouter } from 'react-router';
import { State } from '../reducers';
import { Landing } from './Landing';
import { NotFound } from './NotFound';

const ViewComponent: React.SFC<IProps> = ({ auth }) => {
    const authRoutes = (
        <Switch>
            <Route component={NotFound} />
        </Switch>
    );
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
};

interface StateProps {
    auth: boolean;
}

interface OwnProps extends RouteComponentProps<{}> {}

type IProps = StateProps;

const mapStateToProps: MapStateToProps<
    StateProps,
    OwnProps,
    State
> = state => ({
    auth: state.user.displayName !== null,
});

export const View = withRouter(connect(mapStateToProps)(ViewComponent));
