import {
    Theme,
    Typography,
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
    username: 'abcdefg',
});

export const Profile = connect(
    mapStateToProps,
    null,
)(
    withStyles(styles)(
        class extends React.Component<any> {
            public render() {
                const { username } = this.props;
                let content = null;
                content = (
                    <Typography variant="display3">{username}</Typography>
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
