import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { View } from './views';

export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk)),
);

export const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#b71c1c',
        },
        type: 'dark',
    },
});

const App: React.SFC<{}> = () => (
    <BrowserRouter>
        <MuiThemeProvider theme={theme}>
            <Provider store={store}>
                <View />
            </Provider>
        </MuiThemeProvider>
    </BrowserRouter>
);

export default App;
