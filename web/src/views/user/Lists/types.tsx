import { WithStyles } from '@material-ui/core';
import { WithWidth } from '@material-ui/core/withWidth';
import { RouteComponentProps } from 'react-router';
import { EntryList } from '../../../types';
import { styles } from './Component';

interface Params {
    mediaType: string;
    username: string;
}

export interface OwnProps extends RouteComponentProps<Params> {}

export interface StateProps {
    lists: EntryList[] | null;
    editable: boolean;
}

export interface DispatchProps {
    loadLists: () => void;
}

export interface Props
    extends WithStyles<typeof styles>,
        WithWidth,
        OwnProps,
        StateProps,
        DispatchProps {}
