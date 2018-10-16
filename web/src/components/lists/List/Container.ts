import { connect, MapDispatchToProps } from 'react-redux';
import { openEntryEditor } from '../../../actions/entry';
import { Entry } from '../../../types';
import { openListDeleter } from '../ListDeleter/actions';
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

    return {
        handleDelete,
        handleEdit,
    };
};

export const ListContainer = connect(
    null,
    mapDispatchToProps,
)(ListComponent);
