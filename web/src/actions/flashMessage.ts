import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory('FLASH_MESSAGE');

export const setFlashMessage = actionCreator('SET');
export const clearFlashMessage = actionCreator('CLEAR');
