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
    authToken: state.user.authToken,
    profileImage: state.user.displayImage,
    username: state.user.displayName,
});

const mapDispatchToProps: MapDispatchToProps<
    DispatchProps,
    OwnProps
> = dispatch => {
    const dispatchLoadProfile = (displayImage: string) => {
        dispatch(setImage({ displayImage }));
    };

    // TODO: clear flash in react router if user goes to new page
    const handleDispatchUpdateImage = (displayImage: string) => {
        dispatch(setImage({ displayImage }));
        dispatch(setFlashMessage());
    };

    const handleDispatchUpdatePassword = () => {
        dispatch(setFlashMessage());
    };

    return {
        dispatchLoadProfile,
        handleDispatchUpdateImage,
        handleDispatchUpdatePassword,
    };
};

export const ProfileContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProfileComponent);
