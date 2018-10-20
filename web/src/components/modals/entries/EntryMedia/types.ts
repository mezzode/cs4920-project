import { WithStyles } from '@material-ui/core';
import { RouteComponentProps } from 'react-router';
import { EntryList, ListsMap } from 'src/types';
import { styles } from './styles';

export interface SearchResultMedia {}

export interface Props
    extends WithStyles<typeof styles>,
        DispatchProps,
        OwnProps,
        RouteComponentProps<Params> {}

export interface State {
    lists: EntryList[] | null;
    shouldOpen: boolean;
}

export interface DispatchProps {
    // open: () => void;
    loadUserLists: (username: string, mediaType: string) => Promise<ListsMap>;
}

interface Params {}

export interface OwnProps {
    mediaType: string;
    username: string;
}

export interface StateProps {}
