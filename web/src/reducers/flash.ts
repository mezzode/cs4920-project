import { Reducer } from 'redux';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { clearFlash, setFlash } from '../actions/flash';

export interface FlashState {
    showFlash: boolean;
}

const initialState: FlashState = {
    showFlash: false,
};

export const flash: Reducer<FlashState> = reducerWithInitialState(initialState)
    .case(setFlash, state => ({
        ...state,
        showFlash: true,
    }))
    .case(clearFlash, state => ({
        ...state,
        ...initialState,
    }))
    .build();
