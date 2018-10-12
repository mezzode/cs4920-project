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
import { isMediaType, MediaType, NewEntryList } from '../../../types';
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
            };

            public componentDidMount() {
                this.props.loadLists();
            }

            public render() {
                const { lists, classes, editable, width, match } = this.props;
                const mediaType = {
                    anime: MediaType.Anime,
                    games: MediaType.Game,
                    movies: MediaType.Movie,
                    shows: MediaType.Show,
                }[match.params.mediaType];

                if (!isMediaType(mediaType)) {
                    return <Redirect to={`/user/${match.params.username}`} />;
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
                } else if (lists.length === 0) {
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
                                    {button}
                                    <EntryEditor />
                                    <ListCreator
                                        open={createOpen}
                                        submit={this.createSubmit}
                                        handleCancel={this.createClose}
                                        mediaType={mediaType}
                                    />
                                </>
                            )}
                            <Lists lists={lists} editable={editable} />
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
                                <Grid item={true} xs={12}>
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
        },
    ),
);
