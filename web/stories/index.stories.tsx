import { MuiThemeProvider } from "@material-ui/core";
import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { MemoryRouter } from "react-router";
import { theme } from "../src/App";
import { Nav, UnconnectedNav } from "../src/components/common/Nav";

storiesOf("Nav", module)
    .addDecorator(story => (
        <MemoryRouter>
            <MuiThemeProvider theme={theme}>
                {story()}
            </MuiThemeProvider>
        </MemoryRouter>
    ))
    .add(
        "Default",
        withInfo({
            header: false,
            inline: true,
            propTables: [Nav],
            propTablesExclude: [UnconnectedNav],
            source: false,
            text: `
                Styles are provided to this component by \`withStyles\` from \`@material-ui/core\`,
                which also adds the \`classes\` and \`innerRef\` props.
            `
        })(() => <UnconnectedNav user={{ displayName: null }} />)
    );
