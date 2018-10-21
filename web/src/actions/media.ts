import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory('MEDIA');

export const addMedia = actionCreator<{}>('ADD');
export const removeMedia = actionCreator('REMOVE');

export const setLoading = actionCreator('LOADING');
