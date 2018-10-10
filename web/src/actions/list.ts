// TODO: load list(s)

import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { actionCreatorFactory } from 'typescript-fsa';
import { State } from '../reducers/index';
import { EntryList } from '../types';

const actionCreator = actionCreatorFactory('LIST_DISPLAY');

interface ListGetResult {
    [listCode: string]: EntryList;
}

export const getLists = actionCreator.async<void, ListGetResult, string>('GET');

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
