import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { State } from 'src/reducers';
import { closeEntryEditor, updateEntryEditor } from './actions';
import { EntryEditorComponent } from './Component';
import { DispatchProps, OwnProps, StateProps } from './types';

const mapStateToProps: MapStateToProps<
    StateProps,
    OwnProps,
    State
> = state => ({
    entry: state.modals.entryEditor.entry,
});

const mapDispatchToProps: MapDispatchToProps<
    DispatchProps,
    OwnProps
> = dispatch => ({
    close: () => dispatch(closeEntryEditor()),
    input: e =>
        dispatch(
            updateEntryEditor({
                [e.target.id]: e.target.value || null,
            }),
        ),
});

export const EntryEditorContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(EntryEditorComponent);
