import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { openEntryCreator } from 'src/components/modals';
import { State } from 'src/reducers/index';
import { NewEntry } from 'src/types';
import { Status } from '../EntryCreator/reducer';
import { EntryMediaComponent } from './Component';
import { DispatchProps, OwnProps, StateProps } from './types';

const mapStateToProps: MapStateToProps<
    StateProps,
    OwnProps,
    State
> = state => ({
    shouldOpen: state.modals.entryCreator.status !== Status.closed,
    username: state.user.displayName ? state.user.displayName : '',
});

const mapDispatchToProps: MapDispatchToProps<
    DispatchProps,
    OwnProps
> = dispatch => {
    function open() {
        dispatch(openEntryCreator({} as NewEntry));
    }

    return {
        open,
    };
};

export const EntryMediaContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(EntryMediaComponent);

// const loadEntries = async () => {
//     const res = await fetch(
//         `${process.env.REACT_APP_API_BASE}/entry/${entryCode}`,
//         {
//             body: JSON.stringify(entryEdit),
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             method: 'POST',
//         },
//     );
//     if (res.status >= 400) {
//         throw new Error(`${res.status} ${res.statusText}`);
//     }
//     const editedEntry: Entry = await res.json();
//     if (afterEdit) {
//         afterEdit(editedEntry);
//     }
//     close();
// };
