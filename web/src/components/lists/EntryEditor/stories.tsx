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
import { theme } from '../../../App';
import { Entry } from '../../../types';
import { EntryEditorComponent } from './Component';

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
            interface State {
                editingEntry: Entry | null;
                savedEntry: Entry;
            }
            class EntryEditorDemo extends React.Component<{}, State> {
                public state: State = {
                    editingEntry: null,
                    savedEntry: {
                        entryCode: 'c',
                        finished: '2018/01/13',
                        lastUpdated: '2018/09/15 19:01',
                        listCode: 'a',
                        media: {
                            artUrl:
                                'https://78.media.tumblr.com/4f30940e947b58fb57e2b8499f460acb/tumblr_okccrbpkDY1rb48exo1_1280.jpg',
                            mediaCode: 'asdf',
                            title: 'Danganronpa V3: Killing Harmony',
                        },
                        progress: '50 hrs',
                        rating: 10,
                        started: '2018/01/10',
                    },
                };

                public render() {
                    const {
                        handleCancel,
                        handleInput,
                        handleSave,
                        close,
                    } = this;
                    const props = {
                        close,
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

                private close = () => {
                    this.setState({ editingEntry: null });
                };

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

                private handleSave = () => () => {
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
