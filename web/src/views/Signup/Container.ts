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
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = (
    dispatch,
    { history },
) => {
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
            dispatch(setUser({ displayName: user.username }));
            dispatch(clearAuthAttempts());
            history.push('/');
        } else {
            dispatch(incrementAuthAttempt());
        }
    };

    return {
        handleSubmit,
    };
};

export const SignUpContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(SignUpComponent);
