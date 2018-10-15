import { connect, MapDispatchToProps } from 'react-redux';
import { openEntryEditor } from '../../../actions/entry';
import { Entry } from '../../../types';
import { ListComponent } from './Component';
import { DispatchProps, OwnProps } from './types';

const mapDispatchToProps: MapDispatchToProps<
    DispatchProps,
    OwnProps
> = dispatch => {
    const handleEdit: (
        entry: Entry,
    ) => React.MouseEventHandler<HTMLInputElement> = entry => e =>
        dispatch(openEntryEditor(entry));

    return {
        handleEdit,
    };
};

export const ListContainer = connect(
    null,
    mapDispatchToProps,
)(ListComponent);
