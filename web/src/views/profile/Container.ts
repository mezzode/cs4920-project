import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';

import { setFlash } from '../../actions/flash';
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

    // tslint:disable:no-any
    const handleUpdateImage = async (event: any) => {
        event.preventDefault();
        const data = new FormData(event.target);

        const res = await fetch('/update-profile-image', {
            body: data,
            method: 'post',
        });

        if (res.ok) {
            const imageBlob = await res.blob();
            const displayImage = URL.createObjectURL(imageBlob);
            dispatch(setImage({ displayImage }));
            dispatch(setFlash());
        }
    };

    // tslint:disable:no-any
    const handleUpdatePassword = async (event: any) => {
        event.preventDefault();
        const data = new FormData(event.target);

        const res = await fetch('/update-password', {
            body: data,
            method: 'post',
        });

        if (res.ok) {
            dispatch(setFlash());
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
