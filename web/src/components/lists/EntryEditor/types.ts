import { WithStyles } from '@material-ui/core';
import { Entry } from '../../../types';
import { styles } from './Component';

export interface StateProps {
    entry: Entry | null;
}

export interface DispatchProps {
    handleInput: React.FormEventHandler;
    handleCancel: () => void;
    handleSave: () => void;
}

export interface OwnProps {}

export interface Props
    extends WithStyles<typeof styles>,
        DispatchProps,
        StateProps,
        OwnProps {}
