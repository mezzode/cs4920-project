import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { setFlash } from '../../actions/flash';
import {
    clearAuthAttempts,
    incrementAuthAttempt,
    setUser,
} from '../../actions/user';
import { State } from '../../reducers/index';
import { LoginComponent } from './Component';
import { DispatchProps, OwnProps, StateProps } from './types';

const mapStateToProps: MapStateToProps<
    StateProps,
    OwnProps,
    State
> = state => ({
    showFail: state.flash.showFlash,
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = (
    dispatch,
    { history },
) => {
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const data = new FormData(event.target);

        const res = await fetch('/login', {
            body: data,
            method: 'post',
        });
        if (res.ok) {
            console.log('success');
            const user = await res.json();
            dispatch(setUser({ displayName: user.username }));
            dispatch(clearAuthAttempts());
            history.push('/dashboard');
        } else {
            console.log('fail');
            dispatch(incrementAuthAttempt());
            dispatch(setFlash());
            // flash retry
        }
        console.log(data);
        console.log(res);
    };

    return {
        handleSubmit,
    };
};

export const LoginContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(LoginComponent);
