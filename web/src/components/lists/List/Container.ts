import { connect, MapDispatchToProps } from 'react-redux';
import {
    openEntryEditor,
    openListDeleter,
    openListEditor,
} from 'src/components/modals';
import { Entry } from 'src/types';
import { ListComponent } from './Component';
import { DispatchProps, OwnProps } from './types';

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = (
    dispatch,
    { list },
) => {
    const handleEdit: (
        entry: Entry,
    ) => React.MouseEventHandler<HTMLInputElement> = entry => e =>
        dispatch(openEntryEditor(entry));

    const handleDelete: React.MouseEventHandler = e =>
        dispatch(openListDeleter(list));

    const handleListEdit: React.MouseEventHandler = e =>
        dispatch(openListEditor(list));

    return {
        handleDelete,
        handleEdit,
        handleListEdit,
    };
};

export const ListContainer = connect(
    null,
    mapDispatchToProps,
)(ListComponent);
