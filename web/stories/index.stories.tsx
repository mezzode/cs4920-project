import { MuiThemeProvider, Paper } from "@material-ui/core";
import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { MemoryRouter } from "react-router";
import { theme } from "../src/App";
import { RawNav, UnconnectedNav } from "../src/components/common/Nav";
import { IEntry, List } from "../src/components/List";
import { IList, Lists } from "../src/components/Lists";

storiesOf("Nav", module)
    .addDecorator(story => (
        <MemoryRouter>
            <MuiThemeProvider theme={theme}>{story()}</MuiThemeProvider>
        </MemoryRouter>
    ))
    .add(
        "Logged Out",
        withInfo({
            header: false,
            inline: true,
            // show props of the actual component instead of the wrapper
            propTables: [RawNav],
            propTablesExclude: [UnconnectedNav],
            // hiding generated source since wrong name and would not use directly
            source: false,
            text: `
                Styles are provided to this component by \`withStyles\` from \`@material-ui/core\`,
                which also adds the \`classes\`, \`innerRef\`, and \`theme\` props.

                Technically this story uses \`RawNav\` but this component should never be used directly.
                Instead use \`Nav\` which connects it to the app's global redux state to inject \`user\`.
                
                ## Code

                ~~~tsx
                <Nav />
                ~~~
            `
        })(() => <UnconnectedNav user={{ displayName: null }} />)
    )
    .add(
        "Logged Out (transparent)",
        withInfo({
            header: false,
            inline: true,
            // show props of the actual component instead of the wrapper
            propTables: [RawNav],
            propTablesExclude: [UnconnectedNav],
            // hiding generated source since wrong name and would not use directly
            source: false,
            text: `
                Styles are provided to this component by \`withStyles\` from \`@material-ui/core\`,
                which also adds the \`classes\`, \`innerRef\`, and \`theme\` props.

                Technically this story uses \`RawNav\` but this component should never be used directly.
                Instead use \`Nav\` which connects it to the app's global redux state to inject \`user\`.
                
                ## Code

                ~~~tsx
                <div style={{backgroundColor: 'black'}}>
                    <Nav transparent={true} />
                </div>
                ~~~
            `
        })(() => (
            <div style={{ backgroundColor: "black" }}>
                <UnconnectedNav
                    user={{ displayName: null }}
                    transparent={true}
                />
            </div>
        ))
    );

storiesOf("List", module)
    .addDecorator(story => (
        <MemoryRouter>
            <MuiThemeProvider theme={theme}>{story()}</MuiThemeProvider>
        </MemoryRouter>
    ))
    .add(
        "List",
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
            const entries: IEntry[] = [
                {
                    finished: "2016/01/13",
                    id: "a",
                    progress: "50 hrs",
                    rating: 8,
                    started: "2016/01/10",
                    title: "Danganronpa"
                },
                {
                    finished: "2016/02/13",
                    id: "b",
                    progress: "50 hrs",
                    rating: 9,
                    started: "2016/02/10",
                    title: "Danganronpa 2: Goodbye Despair"
                },
                {
                    finished: "2018/01/13",
                    id: "c",
                    progress: "50 hrs",
                    rating: 10,
                    started: "2018/01/10",
                    title: "Danganronpa V3: Killing Harmony"
                }
            ];
            return (
                <Paper>
                    <List entries={entries} />
                </Paper>
            );
        })
    );

storiesOf("Lists", module)
    .addDecorator(story => (
        <MemoryRouter>
            <MuiThemeProvider theme={theme}>{story()}</MuiThemeProvider>
        </MemoryRouter>
    ))
    .add(
        "Lists",
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
            const lists: IList[] = [
                {
                    entries: [
                        {
                            finished: "2016/01/13",
                            id: "a",
                            progress: "50 hrs",
                            rating: 8,
                            started: "2016/01/10",
                            title: "Danganronpa"
                        },
                        {
                            finished: "2016/02/13",
                            id: "b",
                            progress: "50 hrs",
                            rating: 9,
                            started: "2016/02/10",
                            title: "Danganronpa 2: Goodbye Despair"
                        },
                        {
                            finished: "2018/01/13",
                            id: "c",
                            progress: "50 hrs",
                            rating: 10,
                            started: "2018/01/10",
                            title: "Danganronpa V3: Killing Harmony"
                        }
                    ],
                    id: "a",
                    name: "Games"
                },
                {
                    entries: [
                        {
                            finished: "2018/02/13",
                            id: "b",
                            progress: "50 hrs",
                            rating: 8,
                            started: "2018/08/10",
                            title: "Rainbow 6: Siege"
                        }
                    ],
                    id: "b",
                    name: "Multiplayer Games"
                }
            ];

            return (
                <Lists lists={lists} />
            );
        })
    );
