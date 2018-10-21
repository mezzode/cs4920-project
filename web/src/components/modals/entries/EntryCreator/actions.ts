import { NewEntry } from 'src/types';
import actionCreatorFactory from 'typescript-fsa';

type NewEntrySave = { readonly [field in keyof NewEntry]?: NewEntry[field] };

const actionCreator = actionCreatorFactory('ENTRY_CREATOR');

export const openEntryCreator = actionCreator<NewEntry>('OPEN');
export const closeEntryCreator = actionCreator('CLOSE');
export const saveEntryCreator = actionCreator<NewEntrySave>('SAVE');
// export const addTag = actionCreator<string>('ADD_TAG');
// export const removeTag = actionCreator<string>('REMOVE_TAG');
