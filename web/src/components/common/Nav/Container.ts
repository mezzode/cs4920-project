import { connect, MapStateToProps } from 'react-redux';
import { State } from '../../../reducers';
import { NavComponent } from './Component';
import { OwnProps, StateProps } from './types';

const mapStateToProps: MapStateToProps<
    StateProps,
    OwnProps,
    State
> = state => ({
    user: state.user,
});

export const NavContainer = connect(mapStateToProps)(NavComponent);
