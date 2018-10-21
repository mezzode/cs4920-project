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
                category: 'Completed',
                entryCode: 'a',
                finished: '2016/01/13',
                lastUpdated: '2018/09/15 19:01',
                listCode: 'a',
                media: {
                    category: 'Main Game',
                    cover:
                        '//images.igdb.com/igdb/image/upload/t_thumb/dckh8rr0f4lo4hbw1uty.jpg',
                    description:
                        "The follow up to Danganronpa: Trigger Happy Havoc. Danganronpa 2: Goodbye Despair introduces a new cast of characters. The main character, Hajime Hinata a new 'Ultimate' student at Hope's Peak Academy. On their first day, Hajime and all of his classmates are taken on a field trip to the mysterious Jabberwock island by their anthropomorphic rabbit teacher, Usami. Usami explains that on this island the students are to have fun together and become friends to gather Hope Fragments. Usami's field trip does not go as planned when Monokuma appears and begins a new Killing Game. Anyone that wants to leave the island must commit a murder and get away with it. If the murderer is successful, he/she is allowed to leave the island, while everyone else is killed. When a murder occurs, the player investigates. After the investigations, a trial commences to determine who the culprit is.",
                    developers: ['Spike ChunSoft'],
                    first_release_date: '2012-07-26T00:00:00.000+00:00',
                    genres: ['Shooter', 'Music', 'Adventure'],
                    id: 9694,
                    publishers: ['NIS America', 'Spike ChunSoft'],
                    status: 'Released',
                    themes: ['Action', 'Horror'],
                    title: 'Danganronpa 2: Goodbye Despair',
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
                    category: 'Main Game',
                    cover:
                        '//images.igdb.com/igdb/image/upload/t_thumb/dckh8rr0f4lo4hbw1uty.jpg',
                    description:
                        "The follow up to Danganronpa: Trigger Happy Havoc. Danganronpa 2: Goodbye Despair introduces a new cast of characters. The main character, Hajime Hinata a new 'Ultimate' student at Hope's Peak Academy. On their first day, Hajime and all of his classmates are taken on a field trip to the mysterious Jabberwock island by their anthropomorphic rabbit teacher, Usami. Usami explains that on this island the students are to have fun together and become friends to gather Hope Fragments. Usami's field trip does not go as planned when Monokuma appears and begins a new Killing Game. Anyone that wants to leave the island must commit a murder and get away with it. If the murderer is successful, he/she is allowed to leave the island, while everyone else is killed. When a murder occurs, the player investigates. After the investigations, a trial commences to determine who the culprit is.",
                    developers: ['Spike ChunSoft'],
                    first_release_date: '2012-07-26T00:00:00.000+00:00',
                    genres: ['Shooter', 'Music', 'Adventure'],
                    id: 9694,
                    publishers: ['NIS America', 'Spike ChunSoft'],
                    status: 'Released',
                    themes: ['Action', 'Horror'],
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
                    category: 'Main Game',
                    cover:
                        '//images.igdb.com/igdb/image/upload/t_thumb/dckh8rr0f4lo4hbw1uty.jpg',
                    description:
                        "The follow up to Danganronpa: Trigger Happy Havoc. Danganronpa 2: Goodbye Despair introduces a new cast of characters. The main character, Hajime Hinata a new 'Ultimate' student at Hope's Peak Academy. On their first day, Hajime and all of his classmates are taken on a field trip to the mysterious Jabberwock island by their anthropomorphic rabbit teacher, Usami. Usami explains that on this island the students are to have fun together and become friends to gather Hope Fragments. Usami's field trip does not go as planned when Monokuma appears and begins a new Killing Game. Anyone that wants to leave the island must commit a murder and get away with it. If the murderer is successful, he/she is allowed to leave the island, while everyone else is killed. When a murder occurs, the player investigates. After the investigations, a trial commences to determine who the culprit is.",
                    developers: ['Spike ChunSoft'],
                    first_release_date: '2012-07-26T00:00:00.000+00:00',
                    genres: ['Shooter', 'Music', 'Adventure'],
                    id: 9694,
                    publishers: ['NIS America', 'Spike ChunSoft'],
                    status: 'Released',
                    themes: ['Action', 'Horror'],
                    title: 'Danganronpa 2: Goodbye Despair',
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
                category: 'Completed',
                entryCode: 'd',
                finished: '2018/01/13',
                lastUpdated: '2018/09/15 19:01',
                listCode: 'b',
                media: {
                    category: 'Main Game',
                    cover:
                        '//images.igdb.com/igdb/image/upload/t_thumb/dckh8rr0f4lo4hbw1uty.jpg',
                    description:
                        "The follow up to Danganronpa: Trigger Happy Havoc. Danganronpa 2: Goodbye Despair introduces a new cast of characters. The main character, Hajime Hinata a new 'Ultimate' student at Hope's Peak Academy. On their first day, Hajime and all of his classmates are taken on a field trip to the mysterious Jabberwock island by their anthropomorphic rabbit teacher, Usami. Usami explains that on this island the students are to have fun together and become friends to gather Hope Fragments. Usami's field trip does not go as planned when Monokuma appears and begins a new Killing Game. Anyone that wants to leave the island must commit a murder and get away with it. If the murderer is successful, he/she is allowed to leave the island, while everyone else is killed. When a murder occurs, the player investigates. After the investigations, a trial commences to determine who the culprit is.",
                    developers: ['Spike ChunSoft'],
                    first_release_date: '2012-07-26T00:00:00.000+00:00',
                    genres: ['Shooter', 'Music', 'Adventure'],
                    id: 9694,
                    publishers: ['NIS America', 'Spike ChunSoft'],
                    status: 'Released',
                    themes: ['Action', 'Horror'],
                    title: 'Danganronpa 2: Goodbye Despair',
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
