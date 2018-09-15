import {
    Button,
    Card,
    CardActions,
    CardContent,
    MuiThemeProvider,
    Typography,
} from '@material-ui/core';
import { withInfo } from '@storybook/addon-info';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { MemoryRouter } from 'react-router';
import { theme } from '../src/App';
import { EntryEditorComponent } from '../src/components/lists/EntryEditor/Component';
import { Entry } from '../src/types';

storiesOf('EntryEditor', module)
    .addDecorator(story => (
        <MemoryRouter>
            <MuiThemeProvider theme={theme}>{story()}</MuiThemeProvider>
        </MemoryRouter>
    ))
    .add(
        'EntryEditor',
        withInfo({
            header: false,
            inline: true,
            // show props of the actual component instead of the wrapper
            // propTables: [RawNav],
            // propTablesExclude: [UnconnectedNav],
            // hiding generated source since wrong name and would not use directly
            source: false,
            text: `
                TODO
            `,
        })(() => {
            interface IState {
                editingEntry: Entry | null;
                savedEntry: Entry;
            }
            class EntryEditorDemo extends React.Component<{}, IState> {
                public state: IState = {
                    editingEntry: null,
                    savedEntry: {
                        entryId: 'c',
                        finished: '2018/01/13',
                        lastUpdated: '2018/09/15 19:01',
                        media: {
                            mediaId: 'asdf',
                            title: 'Danganronpa V3: Killing Harmony',
                        },
                        progress: '50 hrs',
                        rating: 10,
                        started: '2018/01/10',
                    },
                };

                public render() {
                    const { handleCancel, handleInput, handleSave } = this;
                    const props = {
                        entry: this.state.editingEntry,
                        handleCancel,
                        handleInput,
                        handleSave,
                    };
                    return (
                        <Card>
                            <CardContent>
                                <Typography>
                                    Saved:{' '}
                                    {JSON.stringify(
                                        this.state.savedEntry,
                                        null,
                                        4,
                                    )}
                                </Typography>
                                <Typography>
                                    State:{' '}
                                    {JSON.stringify(
                                        this.state.editingEntry,
                                        null,
                                        4,
                                    )}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button onClick={this.openDialog}>Edit</Button>
                                <EntryEditorComponent {...props} />
                            </CardActions>
                        </Card>
                    );
                }

                private handleCancel = () => {
                    // cancelled
                    // TODO: show in logger
                    this.setState({ editingEntry: null });
                };

                private handleInput: React.ChangeEventHandler<
                    HTMLInputElement
                > = e => {
                    if (this.state.editingEntry === null) {
                        return;
                    }
                    this.setState({
                        editingEntry: {
                            ...this.state.editingEntry,
                            [e.target.id]: e.target.value,
                        },
                    });
                };

                private handleSave = () => {
                    // save
                    // TODO: show in logger
                    if (this.state.editingEntry === null) {
                        return;
                    }
                    this.setState({
                        editingEntry: null,
                        savedEntry: this.state.editingEntry,
                    });
                };

                private openDialog = () => {
                    this.setState({ editingEntry: this.state.savedEntry });
                };
            }

            return <EntryEditorDemo />;
        }),
    );
