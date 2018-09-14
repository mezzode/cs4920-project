import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { createUpdateEntryEditAction } from "../../../reducers/actions";
import { IState } from "../../../reducers/index";
import { EntryEditorComponent } from "./Component";
import { IDispatchProps, IOwnProps, IStateProps } from "./types";

const mapStateToProps: MapStateToProps<
    IStateProps,
    IOwnProps,
    IState
> = state => ({
    entry: state.entryEditor
});

const mapDispatchToProps: MapDispatchToProps<
    IDispatchProps,
    IOwnProps
> = dispatch => {
    const handleCancel = () => {
        // TODO
    }

    const handleInput: React.ChangeEventHandler<HTMLInputElement> = e =>
        dispatch(
            createUpdateEntryEditAction({
                [e.target.id]: e.target.value
            })
        );

    const handleSave = () => {
        // TODO
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
