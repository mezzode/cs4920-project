import { MuiThemeProvider, Paper } from '@material-ui/core';
import { withInfo } from '@storybook/addon-info';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { MemoryRouter } from 'react-router';
import { theme } from '../../../App';
import { Entry } from '../../../types';
import { List } from './Component';

storiesOf('List', module)
    .addDecorator(story => (
        <MemoryRouter>
            <MuiThemeProvider theme={theme}>{story()}</MuiThemeProvider>
        </MemoryRouter>
    ))
    .add(
        'List',
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
            `,
        })(() => {
            const entries: Entry[] = [
                {
                    entryId: 'a',
                    finished: '2016/01/13',
                    lastUpdated: '2018/09/15 19:01',
                    media: {
                        mediaId: 'a',
                        title: 'Danganronpa',
                    },
                    progress: '50 hrs',
                    rating: 10,
                    started: '2016/01/10',
                },
                {
                    entryId: 'b',
                    finished: '2017/01/13',
                    lastUpdated: '2018/09/15 19:01',
                    media: {
                        mediaId: 'b',
                        title: 'Danganronpa 2: Goodbye Despair',
                    },
                    progress: '50 hrs',
                    rating: 10,
                    started: '2017/01/10',
                },
                {
                    entryId: 'c',
                    finished: '2018/01/13',
                    lastUpdated: '2018/09/15 19:01',
                    media: {
                        mediaId: 'c',
                        title: 'Danganronpa V3: Killing Harmony',
                    },
                    progress: '50 hrs',
                    rating: 10,
                    started: '2018/01/10',
                },
            ];
            return (
                <Paper>
                    <List entries={entries} />
                </Paper>
            );
        }),
    );
