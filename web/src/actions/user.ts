import { actionCreatorFactory } from "typescript-fsa";

const actionCreator = actionCreatorFactory('USER');

export const setUser = actionCreator<{readonly displayName: string}>('SET');
export const clearUser = actionCreator('CLEAR');
