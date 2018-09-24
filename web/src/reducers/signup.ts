// import { Reducer } from 'redux';
// import { reducerWithInitialState } from 'typescript-fsa-reducers';
// import { addFiles } from '../actions/users';

// interface SignUpState {
//     files: File[];
// }

// const initialState: SignUpState = {
//     files: [],
// };

// export const entryEditor: Reducer<SignUpState> = reducerWithInitialState(
//     initialState,
// )
//     .case(addFiles, (state, file: File) => ({
//         ...state,
//         files: [...state.files, file],
//     }))
//     .case(updateEntryEdit, (state, entryUpdate) => {
//         if (state.entry === null || state.status === Status.closed) {
//             throw new Error('Trying to update editor while editor is not open');
//         }
//         return {
//             entry: { ...state.entry, ...entryUpdate },
//             status: state.status,
//         };
//     })
//     .cases([saveEntryEdit.done, cancelEntryEdit], () => initialState)
//     .build();
