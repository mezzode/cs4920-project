import { combineReducers, Reducer } from 'redux';
<<<<<<< HEAD
import { lists, ListsState } from './displayedLists';
import { entryEditor, EntryEditorState } from './entryEditor';
import { flashMessage, FlashMessageState } from './flashMessage';
import { media, MediaState } from './media';
import { search, SearchState } from './search';
import { user, UserState } from './user';

export interface State {
    lists: ListsState;
    entryEditor: EntryEditorState;
    flashMessage: FlashMessageState;
    media: MediaState;
    search: SearchState;
    user: UserState;
}
=======
import { flashMessage } from './flashMessage';
import { modals } from './modals';
import { user } from './user';
>>>>>>> 3a738746cbb0906da1cdc8beca549945ff139196

export const rootReducer = combineReducers({
    flashMessage,
<<<<<<< HEAD
    lists,
    media,
    search,
=======
    modals,
>>>>>>> 3a738746cbb0906da1cdc8beca549945ff139196
    user,
});

type ReducerState<T> = T extends Reducer<infer S> ? S : never;
export type State = ReducerState<typeof rootReducer>;
