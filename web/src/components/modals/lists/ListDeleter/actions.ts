import { EntryList } from 'src/types';
import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory('LIST_DELETER');

export const openListDeleter = actionCreator<EntryList>('OPEN');
export const closeListDeleter = actionCreator('CLOSE');
