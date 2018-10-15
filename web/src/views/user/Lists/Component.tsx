import { Button, Grid, Theme, Typography, withWidth } from '@material-ui/core';
import { createStyles, withStyles } from '@material-ui/core/styles';
import { isWidthDown } from '@material-ui/core/withWidth';
import AddIcon from '@material-ui/icons/Add';
import * as React from 'react';
import { Redirect } from 'react-router';
import { Nav } from '../../../components/common/Nav/index';
import { EntryEditor } from '../../../components/lists/EntryEditor/index';
import { ListCreator } from '../../../components/lists/ListCreator';
import { Lists } from '../../../components/lists/Lists';
import { UserMenu } from '../../../components/user/UserMenu';
import {
    Entry,
    EntryList,
    isMediaType,
    MediaType,
    NewEntryList,
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
                if (
                    prevProps.match.params.mediaType !==
                    this.props.match.params.mediaType
                ) {
                    const lists = await this.props.loadLists();
                    this.setState({ lists });
                }
            }

            public async componentDidMount() {
                const lists = await this.props.loadLists();
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
                    content = (
                        <Typography variant="display3">Loading</Typography>
                    );
                } else if (Object.keys(lists).length === 0) {
                    // TODO: make nice
                    content = (
                        <Typography variant="display3">No lists</Typography>
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
                                        submit={this.createSubmit}
                                        handleCancel={this.createClose}
                                        mediaType={mediaType}
                                    />
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

            private createOpen = () => {
                this.setState({ createOpen: true });
            };

            private createSubmit = async (newList: NewEntryList) => {
                const result = await this.props.createList(newList);
                if (result !== null) {
                    this.setState({ createOpen: false });
                } else {
                    // TODO: add error message
                }
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
        },
    ),
);
