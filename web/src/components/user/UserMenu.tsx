import {
    Divider,
    List,
    ListItem,
    ListItemText,
    ListSubheader,
} from '@material-ui/core';
import * as React from 'react';
import { mediaDisplay, MediaType, mediaUrl } from '../../types';
import { LinkTo } from '../common/util';

interface Props {
    username: string;
    mediaType?: MediaType;
}

export const UserMenu: React.SFC<Props> = ({ username, mediaType }) => (
    <>
        <List component="nav">
            {/* TODO:
                add list to drawer
                make list collapsible in mobile
                make link to user page active when at user page
            */}
            <ListItem button={true} component={LinkTo(`/user/${username}`)}>
                <ListItemText primary={username} />
            </ListItem>
        </List>
        <Divider />
        <List component="nav">
            <ListSubheader>Lists</ListSubheader>
            {Object.keys(MediaType)
                .map(k => MediaType[k])
                .map((t: MediaType) => (
                    <ListItem
                        selected={t === mediaType}
                        button={true}
                        component={LinkTo(
                            `/user/${username}/lists/${mediaUrl[t]}`,
                        )}
                        key={t}
                    >
                        <ListItemText primary={mediaDisplay[t]} />
                    </ListItem>
                ))}
        </List>
    </>
);
