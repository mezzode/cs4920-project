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
            `,
        })(() => {
            const lists: IList[] = [
                {
                    entries: [
                        {
                            entryId: "a",
                            finished: "2016/01/13",
                            lastUpdated: "2018/09/15 19:01",
                            media: {
                                mediaId: "a",
                                title: "Danganronpa",
                            },
                            progress: "50 hrs",
                            rating: 10,
                            started: "2016/01/10",
                        },
                        {
                            entryId: "b",
                            finished: "2017/01/13",
                            lastUpdated: "2018/09/15 19:01",
                            media: {
                                mediaId: "b",
                                title: "Danganronpa 2: Goodbye Despair",
                            },
                            progress: "50 hrs",
                            rating: 10,
                            started: "2017/01/10",
                        },
                        {
                            entryId: "c",
                            finished: "2018/01/13",
                            lastUpdated: "2018/09/15 19:01",
                            media: {
                                mediaId: "c",
                                title: "Danganronpa V3: Killing Harmony",
                            },
                            progress: "50 hrs",
                            rating: 10,
                            started: "2018/01/10",
                        },
                    ],
                    id: "a",
                    name: "Games",
                },
                {
                    entries: [
                        {
                            entryId: "d",
                            finished: "2018/01/13",
                            lastUpdated: "2018/09/15 19:01",
                            media: {
                                mediaId: "asdf",
                                title: "Rainbow 6: Siege",
                            },
                            progress: "50 hrs",
                            rating: 10,
                            started: "2018/01/10",
                        },
                    ],
                    id: "b",
                    name: "Multiplayer Games",
                },
            ];

            return <Lists lists={lists} />;
        }),
    );
