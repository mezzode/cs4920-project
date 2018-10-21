import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { openEntryCreator } from 'src/components/modals';
// // import { setFlashMessage } from '../../actions/flashMessage';
// // import { clearMedias, setLoading, setMedias } from '../../actions/media';
import { State } from 'src/reducers/index';
import { EntryList, ListsMap, NewEntry } from 'src/types';
import { Status } from '../EntryCreator/reducer';
import { EntryMediaComponent } from './Component';
// // import { isMediaType } from '../../types';
// import { EntryMediaComponent } from './Component';
import { DispatchProps, OwnProps, StateProps } from './types';

const mapStateToProps: MapStateToProps<
    StateProps,
    OwnProps,
    State
> = state => ({
    shouldOpen: state.modals.entryCreator.status !== Status.closed,
});

const mapDispatchToProps: MapDispatchToProps<
    DispatchProps,
    OwnProps
> = dispatch => {
    function open() {
        dispatch(openEntryCreator({} as NewEntry));
    }

    return {
        loadUserLists,
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

const loadUserLists = async (username: string, mediaType: string) => {
    const res = await fetch(
        `${process.env.REACT_APP_API_BASE}/user/${username}/lists/${mediaType}`,
    );
    if (res.status > 400) {
        throw new Error(`Server error: ${res.status} ${res.statusText}`);
    }
    const { lists } = (await res.json()) as { lists: EntryList[] };
    console.log(JSON.stringify(lists));
    const listsMap = lists.reduce<ListsMap>(
        (map, list) => ({
            ...map,
            [list.listCode]: list,
        }),
        {},
    );
    return listsMap;
};
