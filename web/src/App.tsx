import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import * as React from "react";
import "./App.css";
import Nav from './components/common/Nav';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#b71c1c"
    },
    type: "dark"
  }
});

const App: React.SFC<{}> = () => (
  <MuiThemeProvider theme={theme}>
    <Nav/>
    <p className="App-intro">
      To get started, edit <code>src/App.tsx</code> and save to reload.
    </p>
  </MuiThemeProvider>
);

export default App;
