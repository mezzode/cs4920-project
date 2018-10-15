import { CssBaseline } from '@material-ui/core';
import * as React from 'react';
import { connect, MapStateToProps } from 'react-redux';
import { Route, RouteComponentProps, Switch, withRouter } from 'react-router';
import { State } from '../reducers';
import { Landing } from './Landing';
import { ListPage } from './List';
import { Login } from './Login';
import { NotFound } from './NotFound';
import { PasswordReset } from './Passwordreset';
import { Profile } from './Profile';
import { SignUp } from './Signup';
import { UserLists } from './user/Lists';
import { UserPage } from './user/UserPage';

const ViewComponent: React.SFC<Props> = ({ auth }) => {
    // routes in the format "/list/:id" will ignore the trailing slug and redirect to the canonical one
    // e.g.
    // "/list/abc/thisIsIgnored" => "/list/abc/my-list"
    return (
        <>
            <CssBaseline />
            <Switch>
                <Route exact={true} path="/" component={Landing} />
                <Route path="/profile" component={Profile} />
                <Route
                    path="/user/:username/lists/:mediaType"
                    component={UserLists}
                />
                <Route path="/user/:username" component={UserPage} />
                <Route path="/list/:listId/:slug?" component={ListPage} />
                <Route path="/media/:mediaId" />
                <Route path="/login" component={Login} />
                <Route path="/sign-up" component={SignUp} />
                <Route path="/reset-password" component={PasswordReset} />
                {auth && <Route path="/profile" component={Profile} />}
                <Route component={NotFound} />
            </Switch>
        </>
    );
};

interface StateProps {
    auth: boolean;
}

interface OwnProps extends RouteComponentProps<{}> {}

type Props = StateProps;

const mapStateToProps: MapStateToProps<
    StateProps,
    OwnProps,
    State
> = state => ({
    auth: state.user.displayName !== null,
});

export const View = withRouter(connect(mapStateToProps)(ViewComponent));
