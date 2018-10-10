import { WithStyles } from '@material-ui/core';
import { WithWidth } from '@material-ui/core/withWidth';
import { Entry, UserEntry } from '../../../types';
import { styles } from './Component';

export interface StateProps {
    entry: Entry | null;
}

export interface DispatchProps {
    handleInput: React.FormEventHandler;
    handleCancel: () => void;
    handleSave: (
        entryCode: string,
        entryEdit: Partial<UserEntry>,
    ) => React.MouseEventHandler;
}

export interface OwnProps {}

export interface Props
    extends WithStyles<typeof styles>,
        WithWidth,
        DispatchProps,
        StateProps,
        OwnProps {}
