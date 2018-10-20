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
import { theme } from 'src/App';
import { Entry } from 'src/types';
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
                        category: 'Completed',
                        entryCode: 'c',
                        finished: '2018/01/13',
                        lastUpdated: '2018/09/15 19:01',
                        listCode: 'a',
                        media: {
                            category: 'Main Game',
                            cover:
                                '//images.igdb.com/igdb/image/upload/t_thumb/dckh8rr0f4lo4hbw1uty.jpg',
                            description:
                                "The follow up to Danganronpa: Trigger Happy Havoc. Danganronpa 2: Goodbye Despair introduces a new cast of characters. The main character, Hajime Hinata a new 'Ultimate' student at Hope's Peak Academy. On their first day, Hajime and all of his classmates are taken on a field trip to the mysterious Jabberwock island by their anthropomorphic rabbit teacher, Usami. Usami explains that on this island the students are to have fun together and become friends to gather Hope Fragments. Usami's field trip does not go as planned when Monokuma appears and begins a new Killing Game. Anyone that wants to leave the island must commit a murder and get away with it. If the murderer is successful, he/she is allowed to leave the island, while everyone else is killed. When a murder occurs, the player investigates. After the investigations, a trial commences to determine who the culprit is.",
                            developers: ['Spike ChunSoft'],
                            first_release_date: '2012-07-26T00:00:00.000+00:00',
                            genres: ['Shooter', 'Music', 'Adventure'],
                            id: 9694,
                            publishers: ['NIS America', 'Spike ChunSoft'],
                            status: 'Released',
                            themes: ['Action', 'Horror'],
                            title: 'Danganronpa 2: Goodbye Despair',
                        },
                        progress: '50 hrs',
                        rating: 10,
                        started: '2018/01/10',
                        tags: [],
                    },
                };

                public render() {
                    const { input, close, addTag, removeTag } = this;
                    const props = {
                        addTag,
                        close,
                        entry: this.state.editingEntry,
                        input,
                        removeTag,
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

                private input: React.ChangeEventHandler<
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

                private addTag = (tag: string) => {
                    if (this.state.editingEntry === null) {
                        return;
                    }
                    this.setState({
                        editingEntry: {
                            ...this.state.editingEntry,
                            tags: [...this.state.editingEntry.tags, tag],
                        },
                    });
                };

                private removeTag = (tag: string) => {
                    if (this.state.editingEntry === null) {
                        return;
                    }
                    this.setState({
                        editingEntry: {
                            ...this.state.editingEntry,
                            tags: this.state.editingEntry.tags.filter(
                                t => t !== tag,
                            ),
                        },
                    });
                };

                private openDialog = () => {
                    this.setState({ editingEntry: this.state.savedEntry });
                };
            }

            return <EntryEditorDemo />;
        }),
    );
