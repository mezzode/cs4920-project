import { WithStyles } from '@material-ui/core';
import { EntryList } from 'src/types';
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
}

export interface OwnProps {
    mediaType: string;
    mediaId: string;
}

export interface StateProps {
    shouldOpen: boolean;
    username: string;
}
