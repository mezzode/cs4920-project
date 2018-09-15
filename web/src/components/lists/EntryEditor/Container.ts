import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import {
    cancelEntryEdit,
    saveEntryEdit,
    updateEntryEdit,
} from '../../../actions/entry';
import { State } from '../../../reducers/index';
import { Entry } from '../../../types';
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
        dispatch(cancelEntryEdit());
    };

    const handleInput: React.ChangeEventHandler<HTMLInputElement> = e =>
        dispatch(
            updateEntryEdit({
                [e.target.id]: e.target.value,
            }),
        );

    const handleSave = async () => {
        dispatch(saveEntryEdit.started());
        try {
            const res = await fetch('/lists');
            if (res.status > 400) {
                throw new Error(
                    `Server error: ${res.status} ${res.statusText}`,
                );
            }
            const result = (await res.json()) as Entry;
            dispatch(saveEntryEdit.done({ result }));
        } catch (e) {
            dispatch(saveEntryEdit.failed(e.message));
        }
    };

    return {
        handleCancel,
        handleInput,
        handleSave,
    };
};

export const EntryEditorContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(EntryEditorComponent);
