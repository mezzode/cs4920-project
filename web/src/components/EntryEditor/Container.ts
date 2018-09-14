import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { createUpdateEntryEditAction } from "../../reducers/actions";
import { IState } from "../../reducers/index";
import { IStateProps, IOwnProps, IDispatchProps } from "./types";
import { EntryEditorComponent } from "./Component";

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
    const handleInput: React.ChangeEventHandler<HTMLInputElement> = e =>
        dispatch(
            createUpdateEntryEditAction({
                [e.target.id]: e.target.value
            })
        );
    return {
        handleInput,
        handleCancel: () => {},
        handleSave: () => {}
    };
};

export const EntryEditorContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(EntryEditorComponent);
