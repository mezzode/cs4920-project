import { Entry } from 'src/types';
import actionCreatorFactory from 'typescript-fsa';

type EntryUpdate = { readonly [field in keyof Entry]?: Entry[field] };

const actionCreator = actionCreatorFactory('ENTRY_EDITOR');

export const openEntryEditor = actionCreator<Entry>('OPEN');
export const closeEntryEditor = actionCreator('CLOSE');
export const updateEntryEditor = actionCreator<EntryUpdate>('UPDATE');
