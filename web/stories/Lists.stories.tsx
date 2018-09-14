import { MuiThemeProvider } from "@material-ui/core";
import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { MemoryRouter } from "react-router";
import { theme } from "../src/App";
import { IList, Lists } from "../src/components/lists/Lists";

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
            // source: false,
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

            return <Lists lists={lists} />;
        })
    );
