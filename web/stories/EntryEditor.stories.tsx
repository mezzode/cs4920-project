import { Button, Card, CardActions, CardContent, MuiThemeProvider, Typography } from "@material-ui/core";
import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { MemoryRouter } from "react-router";
import { theme } from "../src/App";
import { EntryEditor } from "../src/components/EntryEditor";
import { IEntry } from "../src/components/List";

storiesOf("EntryEditor", module)
    .addDecorator(story => (
        <MemoryRouter>
            <MuiThemeProvider theme={theme}>{story()}</MuiThemeProvider>
        </MemoryRouter>
    ))
    .add(
        "EntryEditor",
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
            `
        })(() => {
            interface IState {
                editingEntry: IEntry | null;
                savedEntry: IEntry;
            }
            class EntryEditorDemo extends React.Component<{}, IState> {
                public state: IState = {
                    editingEntry: null,
                    savedEntry: {
                        finished: "2018/01/13",
                        id: "c",
                        progress: "50 hrs",
                        rating: 10,
                        started: "2018/01/10",
                        title: "Danganronpa V3: Killing Harmony"
                    }
                };

                public render() {
                    const { handleCancel, handleInput, handleSave } = this;
                    const props = {
                        entry: this.state.editingEntry,
                        handleCancel,
                        handleInput,
                        handleSave
                    };
                    return (
                        <Card>
                            <CardContent>
                                <Typography>
                                    Saved:{" "}
                                    {JSON.stringify(this.state.savedEntry, null, 4)}
                                </Typography>
                                <Typography>
                                    State:{" "}
                                    {JSON.stringify(this.state.editingEntry, null, 4)}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button onClick={this.openDialog}>Edit</Button>
                                <EntryEditor {...props} />
                            </CardActions>
                        </Card>
                    );
                }

                private handleCancel = () => {
                    // cancelled
                    // TODO: show in logger
                    this.setState({ editingEntry: null });
                };

                private handleInput = (
                    field: keyof IEntry
                ): React.ChangeEventHandler<HTMLInputElement> => e => {
                    if (this.state.editingEntry === null) {
                        return;
                    }
                    this.setState({
                        editingEntry: {
                            ...this.state.editingEntry,
                            [field]: e.target.value
                        }
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
                        savedEntry: this.state.editingEntry
                    });
                };

                private openDialog = () => {
                    this.setState({ editingEntry: this.state.savedEntry });
                };
            }

            return <EntryEditorDemo />;
        })
    );
