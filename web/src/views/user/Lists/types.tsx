import { WithStyles } from '@material-ui/core';
import { WithWidth } from '@material-ui/core/withWidth';
import { RouteComponentProps } from 'react-router';
import { EntryList, ListsMap, NewEntryList } from '../../../types';
import { styles } from './Component';

interface Params {
    mediaType: string;
    username: string;
}

export interface OwnProps extends RouteComponentProps<Params> {}

export interface StateProps {
    // lists: EntryList[] | null;
    editable: boolean;
}

export interface DispatchProps {
    loadLists: () => Promise<ListsMap>;
    createList: (newList: NewEntryList) => Promise<EntryList | null>;
}

export interface Props
    extends WithStyles<typeof styles>,
        WithWidth,
        OwnProps,
        StateProps,
        DispatchProps {}

export interface State {
    createOpen: boolean;
    editOpen: boolean;
    lists: ListsMap | null;
}
