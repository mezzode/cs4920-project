import { actionCreatorFactory } from 'typescript-fsa';

const actionCreator = actionCreatorFactory('USER');

export const setUser = actionCreator<{
    readonly displayImage: any;
    readonly displayName: string;
}>('SET');
export const clearUser = actionCreator('CLEAR');
