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
) => ({
    handleSubmit: (username: string, password: string) => async () => {
        const data = { password, username };

        const res = await fetch(
            `${process.env.REACT_APP_API_BASE}/authenticate`,
            {
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                },
                // credentials: 'include',
                method: 'post',
                // mode: 'cors',
            },
        );
        if (res.ok) {
            const user = await res.json();
            dispatch(
                setUser({
                    authToken: user.authToken,
                    displayName: user.username,
                }),
            );
            dispatch(clearAuthAttempts());
            history.push('/');
        } else {
            dispatch(incrementAuthAttempt());
            dispatch(setFlashMessage());
        }
    },
});

export const LoginContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(LoginComponent);
