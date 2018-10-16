import { WithStyles } from '@material-ui/core';
import { WithWidth } from '@material-ui/core/withWidth';
import { Entry } from 'src/types';
import { styles } from './Component';

export interface StateProps {
    entry: Entry | null;
}

export interface DispatchProps {
    close: () => void;
    handleInput: React.FormEventHandler;
    handleCancel: () => void;
}

export interface OwnProps {
    /** Callback to be called after a successful save. */
    afterSave?: (editedEntry: Entry) => void;
}

export interface Props
    extends WithStyles<typeof styles>,
        WithWidth,
        DispatchProps,
        StateProps,
        OwnProps {}
