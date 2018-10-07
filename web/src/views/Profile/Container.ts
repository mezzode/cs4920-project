import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';

import { setFlashMessage } from '../../actions/flashMessage';
import { setImage } from '../../actions/user';
import { State } from '../../reducers/index';
import { ProfileComponent } from './Component';
import { DispatchProps, OwnProps, StateProps } from './types';

const mapStateToProps: MapStateToProps<
    StateProps,
    OwnProps,
    State
> = state => ({
    profileImage: state.user.displayImage,
    username: state.user.displayName,
});

const mapDispatchToProps: MapDispatchToProps<
    DispatchProps,
    OwnProps
> = dispatch => {
    const loadProfile = async () => {
        const res = await fetch('/profile');
        if (res.ok) {
            const imageBlob = await res.blob();
            const displayImage = URL.createObjectURL(imageBlob);
            dispatch(setImage({ displayImage }));
        }
    };

    // TODO: clear flash in react router if user goes to new page
    const handleUpdateImage: React.FormEventHandler = async event => {
        event.preventDefault();
        const data = new FormData(event.target as HTMLFormElement);

        const res = await fetch('/update-profile-image', {
            body: data,
            method: 'post',
        });

        if (res.ok) {
            const imageBlob = await res.blob();
            const displayImage = URL.createObjectURL(imageBlob);
            dispatch(setImage({ displayImage }));
            dispatch(setFlashMessage());
        }
    };

    const handleUpdatePassword: React.FormEventHandler = async event => {
        event.preventDefault();
        const data = new FormData(event.target as HTMLFormElement);

        const res = await fetch('/update-password', {
            body: data,
            method: 'post',
        });

        if (res.ok) {
            dispatch(setFlashMessage());
        }
    };

    return {
        handleUpdateImage,
        handleUpdatePassword,
        loadProfile,
    };
};

export const ProfileContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProfileComponent);
