import { Button, Grid, Theme, Typography, withWidth } from '@material-ui/core';
import { createStyles, withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import * as React from 'react';
import { Nav } from '../../../components/common/Nav/index';
import { EntryEditor } from '../../../components/lists/EntryEditor/index';

import { isWidthDown } from '@material-ui/core/withWidth';
import { Lists } from '../../../components/lists/Lists';
import { Props } from './types';

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
        class extends React.Component<Props> {
            public componentDidMount() {
                this.props.loadLists();
            }

            public render() {
                const { lists, classes, editable, width } = this.props;

                const button = isWidthDown('sm', width) ? (
                    <Button
                        variant="fab"
                        className={classes.fab}
                        color="primary"
                    >
                        <AddIcon />
                    </Button>
                ) : (
                    <Button
                        variant="extendedFab"
                        className={classes.extendedFab}
                        color="primary"
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
                    content = (
                        <>
                            {editable && (
                                <>
                                    {button}
                                    <EntryEditor />
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
        },
    ),
);
