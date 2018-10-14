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
        const res = await fetch(`${process.env.REACT_APP_API_BASE}/logout`);
        if (res.ok) {
            dispatch(clearUser());
            localStorage.clear();
        }
    };
    return {
        handleLogout,
    };
};

export const LogoutContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(LogoutComponent);
