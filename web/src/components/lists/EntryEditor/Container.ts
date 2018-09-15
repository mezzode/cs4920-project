import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { createUpdateEntryEditAction, saveEntryEdit } from "../../../actions";
import { IState } from "../../../reducers/index";
import { IEntry } from "../../../types";
import { EntryEditorComponent } from "./Component";
import { IDispatchProps, IOwnProps, IStateProps } from "./types";

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
> = (dispatch, ownProps, ) => {
    const handleCancel = () => {
        // TODO
    }

    const handleInput: React.ChangeEventHandler<HTMLInputElement> = e =>
        dispatch(
            createUpdateEntryEditAction({
                [e.target.id]: e.target.value
            })
        );

    // const handleSave = (entry: IEntry) => dispatch(saveEntryEdit({entry}));
    // maybe this isnt meant to be in connect
    const handleSave = async () => {
        dispatch(saveEntryEdit.started());
        try {
            const res = await fetch('/lists');
            if (res.status > 400) {
                throw new Error(`Server error: ${res.status} ${res.statusText}`);
            }
            const result = await res.json() as IEntry;
            dispatch(saveEntryEdit.done({result}));
        } catch (e) {
            dispatch(saveEntryEdit.failed);
        }
    }
    
    return {
        handleCancel,
        handleInput,
        handleSave,
    };
};

export const EntryEditorContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(EntryEditorComponent);

// const handleSave1 = bindThunkAction(saveEntryEdit, async (payload, dispatch, getState) => {
//     const endpoint = '/list'; // TODO
//     const res = await fetch(endpoint);
//     if (res.status > 400) {
//         throw new Error(`Server error: ${res.status} ${res.statusText}`);
//     }
//     const json = res.json();
//     // return null;
// });
