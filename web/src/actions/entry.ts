import actionCreatorFactory from 'typescript-fsa';
import { Entry } from '../types';

type EntryUpdate = { readonly [field in keyof Entry]?: Entry[field] };

const actionCreator = actionCreatorFactory('ENTRY_EDITOR');

export const startEntryEdit = actionCreator<Entry>('START');
export const closeEntryEditor = actionCreator('CLOSE');
export const updateEntryEdit = actionCreator<EntryUpdate>('UPDATE');
export const saveEntryEdit = actionCreator.async<void, Entry, string>('SAVE');
