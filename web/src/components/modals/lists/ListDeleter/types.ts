import { WithStyles } from '@material-ui/core';
import { WithWidth } from '@material-ui/core/withWidth';
import { EntryList } from 'src/types';
import { styles } from './Component';

export interface StateProps {
    list: EntryList | null;
}

export interface DispatchProps {
    close: () => void;
}

export type AfterListDeleteCallback = (deletedList: EntryList) => void;
export interface OwnProps {
    /** Callback to be called after a successful delete. */
    afterDelete?: AfterListDeleteCallback;
}

export interface Props
    extends WithStyles<typeof styles>,
        WithWidth,
        StateProps,
        DispatchProps,
        OwnProps {}
