import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { closeEntryEditor, updateEntryEditor } from 'src/actions/entry';
import { State } from 'src/reducers/index';
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
