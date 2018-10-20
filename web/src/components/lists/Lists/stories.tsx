import { MuiThemeProvider } from '@material-ui/core';
import { withInfo } from '@storybook/addon-info';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { MemoryRouter } from 'react-router';
import { theme } from '../../../App';
import { EntryList, MediaType } from '../../../types';
import { Lists } from './Component';

const lists: EntryList[] = [
    {
        entries: [
            {
                entryCode: 'a',
                finished: '2016/01/13',
                lastUpdated: '2018/09/15 19:01',
                listCode: 'a',
                media: {
                    artUrl:
                        'https://78.media.tumblr.com/4f30940e947b58fb57e2b8499f460acb/tumblr_okccrbpkDY1rb48exo1_1280.jpg',
                    mediaCode: 'a',
                    title: 'Danganronpa',
                },
                progress: '50 hrs',
                rating: 10,
                started: '2016/01/10',
                tags: [],
            },
            {
                entryCode: 'b',
                finished: '2017/01/13',
                lastUpdated: '2018/09/15 19:01',
                listCode: 'a',
                media: {
                    artUrl:
                        'https://78.media.tumblr.com/4f30940e947b58fb57e2b8499f460acb/tumblr_okccrbpkDY1rb48exo1_1280.jpg',
                    mediaCode: 'b',
                    title: 'Danganronpa 2: Goodbye Despair',
                },
                progress: '50 hrs',
                rating: 10,
                started: '2017/01/10',
                tags: [],
            },
            {
                entryCode: 'c',
                finished: '2018/01/13',
                lastUpdated: '2018/09/15 19:01',
                listCode: 'a',
                media: {
                    artUrl:
                        'https://78.media.tumblr.com/4f30940e947b58fb57e2b8499f460acb/tumblr_okccrbpkDY1rb48exo1_1280.jpg',
                    mediaCode: 'c',
                    title: 'Danganronpa V3: Killing Harmony',
                },
                progress: '50 hrs',
                rating: 10,
                started: '2018/01/10',
                tags: [],
            },
        ],
        listCode: 'a',
        mediaType: MediaType.Game,
        name: 'Games',
        username: 'mezzode',
    },
    {
        entries: [
            {
                entryCode: 'd',
                finished: '2018/01/13',
                lastUpdated: '2018/09/15 19:01',
                listCode: 'b',
                media: {
                    artUrl:
                        'https://78.media.tumblr.com/4f30940e947b58fb57e2b8499f460acb/tumblr_okccrbpkDY1rb48exo1_1280.jpg',
                    mediaCode: 'asdf',
                    title: 'Rainbow 6: Siege',
                },
                progress: '50 hrs',
                rating: 10,
                started: '2018/01/10',
                tags: [],
            },
        ],
        listCode: 'b',
        mediaType: MediaType.Game,
        name: 'Multiplayer Games',
        username: 'mezzode',
    },
];

storiesOf('Lists', module)
    .addDecorator(story => (
        <MemoryRouter>
            <MuiThemeProvider theme={theme}>{story()}</MuiThemeProvider>
        </MemoryRouter>
    ))
    .add(
        'Editable Lists',
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
        })(() => <Lists lists={lists} editable={true} />),
    )
    .add(
        'Uneditable Lists',
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
        })(() => <Lists lists={lists} editable={false} />),
    );
