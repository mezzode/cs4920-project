import { MuiThemeProvider } from "@material-ui/core";
import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { MemoryRouter } from "react-router";
import { theme } from "../src/App";
import { UnconnectedNav } from "../src/components/common/Nav";

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
            // propTables: [RawNav],
            // propTablesExclude: [UnconnectedNav],
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
            // propTables: [RawNav],
            // propTablesExclude: [UnconnectedNav],
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
