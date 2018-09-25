import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory('FLASH');

export const setFlash = actionCreator('SET');
export const clearFlash = actionCreator('CLEAR');
