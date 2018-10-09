import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory('SEARCH');

export const setSearch = actionCreator<{ readonly search: string }>('SET');
export const clearSearch = actionCreator('CLEAR');
