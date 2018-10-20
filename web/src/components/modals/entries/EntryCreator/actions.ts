import { Entry } from 'src/types';
import actionCreatorFactory from 'typescript-fsa';

type EntrySave = { readonly [field in keyof Entry]?: Entry[field] };

const actionCreator = actionCreatorFactory('ENTRY_CREATOR');

export const openEntryCreator = actionCreator<Entry>('OPEN');
export const closeEntryCreator = actionCreator('CLOSE');
export const saveEntryCreator = actionCreator<EntrySave>('SAVE');
// export const addTag = actionCreator<string>('ADD_TAG');
// export const removeTag = actionCreator<string>('REMOVE_TAG');
