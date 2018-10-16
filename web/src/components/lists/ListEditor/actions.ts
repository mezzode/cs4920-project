import actionCreatorFactory from 'typescript-fsa';
import { EntryList } from '../../../types';
import { ListEdit } from './types';

const actionCreator = actionCreatorFactory('LIST_EDITOR');

export const openListEditor = actionCreator<EntryList>('OPEN');
export const closeListEditor = actionCreator('CLOSE');
export const updateListEditor = actionCreator<ListEdit>('UPDATE');
