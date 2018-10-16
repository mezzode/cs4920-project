import { Reducer } from 'redux';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { closeListEditor, openListEditor, updateListEditor } from './actions';
import { State } from './types';

const closed = {
    list: null,
    listEdit: null,
};

export const listEditor: Reducer<State> = reducerWithInitialState<State>(closed)
    .case(openListEditor, (state, list) => ({
        list,
        listEdit: {
            name: list.name,
        },
    }))
    .case(closeListEditor, () => closed)
    .case(updateListEditor, (state, listEdit) => ({
        ...state,
        listEdit,
    }))
    .build();
