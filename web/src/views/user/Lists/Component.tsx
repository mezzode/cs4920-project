import { Grid, Theme, Typography } from '@material-ui/core';
import { createStyles, withStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { Nav } from '../../../components/common/Nav/index';
import { EntryEditor } from '../../../components/lists/EntryEditor/index';

import { Lists } from '../../../components/lists/Lists';
import { Props } from './types';

// TODO: fiddle with styling
export const styles = (theme: Theme) =>
    createStyles({
        layout: {
            marginLeft: theme.spacing.unit * 3,
            marginRight: theme.spacing.unit * 3,
            marginTop: theme.spacing.unit * 3,
            width: 'auto',
        },
    });

export const UserListsComponent = withStyles(styles)(
    class extends React.Component<Props> {
        public componentDidMount() {
            this.props.loadLists();
        }

        public render() {
            const { lists, classes, editable } = this.props;

            let content: JSX.Element;
            if (lists === null) {
                content = <Typography variant="display3">Loading</Typography>;
            } else if (lists.length === 0) {
                // TODO: make nice
                content = <Typography variant="display3">No lists</Typography>;
            } else {
                content = (
                    <>
                        <Lists lists={lists} editable={editable} />
                        {editable && <EntryEditor />}
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
);
