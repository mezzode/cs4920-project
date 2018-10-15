import { WithStyles } from '@material-ui/core';
import { Entry, EntryList } from '../../../types';
import { styles } from './Component';

export interface DispatchProps {
    handleEdit: (entry: Entry) => React.MouseEventHandler;
}

export interface OwnProps {
    list: EntryList;
    editable: boolean;
}

export interface Props
    extends WithStyles<typeof styles>,
        DispatchProps,
        OwnProps {}
