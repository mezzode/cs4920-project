import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { clearFlash } from '../../../actions/flash';
import { State } from '../../../reducers';
import { SnackbarComponent } from './Component';
import { DispatchProps, OwnProps, StateProps } from './types';

const mapStateToProps: MapStateToProps<StateProps, OwnProps, State> = (
    state,
    ownProps,
) => ({
    open: state.flash.showFlash,
    ...ownProps,
});

const mapDispatchToProps: MapDispatchToProps<
    DispatchProps,
    OwnProps
> = dispatch => {
    const handleClose = (event: any, reason: any) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(clearFlash());
    };
    return {
        handleClose,
    };
};

export const SnackbarContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(SnackbarComponent);
