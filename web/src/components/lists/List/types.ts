import { WithStyles } from '@material-ui/core';
import { Entry, EntryList } from 'src/types';
import { styles } from './Component';

export interface DispatchProps {
    handleEdit: (entry: Entry) => React.MouseEventHandler;
    handleDelete: React.MouseEventHandler;
    handleListEdit: React.MouseEventHandler;
}

export interface OwnProps {
    list: EntryList;
    editable: boolean;
}

export interface Props
    extends WithStyles<typeof styles>,
        DispatchProps,
        OwnProps {}
