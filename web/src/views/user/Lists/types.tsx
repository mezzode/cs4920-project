import { WithStyles } from '@material-ui/core';
import { WithWidth } from '@material-ui/core/withWidth';
import { RouteComponentProps } from 'react-router';
import { ListsMap } from '../../../types';
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

export interface Props
    extends WithStyles<typeof styles>,
        WithWidth,
        OwnProps,
        StateProps {}

export interface State {
    createOpen: boolean;
    editOpen: boolean;
    lists: ListsMap | null;
}
