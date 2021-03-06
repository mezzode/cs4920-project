import { connect, MapStateToProps } from 'react-redux';
import { State } from '../../reducers/index';
import { MediaPageComponent } from './Component';
import { OwnProps, StateProps } from './types';

const mapStateToProps: MapStateToProps<
    StateProps,
    OwnProps,
    State
> = state => ({
    // username: state.user.displayName,
});

// const mapDispatchToProps: MapDispatchToProps<
//     DispatchProps,
//     OwnProps
// > = dispatch => {
//     function loadMediaIntoState() {
//         dispatch();
//     }
//     return {
//         loadMediaIntoState,
//     };
// };

export const MediaContainer = connect(mapStateToProps)(MediaPageComponent);
