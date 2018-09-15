import { connect, MapStateToProps } from 'react-redux';
import { IState } from '../../../reducers';
import { NavComponent } from './Component';
import { IOwnProps, IStateProps } from './types';

const mapStateToProps: MapStateToProps<
    IStateProps,
    IOwnProps,
    IState
> = state => ({
    user: state.user,
});

export const NavContainer = connect(mapStateToProps)(NavComponent);
