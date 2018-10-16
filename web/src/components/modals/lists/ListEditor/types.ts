import { WithStyles } from '@material-ui/core';
import { EntryList } from 'src/types';
import { styles } from './Component';

export interface State {
    list: EntryList | null;
    listEdit: ListEdit | null;
}

export interface StateProps {
    list: EntryList | null;
    listEdit: ListEdit | null;
}

export interface DispatchProps {
    close: () => void;
    input: React.ChangeEventHandler<HTMLInputElement>;
}

export type AfterListEditCallback = (listCode: string, listEdit: ListEdit) => void;
export interface OwnProps {
    /** Callback to be called after a successful edit. */
    afterEdit?: AfterListEditCallback;
}

export interface Props
    extends WithStyles<typeof styles>,
        StateProps,
        DispatchProps,
        OwnProps {}

export interface ListEdit {
    name: string;
}
