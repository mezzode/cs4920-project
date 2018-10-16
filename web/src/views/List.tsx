import {
    Card,
    CardHeader,
    Grid,
    LinearProgress,
    Snackbar,
    Theme,
    Typography,
    WithStyles,
} from '@material-ui/core';
import { createStyles, withStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { connect, MapStateToProps } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router';
import slugify from 'slugify';
import { Nav } from 'src/components/common/Nav';
import { List } from 'src/components/lists/List';
import {
    AfterEntryEditCallBack,
    AfterListEditCallback,
    EntryEditor,
    ListDeleter,
    ListEditor,
} from 'src/components/modals';
import { State as ReduxState } from 'src/reducers';
import { EntryList, mediaDisplay } from 'src/types';

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
    deleted: boolean;
    notFound: boolean;
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
                deleted: false,
                list: null,
                notFound: false,
            };

            public async componentDidMount() {
                // only load on mount so redirecting to correct slug doesnt load again
                const { listCode } = this.props.match.params;
                const list = await this.loadList(listCode);
                if (list == null) {
                    this.setState({
                        notFound: true,
                    });
                } else {
                    this.setState({
                        list,
                    });
                }
            }

            public async componentDidUpdate(prevProps: Props) {
                const { listCode } = this.props.match.params;
                if (prevProps.match.params.listCode !== listCode) {
                    this.setState({ list: null });
                    const list = await this.loadList(listCode);
                    if (list == null) {
                        this.setState({
                            notFound: true,
                        });
                    } else {
                        this.setState({
                            list,
                        });
                    }
                }
            }

            public render() {
                const { classes, match, username } = this.props;
                const { list, deleted, notFound } = this.state;
                let content = null;

                if (notFound) {
                    // TODO: make a <NotFound> component
                    content = <Typography variant="h1">Not Found</Typography>;
                } else if (list === null) {
                    content = <LinearProgress variant="query" />;
                } else {
                    const { name, listCode, mediaType } = list;
                    const canonSlug = slugify(name, { lower: true });
                    if (match.params.slug === canonSlug) {
                        const editable = username === list.username && !deleted;
                        content = (
                            <Card>
                                <CardHeader
                                    title={name}
                                    subheader={mediaDisplay[mediaType]}
                                />
                                <List list={list} editable={editable} />
                                {editable && (
                                    <>
                                        <EntryEditor
                                            afterEdit={this.afterEntryEdit}
                                        />
                                        <ListDeleter
                                            afterDelete={this.afterDelete}
                                        />
                                        <ListEditor
                                            afterEdit={this.afterEdit}
                                        />
                                    </>
                                )}
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
                            <Snackbar
                                anchorOrigin={{
                                    horizontal: 'left',
                                    vertical: 'bottom',
                                }}
                                open={deleted}
                                message={'List deleted'}
                            />
                        </main>
                    </>
                );
            }

            private afterEntryEdit: AfterEntryEditCallBack = editedEntry => {
                const { list } = this.state;
                if (list === null) {
                    // should not be able to trigger edit if not loaded
                    throw new Error('List not loaded');
                }
                this.setState({
                    list: {
                        ...list,
                        entries: list.entries.map(
                            entry =>
                                entry.entryCode === editedEntry.entryCode
                                    ? editedEntry
                                    : entry,
                        ),
                    },
                });
            };

            private loadList = async (
                listCode: string,
            ): Promise<EntryList | null> => {
                const res = await fetch(
                    `${process.env.REACT_APP_API_BASE}/list/${listCode}`,
                    { mode: 'cors' },
                );
                if (res.status === 404) {
                    return null;
                }
                if (res.status > 400) {
                    throw new Error(
                        `Server error: ${res.status} ${res.statusText}`,
                    );
                }
                const list = (await res.json()) as EntryList;
                return list;
            };

            private afterDelete = () => {
                this.setState({
                    deleted: true,
                });
            };

            private afterEdit: AfterListEditCallback = (listCode, listEdit) => {
                const { list } = this.state;
                if (list === null) {
                    throw new Error('List not loaded');
                }
                this.setState({
                    list: {
                        ...list,
                        ...listEdit,
                    },
                });
            };
        },
    ),
);
