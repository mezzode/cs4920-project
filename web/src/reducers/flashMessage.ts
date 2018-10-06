import { Reducer } from 'redux';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { clearFlashMessage, setFlashMessage } from '../actions/flashMessage';

export interface FlashMessageState {
    showFlashMessage: boolean;
}

const initialState: FlashMessageState = {
    showFlashMessage: false,
};

export const flashMessage: Reducer<FlashMessageState> = reducerWithInitialState(
    initialState,
)
    .case(setFlashMessage, state => ({
        ...state,
        showFlashMessage: true,
    }))
    .case(clearFlashMessage, () => ({
        ...initialState,
    }))
    .build();
