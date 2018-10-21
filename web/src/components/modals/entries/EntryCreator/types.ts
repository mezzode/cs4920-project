import { WithStyles } from '@material-ui/core';
import { WithWidth } from '@material-ui/core/withWidth';
import { Entry, EntryList } from 'src/types';
import { styles } from './Component';

export interface StateProps {
    entry: Entry | null;
    mediaId: string;
}

export interface DispatchProps {
    close: () => void;
    input: React.ChangeEventHandler<HTMLInputElement>;
    // addTag: (tag: string) => void;
    // removeTag: (tag: string, index: number) => void;
}

export type AfterEntryEditCallBack = (editedEntry: Entry) => void;

export interface OwnProps {
    /** Callback to be called after a successful save. */
    afterEdit?: AfterEntryEditCallBack;
    shouldOpen: boolean;
    lists: EntryList[] | null;
}

export interface Props
    extends WithStyles<typeof styles>,
        WithWidth,
        DispatchProps,
        StateProps,
        OwnProps {}
