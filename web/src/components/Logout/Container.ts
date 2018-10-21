import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { clearUser } from '../../actions/user';
import { LogoutComponent } from './Component';
import { DispatchProps, OwnProps, State, StateProps } from './types';

const mapStateToProps: MapStateToProps<StateProps, OwnProps, State> = (
    _,
    { component },
) => ({
    component,
});

const mapDispatchToProps: MapDispatchToProps<
    DispatchProps,
    OwnProps
> = dispatch => {
    const handleLogout = async () => {
        dispatch(clearUser());
    };
    return {
        handleLogout,
    };
};

export const LogoutContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(LogoutComponent);
