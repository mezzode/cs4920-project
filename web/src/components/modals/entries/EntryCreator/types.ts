import { WithStyles } from '@material-ui/core';
import { WithWidth } from '@material-ui/core/withWidth';
import { EntryList, NewEntry } from 'src/types';
import { styles } from './Component';

export interface StateProps {
    entry: NewEntry | null;
    // mediaId: string;
}

export interface DispatchProps {
    close: () => void;
    input: React.ChangeEventHandler<HTMLInputElement>;
    setDate: () => void;
    addTagEntryCreator: (tag: string) => void;
    removeTagEntryCreator: (tag: string, index: number) => void;
}

export type AfterEntryEditCallBack = (editedEntry: NewEntry) => void;

export interface OwnProps {
    /** Callback to be called after a successful save. */
    afterEdit?: AfterEntryEditCallBack;
    shouldOpen: boolean;
    lists: EntryList[] | null;
    mediaId: string;
}

export interface Props
    extends WithStyles<typeof styles>,
        WithWidth,
        DispatchProps,
        StateProps,
        OwnProps {}

export interface State {}
