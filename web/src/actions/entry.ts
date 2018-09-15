import actionCreatorFactory from 'typescript-fsa';
import { IEntry } from '../types';

type IEntryUpdate = { readonly [field in keyof IEntry]?: IEntry[field] };

const actionCreator = actionCreatorFactory('ENTRY_EDIT');

export const startEntryEdit = actionCreator<IEntry>('START');
export const cancelEntryEdit = actionCreator('CANCEL');
export const updateEntryEdit = actionCreator<IEntryUpdate>('UPDATE');
export const saveEntryEdit = actionCreator.async<void, IEntry, string>('SAVE');
