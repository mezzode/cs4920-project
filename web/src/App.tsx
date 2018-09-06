import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import * as React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducers";
import View from "./views";

const store = createStore(
  reducer,
  composeWithDevTools(),
);

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#b71c1c"
    },
    type: "dark"
  }
});

const App: React.SFC<{}> = () => (
  <BrowserRouter>
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <View/>
      </Provider>
    </MuiThemeProvider>
  </BrowserRouter>
);

export default App;
