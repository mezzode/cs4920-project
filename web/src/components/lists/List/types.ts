import { WithStyles } from '@material-ui/core';
import { Entry } from '../../../types';
import { styles } from './Component';

export interface DispatchProps {
    handleEdit: (entry: Entry) => React.MouseEventHandler;
}

export interface OwnProps {
    entries: Entry[];
}

export interface Props
    extends WithStyles<typeof styles>,
        DispatchProps,
        OwnProps {}
