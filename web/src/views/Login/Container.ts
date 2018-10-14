import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { setFlashMessage } from '../../actions/flashMessage';
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
    showFail: state.flashMessage.showFlashMessage,
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = (
    dispatch,
    { history },
) => {
    const handleSubmit: React.FormEventHandler = async event => {
        event.preventDefault();
        const data = new FormData(event.target as HTMLFormElement);

        const res = await fetch(`${process.env.REACT_APP_API_BASE}/login`, {
            body: data,
            method: 'post',
        });
        if (res.ok) {
            const user = await res.json();
            dispatch(setUser({ displayName: user.username }));
            dispatch(clearAuthAttempts());

            localStorage.setItem('displayName', user.username);

            history.push('/dashboard');
        } else {
            dispatch(incrementAuthAttempt());
            dispatch(setFlashMessage());
        }
    };

    return {
        handleSubmit,
    };
};

export const LoginContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(LoginComponent);
