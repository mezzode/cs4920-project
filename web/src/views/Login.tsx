import {
    Theme,
} from '@material-ui/core';
import { createStyles, withStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { connect } from 'react-redux';
// import { RouteComponentProps } from 'react-router';
import { Nav } from '../components/common/Nav';
// import { State } from '../reducers';

// TODO: fiddle with styling
const styles = (theme: Theme) =>
    createStyles({
        layout: {
            marginLeft: theme.spacing.unit * 3,
            marginRight: theme.spacing.unit * 3,
            marginTop: theme.spacing.unit * 3,
            width: 'auto',
        },
        paper: {
        },
    });

// interface Params {
//     // listId: string;
//     // slug?: string;
// }

// interface OwnProps extends RouteComponentProps<Params> { }

// interface StateProps {
//     username?: string;
// }

// interface DispatchProps {
//     loadList: () => void;
// }

// interface Props
//     extends WithStyles<typeof styles>,
//     OwnProps,
//     StateProps,
//     DispatchProps { }

// const mapStateToProps: MapStateToProps<StateProps, OwnProps, State> = (
const mapStateToProps: any = (
    state: any,
) => ({
});

export const Login = connect(
    mapStateToProps,
    null,
)(
    withStyles(styles)(
        class extends React.Component<any> {
            public render() {
                let content = null;
                content = (
                    <form action="/login" method="post">
                        <div>
                            <label>Username:</label>
                            <input type="text" name="username" />
                        </div>
                        <div>
                            <label>Password:</label>
                            <input type="password" name="password" />
                        </div>
                        <div>
                            <input type="submit" value="Log In" />
                        </div>
                    </form>
                );
                return (
                    <>
                        <Nav />
                        {/* <main className={classes.layout}> */}
                        {content}
                        {/* </main> */}
                    </>
                );
            }
        },
    ),
);
