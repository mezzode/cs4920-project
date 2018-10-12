import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { createList, loadUserLists } from '../../../actions/list';
import { State } from '../../../reducers/index';
import { EntryList, NewEntryList } from '../../../types';
import { UserListsComponent } from './Component';
import { DispatchProps, OwnProps, StateProps } from './types';

export const mapStateToProps: MapStateToProps<StateProps, OwnProps, State> = (
    { lists, user: { displayName } },
    { match },
) => ({
    editable: displayName === match.params.username,
    lists:
        lists &&
        Object.keys(lists)
            .map(k => lists[k])
            .filter(({ username }) => username === match.params.username),
});

export const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = (
    dispatch: ThunkDispatch<State, void, Action>,
    { match },
) => ({
    createList: async (newList: NewEntryList): Promise<EntryList | null> => {
        // TODO: consider making this its own thunk
        dispatch(createList.started());
        try {
            const res = await fetch(`${process.env.REACT_APP_API_BASE}/list`, {
                body: JSON.stringify(newList),
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
            });
            if (res.status >= 400) {
                throw new Error(`${res.status} ${res.statusText}`);
            }
            const result = (await res.json()) as EntryList;
            dispatch(createList.done({ result }));
            return result;
        } catch (e) {
            dispatch(createList.failed(e.message));
            return null;
        }
    },
    loadLists: () => {
        const { username, mediaType } = match.params;
        dispatch(loadUserLists(username, mediaType));
    },
});

export const UserListsContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(UserListsComponent);
