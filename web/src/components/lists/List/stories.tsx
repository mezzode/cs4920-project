import { MuiThemeProvider, Paper } from '@material-ui/core';
import { withInfo } from '@storybook/addon-info';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { MemoryRouter } from 'react-router';
import { theme } from 'src/App';
import { Entry } from 'src/types';
import { EntryList, MediaType } from 'src/types';
import { ListComponent } from './Component';

const entries: Entry[] = [
    {
        category: 'Completed',
        entryCode: 'a',
        finished: '2016/01/13',
        lastUpdated: '2018/09/15 19:01',
        listCode: 'a',
        media: {
            cover:
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
        category: 'Completed',
        entryCode: 'b',
        finished: '2017/01/13',
        lastUpdated: '2018/09/15 19:01',
        listCode: 'a',
        media: {
            cover:
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
        category: 'Completed',
        entryCode: 'c',
        finished: '2018/01/13',
        lastUpdated: '2018/09/15 19:01',
        listCode: 'a',
        media: {
            cover:
                'https://78.media.tumblr.com/4f30940e947b58fb57e2b8499f460acb/tumblr_okccrbpkDY1rb48exo1_1280.jpg',
            mediaCode: 'c',
            title: 'Danganronpa V3: Killing Harmony',
        },
        progress: '50 hrs',
        rating: 10,
        started: '2018/01/10',
        tags: [],
    },
];

const list: EntryList = {
    entries,
    listCode: 'a',
    mediaType: MediaType.Game,
    name: 'Games',
    username: 'mezzode',
};

const handleEdit: (entry: Entry) => React.MouseEventHandler = entry => e => {
    // TODO
    console.log(entry);
    console.log(e);
};

const handleDelete = () => console.log('Delete clicked');
const handleListEdit = () => console.log('List edit clicked');

storiesOf('List', module)
    .addDecorator(story => (
        <MemoryRouter>
            <MuiThemeProvider theme={theme}>{story()}</MuiThemeProvider>
        </MemoryRouter>
    ))
    .add(
        'Editable List',
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
        })(() => (
            <Paper>
                <ListComponent
                    list={list}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    handleListEdit={handleListEdit}
                    editable={true}
                />
            </Paper>
        )),
    )
    .add(
        'Uneditable List',
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
        })(() => (
            <Paper>
                <ListComponent
                    list={list}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    handleListEdit={handleListEdit}
                    editable={false}
                />
            </Paper>
        )),
    );
