import {
    Button,
    Grid,
    LinearProgress,
    Theme,
    Typography,
    withWidth,
} from '@material-ui/core';
import { createStyles, withStyles } from '@material-ui/core/styles';
import { isWidthDown } from '@material-ui/core/withWidth';
import AddIcon from '@material-ui/icons/Add';
import * as React from 'react';
import { Redirect } from 'react-router';
import { Nav } from 'src/components/common/Nav/index';
import { Lists } from 'src/components/lists/Lists';
import { EntryEditor } from 'src/components/modals/entries/EntryEditor';
import { ListCreator } from 'src/components/modals/lists/ListCreator';
import { ListDeleter } from 'src/components/modals/lists/ListDeleter';
import { ListEditor } from 'src/components/modals/lists/ListEditor';
import { AfterEditCallback } from 'src/components/modals/lists/ListEditor/types';
import { UserMenu } from 'src/components/user/UserMenu';
import {
    Entry,
    EntryList,
    isMediaType,
    ListsMap,
    MediaType,
} from '../../../types';
import { Props, State } from './types';

// TODO: fiddle with styling
export const styles = (theme: Theme) =>
    createStyles({
        extendedFab: {
            // TODO: fix spacing
        },
        fab: {
            bottom: theme.spacing.unit * 2,
            position: 'absolute',
            right: theme.spacing.unit * 2,
        },
        layout: {
            marginLeft: theme.spacing.unit * 3,
            marginRight: theme.spacing.unit * 3,
            marginTop: theme.spacing.unit * 3,
            width: 'auto',
        },
    });

export const UserListsComponent = withWidth()(
    withStyles(styles)(
        class extends React.Component<Props, State> {
            public state: State = {
                createOpen: false,
                editOpen: false,
                lists: null,
            };

            public async componentDidUpdate(prevProps: Props) {
                const { mediaType, username } = this.props.match.params;
                if (prevProps.match.params.mediaType !== mediaType) {
                    this.setState({ lists: null });
                    const lists = await this.loadUserLists(username, mediaType);
                    this.setState({ lists });
                }
            }

            public async componentDidMount() {
                const { mediaType, username } = this.props.match.params;
                const lists = await this.loadUserLists(username, mediaType);
                this.setState({ lists });
            }

            public render() {
                const { classes, editable, width, match } = this.props;
                const { lists } = this.state;
                const mediaType = {
                    anime: MediaType.Anime,
                    games: MediaType.Game,
                    movies: MediaType.Movie,
                    shows: MediaType.Show,
                }[match.params.mediaType];
                const username = match.params.username;

                if (!isMediaType(mediaType)) {
                    return <Redirect to={`/user/${username}`} />;
                }

                const button = isWidthDown('sm', width) ? (
                    <Button
                        variant="fab"
                        className={classes.fab}
                        color="primary"
                        onClick={this.createOpen}
                    >
                        <AddIcon />
                    </Button>
                ) : (
                    <Button
                        variant="extendedFab"
                        className={classes.extendedFab}
                        color="primary"
                        onClick={this.createOpen}
                    >
                        <AddIcon />
                        New List
                    </Button>
                );

                let content: JSX.Element;
                if (lists === null) {
                    content = <LinearProgress variant="query" />;
                } else if (Object.keys(lists).length === 0) {
                    // TODO: make nice
                    const { createOpen } = this.state;
                    content = (
                        <>
                            <Typography variant="h2">No lists</Typography>
                            {editable && (
                                <ListCreator
                                    open={createOpen}
                                    afterCreate={this.afterCreate}
                                    handleCancel={this.createClose}
                                />
                            )}
                        </>
                    );
                } else {
                    const { createOpen } = this.state;
                    content = (
                        <>
                            {editable && (
                                <>
                                    <EntryEditor afterSave={this.afterSave} />
                                    <ListCreator
                                        open={createOpen}
                                        afterCreate={this.afterCreate}
                                        handleCancel={this.createClose}
                                    />
                                    <ListDeleter
                                        afterDelete={this.afterDelete}
                                    />
                                    <ListEditor afterEdit={this.afterEdit} />
                                </>
                            )}
                            <Lists
                                lists={Object.keys(lists).map(k => lists[k])}
                                editable={editable}
                            />
                        </>
                    );
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
                                <Grid item={true} xs={12} md={2} xl={1}>
                                    {editable && button}
                                    <UserMenu
                                        username={username}
                                        mediaType={mediaType}
                                    />
                                </Grid>
                                <Grid item={true} xs={12} md={10} xl={11}>
                                    {content}
                                </Grid>
                            </Grid>
                        </main>
                    </>
                );
            }

            private loadUserLists = async (
                username: string,
                mediaType: string,
            ) => {
                const res = await fetch(
                    `${
                        process.env.REACT_APP_API_BASE
                    }/user/${username}/lists/${mediaType}`,
                );
                if (res.status > 400) {
                    throw new Error(
                        `Server error: ${res.status} ${res.statusText}`,
                    );
                }
                const { lists } = (await res.json()) as { lists: EntryList[] };
                const listsMap = lists.reduce<ListsMap>(
                    (map, list) => ({
                        ...map,
                        [list.listCode]: list,
                    }),
                    {},
                );
                return listsMap;
            };

            private createOpen = () => {
                this.setState({ createOpen: true });
            };

            private afterCreate = async (newList: EntryList) => {
                const { username } = this.props.match.params;
                const mediaType = {
                    anime: MediaType.Anime,
                    games: MediaType.Game,
                    movies: MediaType.Movie,
                    shows: MediaType.Show,
                }[this.props.match.params.mediaType];
                if (newList.mediaType !== mediaType) {
                    // list shouldnt be added to current view
                    this.setState({
                        createOpen: false,
                    });
                    return;
                }
                if (newList.username !== username) {
                    throw new Error('Cannot create list for different user');
                }

                const { lists } = this.state;
                if (lists === null) {
                    // should not be able to trigger create if not loaded
                    throw new Error('Lists not loaded');
                }

                this.setState({
                    createOpen: false,
                    lists: {
                        ...lists,
                        [newList.listCode]: newList,
                    },
                });
            };

            private createClose = () => {
                this.setState({ createOpen: false });
            };

            private afterSave = (editedEntry: Entry) => {
                const { lists } = this.state;
                if (lists === null) {
                    // should not be able to trigger edit if not loaded
                    throw new Error('Lists not loaded');
                }

                const updateListEntry = (list: EntryList, result: Entry) => ({
                    ...list,
                    entries: list.entries.map(
                        entry =>
                            entry.entryCode === result.entryCode
                                ? result
                                : entry,
                    ),
                });

                this.setState({
                    lists: {
                        ...lists,
                        [editedEntry.listCode]: updateListEntry(
                            lists[editedEntry.listCode],
                            editedEntry,
                        ),
                    },
                });
            };

            private afterDelete = (deletedList: EntryList) => {
                const { lists } = this.state;
                if (lists === null) {
                    throw new Error('Lists not loaded');
                }

                const { [deletedList.listCode]: _, ...otherLists } = lists;

                this.setState({
                    lists: {
                        ...otherLists,
                    },
                });
            };

            private afterEdit: AfterEditCallback = (listCode, listEdit) => {
                const { lists } = this.state;
                if (lists === null) {
                    throw new Error('Lists not loaded');
                }

                this.setState({
                    lists: {
                        ...lists,
                        [listCode]: {
                            ...lists[listCode],
                            ...listEdit,
                        },
                    },
                });
            };
        },
    ),
);
