import {
    Card,
    CardHeader,
    Grid,
    Theme,
    Typography,
    WithStyles,
} from '@material-ui/core';
import { createStyles, withStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import slugify from 'slugify';
import { loadList } from '../actions/list';
import { Nav } from '../components/common/Nav';
import { EntryEditor } from '../components/lists/EntryEditor';
import { List } from '../components/lists/List';
import { State } from '../reducers';
import { EntryList } from '../types';

// TODO: fiddle with styling
const styles = (theme: Theme) =>
    createStyles({
        layout: {
            marginLeft: theme.spacing.unit * 3,
            marginRight: theme.spacing.unit * 3,
            marginTop: theme.spacing.unit * 3,
            width: 'auto',
            // [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            //     // tweak this?
            //     marginLeft: 'auto',
            //     marginRight: 'auto',
            //     width: 400,
            // },
        },
        // layout: {
        //     marginLeft: theme.spacing.unit * 2,
        //     marginRight: theme.spacing.unit * 2,
        //     width: 'auto',
        //     [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
        //         marginLeft: 'auto',
        //         marginRight: 'auto',
        //         width: 600,
        //     },
        // },
        paper: {
            // marginBottom: theme.spacing.unit * 3,
            // marginTop: theme.spacing.unit * 3,
            // // padding: theme.spacing.unit * 2,
            // [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
            //     marginBottom: theme.spacing.unit * 6,
            //     marginTop: theme.spacing.unit * 6,
            //     // padding: theme.spacing.unit * 3,
            // },
        },
    });

interface Params {
    listId: string;
    slug?: string;
}

interface OwnProps extends RouteComponentProps<Params> {}

interface StateProps {
    list?: EntryList;
}

interface DispatchProps {
    loadList: () => void;
}

interface Props
    extends WithStyles<typeof styles>,
        OwnProps,
        StateProps,
        DispatchProps {}

const mapStateToProps: MapStateToProps<StateProps, OwnProps, State> = (
    state,
    { match },
) => ({
    list: state.displayedLists[match.params.listId],
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = (
    dispatch: ThunkDispatch<State, void, Action>,
    { match },
) => ({
    loadList: async () => {
        dispatch(loadList(match.params.listId));
    },
});

export const ListPage = connect(
    mapStateToProps,
    mapDispatchToProps,
)(
    withStyles(styles)(
        class extends React.Component<Props> {
            public componentDidMount() {
                // only load on mount so redirecting to correct slug doesnt load again
                this.props.loadList();
            }

            public render() {
                const { list, classes, match } = this.props;
                let content = null;
                if (list === undefined) {
                    content = (
                        <Typography variant="display3">Loading</Typography>
                    );
                } else {
                    const { name, entries, listCode } = list;
                    const canonSlug = slugify(name, { lower: true });
                    if (match.params.slug === canonSlug) {
                        content = (
                            <Card className={classes.paper}>
                                <CardHeader title={name}>
                                    <Typography variant="display3">
                                        {name}
                                    </Typography>
                                </CardHeader>
                                <List entries={entries} />
                                <EntryEditor />
                            </Card>
                        );
                    } else {
                        content = (
                            <Redirect to={`/list/${listCode}/${canonSlug}`} />
                        );
                    }
                }
                return (
                    <>
                        <Nav />
                        <main className={classes.layout}>
                            <Grid
                                container={true}
                                spacing={16}
                                justify="space-around"
                            >
                                <Grid item={true} xs={12}>
                                    {content}
                                </Grid>
                            </Grid>
                        </main>
                    </>
                );
            }
        },
    ),
);
