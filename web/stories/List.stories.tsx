import { MuiThemeProvider, Paper } from "@material-ui/core";
import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { MemoryRouter } from "react-router";
import { theme } from "../src/App";
import { List } from "../src/components/lists/List";
import { IEntry } from "./types";

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
