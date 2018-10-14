import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import {
    clearAuthAttempts,
    incrementAuthAttempt,
    setUser,
} from '../../actions/user';
import { State } from '../../reducers/index';
import { SignUpComponent } from './Component';
import { DispatchProps, OwnProps, StateProps } from './types';

const mapStateToProps: MapStateToProps<
    StateProps,
    OwnProps,
    State
> = state => ({
    authAttempt: state.user.authAttempt,
    isAuthenticated: state.user.isAuthenticated,
});

const mapDispatchToProps: MapDispatchToProps<
    DispatchProps,
    OwnProps
> = dispatch => {
    const handleSubmit: React.FormEventHandler = async event => {
        event.preventDefault();
        const data = new FormData(event.target as HTMLFormElement);

        const res = await fetch(`${process.env.REACT_APP_API_BASE}/sign-up`, {
            body: data,
            credentials: 'include',
            method: 'post',
            mode: 'cors',
        });
        const user = await res.json();
        if (res.ok) {
            console.log('success');
            dispatch(setUser({ displayName: user.username }));
            dispatch(clearAuthAttempts());
        } else {
            console.log('fail');
            dispatch(incrementAuthAttempt());
        }
        console.log(data);
        console.log(res);
    };

    return {
        handleSubmit,
    };
};

export const SignUpContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(SignUpComponent);
