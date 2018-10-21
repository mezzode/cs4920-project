import { WithStyles } from '@material-ui/core';
import { EntryList, ListsMap } from 'src/types';
import { styles } from './styles';

export interface SearchResultMedia {}

export interface Props
    extends WithStyles<typeof styles>,
        DispatchProps,
        OwnProps,
        StateProps {}

export interface State {
    lists: EntryList[] | null;
}

export interface DispatchProps {
    open: () => void;
    loadUserLists: (username: string, mediaType: string) => Promise<ListsMap>;
}

export interface OwnProps {
    mediaType: string;
    username: string;
}

export interface StateProps {
    shouldOpen: boolean;
}
