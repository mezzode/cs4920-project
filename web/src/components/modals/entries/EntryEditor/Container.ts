import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { State } from 'src/reducers';
import {
    addTag,
    closeEntryEditor,
    removeTag,
    updateEntryEditor,
} from './actions';
import { EntryEditorComponent } from './Component';
import { DispatchProps, OwnProps, StateProps } from './types';

const mapStateToProps: MapStateToProps<
    StateProps,
    OwnProps,
    State
> = state => ({
    authToken: state.user.authToken,
    entry: state.modals.entryEditor.entry,
});

const mapDispatchToProps: MapDispatchToProps<
    DispatchProps,
    OwnProps
> = dispatch => ({
    addTag: tag => dispatch(addTag(tag)),
    close: () => dispatch(closeEntryEditor()),
    input: e =>
        dispatch(
            updateEntryEditor({
                [e.target.id]: e.target.value || null,
            }),
        ),
    removeTag: tag => dispatch(removeTag(tag)),
});

export const EntryEditorContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(EntryEditorComponent);
