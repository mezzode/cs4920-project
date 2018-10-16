import actionCreatorFactory from 'typescript-fsa';
import { EntryList } from '../../../types';

const actionCreator = actionCreatorFactory('LIST_DELETER');

export const openListDeleter = actionCreator<EntryList>('OPEN');
export const closeListDeleter = actionCreator('CLOSE');
