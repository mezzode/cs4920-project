import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { State } from 'src/reducers';
import {
    addTagEntryCreator,
    closeEntryCreator,
    removeTagEntryCreator,
    saveEntryCreator,
} from './actions';
import { EntryCreatorComponent } from './Component';
import { DispatchProps, OwnProps, StateProps } from './types';

const mapStateToProps: MapStateToProps<
    StateProps,
    OwnProps,
    State
> = state => ({
    authToken: state.user.authToken,
    entry: state.modals.entryCreator.entry,
    // mediaId: state.mediaSearch.media ? state.mediaSearch.media.id : '',
});

const mapDispatchToProps: MapDispatchToProps<
    DispatchProps,
    OwnProps
> = dispatch => ({
    addTagEntryCreator: tag => {
        console.log('wtf');
        dispatch(addTagEntryCreator(tag));
    },
    close: () => dispatch(closeEntryCreator()),
    input: e => {
        dispatch(
            saveEntryCreator({
                [e.target.id || e.target.name]: e.target.value || null,
            }),
        );
    },
    removeTagEntryCreator: tag => dispatch(removeTagEntryCreator(tag)),
    setDate: () => {
        const today = new Date();
        const curDate = today.toISOString().substr(0, 10);
        dispatch(saveEntryCreator({ started: curDate, finished: curDate }));
    },
});

export const EntryCreatorContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(EntryCreatorComponent);
