import { CssBaseline } from "@material-ui/core";
import * as React from "react";
import { Route, Switch } from "react-router";
import Landing from "./Landing";

const View = () => (
    <React.Fragment>
        <CssBaseline />
        <Switch>
            <Route exact={true} path="/" component={Landing} />
        </Switch>
    </React.Fragment>
)

export default View;
