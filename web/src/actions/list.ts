// TODO: load list(s)

import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { actionCreatorFactory } from 'typescript-fsa';
import { State } from '../reducers/index';
import { EntryList } from '../types';

const actionCreator = actionCreatorFactory('LIST');

interface ListsMap {
    [listCode: string]: EntryList;
}

export const getLists = actionCreator.async<void, ListsMap, string>('GET');

export const createList = actionCreator.async<void, EntryList, string>(
    'CREATE',
);

export const loadList: (
    listId: string,
) => ThunkAction<
    Promise<EntryList>,
    State,
    void,
    Action
> = listId => async dispatch => {
    dispatch(getLists.started());
    try {
        const res = await fetch(
            `${process.env.REACT_APP_API_BASE}/list/${listId}`,
            { mode: 'cors' },
        );
        if (res.status > 400) {
            throw new Error(`Server error: ${res.status} ${res.statusText}`);
        }
        const list = (await res.json()) as EntryList;
        dispatch(getLists.done({ result: { [list.listCode]: list } }));
        return list;
    } catch (e) {
        dispatch(getLists.failed(e.message));
        throw e;
    }
};

export const loadUserLists = (
    username: string,
    mediaType: string,
): ThunkAction<Promise<ListsMap>, State, void, Action> => async dispatch => {
    dispatch(getLists.started());
    try {
        const res = await fetch(
            `${
                process.env.REACT_APP_API_BASE
            }/user/${username}/lists/${mediaType}`,
        );
        if (res.status > 400) {
            throw new Error(`Server error: ${res.status} ${res.statusText}`);
        }
        const { lists } = (await res.json()) as { lists: EntryList[] };
        const result = lists.reduce<{ [listCode: string]: EntryList }>(
            (map, list) => ({
                ...map,
                [list.listCode]: list,
            }),
            {},
        );
        dispatch(getLists.done({ result }));
        return result;
    } catch (e) {
        dispatch(getLists.failed(e.message));
        throw e;
    }
};
