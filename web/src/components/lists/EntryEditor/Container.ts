import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import {
    cancelEntryEdit,
    saveEntryEdit,
    updateEntryEdit,
} from '../../../actions/entry';
import { State } from '../../../reducers/index';
import { Entry, UserEntry } from '../../../types';
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

    const handleSave = (
        entryCode: string,
        listCode: string,
        entryEdit: Partial<UserEntry>,
    ) => async () => {
        // TODO: consider making this its own thunk
        const params = { entryCode, listCode };
        dispatch(saveEntryEdit.started(params));
        try {
            const res = await fetch(
                `${process.env.REACT_APP_API_BASE}/entry/${entryCode}`,
                {
                    body: JSON.stringify(entryEdit),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'POST',
                },
            );
            if (res.status >= 400) {
                throw new Error(`${res.status} ${res.statusText}`);
            }
            const result = (await res.json()) as Entry;
            dispatch(saveEntryEdit.done({ result, params }));
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
