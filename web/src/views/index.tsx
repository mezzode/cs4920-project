import * as React from "react";
import { Route, Switch } from "react-router";
import Nav from "../components/common/Nav";

const Home = () => (
    <h1>TODO</h1>
);

const View = () => (
    <div>
        <Nav />
        <main role="main">
            <Switch>
                <Route exact={true} path="/" component={Home} />
            </Switch>
        </main>
    </div>
)

export default View;
