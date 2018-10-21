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
    entry: state.modals.entryCreator.entry,
    // mediaId: state.mediaSearch.media ? state.mediaSearch.media.id : '',
});

const mapDispatchToProps: MapDispatchToProps<
    DispatchProps,
    OwnProps
> = dispatch => ({
    // addTag: tag => dispatch(addTag(tag)),
    close: () => dispatch(closeEntryCreator()),
    input: e => {
        dispatch(
            saveEntryCreator({
                [e.target.id || e.target.name]: e.target.value || null,
            }),
        );
    },
    setDate: () => {
        const today = new Date();
        const curDate = `${today.getFullYear()}-${
            today.getMonth() < 10 ? '0' + today.getMonth() : today.getMonth()
        }-${today.getDate() < 10 ? '0' + today.getDate() : today.getDate()}`;
        dispatch(saveEntryCreator({ started: curDate, finished: curDate }));
    },
    // removeTag: tag => dispatch(removeTag(tag)),
});

export const EntryCreatorContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(EntryCreatorComponent);
