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
import { connect, MapStateToProps } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router';
import slugify from 'slugify';
import { Nav } from '../components/common/Nav';
import { EntryEditor } from '../components/lists/EntryEditor';
import { List } from '../components/lists/List';
import { State as ReduxState } from '../reducers';
import { EntryList } from '../types';

const styles = (theme: Theme) =>
    createStyles({
        layout: {
            marginLeft: theme.spacing.unit * 3,
            marginRight: theme.spacing.unit * 3,
            marginTop: theme.spacing.unit * 3,
            width: 'auto',
        },
    });

interface Params {
    listCode: string;
    slug?: string;
}

interface OwnProps extends RouteComponentProps<Params> {}

interface StateProps {
    username: string | null;
}

interface Props extends WithStyles<typeof styles>, OwnProps, StateProps {}

interface State {
    editOpen: boolean;
    list: EntryList | null;
}

const mapStateToProps: MapStateToProps<StateProps, OwnProps, ReduxState> = ({
    user: { displayName },
}) => ({
    username: displayName,
    // editable: !!(lists && displayName === lists[match.params.listCode].username),
    // list: lists && lists[match.params.listCode],
});

export const ListPage = connect(mapStateToProps)(
    withStyles(styles)(
        class extends React.Component<Props, State> {
            public state: State = {
                editOpen: false,
                list: null,
            };

            public async componentDidMount() {
                // only load on mount so redirecting to correct slug doesnt load again
                const { listCode } = this.props.match.params;
                const list = await this.loadList(listCode);
                this.setState({ list });
            }

            public async componentDidUpdate(prevProps: Props) {
                const { listCode } = this.props.match.params;
                if (prevProps.match.params.listCode !== listCode) {
                    this.setState({ list: null });
                    const list = await this.loadList(listCode);
                    this.setState({ list });
                }
            }

            public render() {
                const { classes, match, username } = this.props;
                const { list } = this.state;
                let content = null;

                if (list === null) {
                    content = (
                        <Typography variant="display3">Loading</Typography>
                    );
                } else {
                    const { name, listCode } = list;
                    const canonSlug = slugify(name, { lower: true });
                    if (match.params.slug === canonSlug) {
                        const editable = username === list.username;
                        content = (
                            <Card>
                                <CardHeader title={name}>
                                    <Typography variant="display3">
                                        {name}
                                    </Typography>
                                </CardHeader>
                                <List list={list} editable={editable} />
                                {editable && <EntryEditor />}
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

            // private editSubmit = (
            //     entryCode: string,
            //     entryEdit: Partial<UserEntry>,
            // ): React.MouseEventHandler => async () => {
            //     const { list } = this.state;
            //     if (list === null) {
            //         // should not be able to trigger edit if not loaded
            //         throw new Error('List not loaded');
            //     }

            //     const editedEntry = await saveEdit(entryCode, entryEdit);

            //     this.setState({
            //         editOpen: false,
            //         list: {
            //             ...list,
            //             entries: list.entries.map(
            //                 entry =>
            //                     entry.entryCode === editedEntry.entryCode
            //                         ? editedEntry
            //                         : entry,
            //             ),
            //         },
            //     });
            // };

            private loadList = async (listCode: string) => {
                const res = await fetch(
                    `${process.env.REACT_APP_API_BASE}/list/${listCode}`,
                    { mode: 'cors' },
                );
                if (res.status > 400) {
                    throw new Error(
                        `Server error: ${res.status} ${res.statusText}`,
                    );
                }
                const list = (await res.json()) as EntryList;
                return list;
            };
        },
    ),
);
