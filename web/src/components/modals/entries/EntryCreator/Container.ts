import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { State } from 'src/reducers';
import {
    // addTag,
    closeEntryCreator,
    saveEntryCreator,
    // removeTag,
} from './actions';
import { EntryCreatorComponent } from './Component';
import { DispatchProps, OwnProps, StateProps } from './types';

const mapStateToProps: MapStateToProps<
    StateProps,
    OwnProps,
    State
> = state => ({
    entry: state.modals.entryEditor.entry,
    mediaId: state.mediaSearch.media ? state.mediaSearch.media.id : '',
});

const mapDispatchToProps: MapDispatchToProps<
    DispatchProps,
    OwnProps
> = dispatch => ({
    // addTag: tag => dispatch(addTag(tag)),
    close: () => dispatch(closeEntryCreator()),
    input: e =>
        dispatch(
            saveEntryCreator({
                [e.target.id]: e.target.value || null,
            }),
        ),
    // removeTag: tag => dispatch(removeTag(tag)),
});

export const EntryCreatorContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(EntryCreatorComponent);
