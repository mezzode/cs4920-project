import { connect, MapDispatchToProps } from 'react-redux';
import { startEntryEdit } from '../../../actions/entry';
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
        dispatch(startEntryEdit(entry));

    return {
        handleEdit,
    };
};

export const ListContainer = connect(
    null,
    mapDispatchToProps,
)(ListComponent);
