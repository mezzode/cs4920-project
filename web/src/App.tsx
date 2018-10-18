import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import * as localForage from 'localforage';
import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistReducer, persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers';
import { View } from './views';

export const store = createStore(
    persistReducer(
        {
            key: 'root',
            storage: localForage,
            whitelist: ['user'],
        },
        rootReducer,
    ),
    composeWithDevTools(applyMiddleware(thunk)),
);

const persistor = persistStore(store);

export const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#b71c1c',
        },
        type: 'dark',
    },
});

export const App: React.SFC<{}> = () => (
    <MuiThemeProvider theme={theme}>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    <View />
                </BrowserRouter>
            </PersistGate>
        </Provider>
    </MuiThemeProvider>
);
