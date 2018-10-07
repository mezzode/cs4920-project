import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { clearFlashMessage } from '../../../actions/flashMessage';
import { State } from '../../../reducers';
import { SnackbarComponent } from './Component';
import { DispatchProps, OwnProps, StateProps } from './types';

const mapStateToProps: MapStateToProps<StateProps, OwnProps, State> = (
    state,
    ownProps,
) => ({
    open: state.flashMessage.showFlashMessage,
    ...ownProps,
});

const mapDispatchToProps: MapDispatchToProps<
    DispatchProps,
    OwnProps
> = dispatch => {
    // tslint:disable:no-any
    const handleClose = (event: any, reason: any) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(clearFlashMessage());
    };
    return {
        handleClose,
    };
};

export const SnackbarContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(SnackbarComponent);
