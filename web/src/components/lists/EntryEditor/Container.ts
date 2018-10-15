import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { closeEntryEditor, updateEntryEditor } from '../../../actions/entry';
import { State } from '../../../reducers/index';
import { EntryEditorComponent } from './Component';
import { DispatchProps, OwnProps, StateProps } from './types';

const mapStateToProps: MapStateToProps<
    StateProps,
    OwnProps,
    State
> = state => ({
    entry: state.entryEditor.entry,
});

const mapDispatchToProps: MapDispatchToProps<
    DispatchProps,
    OwnProps
> = dispatch => {
    const handleCancel = () => {
        dispatch(closeEntryEditor());
    };

    const handleInput: React.ChangeEventHandler<HTMLInputElement> = e =>
        dispatch(
            updateEntryEditor({
                [e.target.id]: e.target.value || null,
            }),
        );

    return {
        close: () => {
            dispatch(closeEntryEditor());
        },
        handleCancel,
        handleInput,
    };
};

export const EntryEditorContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(EntryEditorComponent);
