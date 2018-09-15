import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import {
    cancelEntryEdit,
    saveEntryEdit,
    updateEntryEdit,
} from '../../../actions/entry';
import { IState } from '../../../reducers/index';
import { IEntry } from '../../../types';
import { EntryEditorComponent } from './Component';
import { IDispatchProps, IOwnProps, IStateProps } from './types';

const mapStateToProps: MapStateToProps<
    IStateProps,
    IOwnProps,
    IState
> = state => ({
    entry: state.entryEditor.entry,
});

const mapDispatchToProps: MapDispatchToProps<
    IDispatchProps,
    IOwnProps
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
            const result = (await res.json()) as IEntry;
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
