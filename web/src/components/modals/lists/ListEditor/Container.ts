import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { State } from 'src/reducers/index';
import { closeListEditor, updateListEditor } from './actions';
import { ListEditorComponent } from './Component';
import { DispatchProps, OwnProps, StateProps } from './types';

const mapStateToProps: MapStateToProps<StateProps, OwnProps, State> = state =>
    state.modals.listEditor;

const mapDispatchToProps: MapDispatchToProps<
    DispatchProps,
    OwnProps
> = dispatch => ({
    close: () => {
        dispatch(closeListEditor());
    },
    input: (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.id !== 'name') {
            throw new Error('Invalid list property.');
        }
        dispatch(
            updateListEditor({
                [e.target.id]: e.target.value,
            }),
        );
    },
});

export const ListEditorContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(ListEditorComponent);
