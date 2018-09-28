// TODO: load list(s)

import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { actionCreatorFactory } from 'typescript-fsa';
import { State } from '../reducers/index';
import { EntryList } from '../types';

const actionCreator = actionCreatorFactory('LIST_DISPLAY');

export const setDisplayedLists = actionCreator<{
    readonly [listId: string]: EntryList;
}>('SET');
export const clearDisplayedLists = actionCreator('CLEAR');

export const getDisplayedList = actionCreator.async<void, EntryList, string>(
    'GET',
);

export const loadList: (
    listId: string,
) => ThunkAction<
    Promise<EntryList>,
    State,
    void,
    Action
> = listId => async dispatch => {
    dispatch(getDisplayedList.started());
    try {
        const res = await fetch(
            `${process.env.REACT_APP_API_BASE}/list/${listId}`,
            { mode: 'cors' },
        );
        if (res.status > 400) {
            throw new Error(`Server error: ${res.status} ${res.statusText}`);
        }
        const result = (await res.json()) as EntryList;
        dispatch(getDisplayedList.done({ result }));
        return result;
    } catch (e) {
        dispatch(getDisplayedList.failed(e.message));
        throw e;
    }
};
