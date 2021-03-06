import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { State } from 'src/reducers/index';
import { closeListDeleter } from './actions';
import { ListDeleterComponent } from './Component';
import { DispatchProps, OwnProps, StateProps } from './types';

const mapStateToProps: MapStateToProps<
    StateProps,
    OwnProps,
    State
> = state => ({
    authToken: state.user.authToken,
    list: state.modals.listDeleter.list,
});

const mapDispatchToProps: MapDispatchToProps<
    DispatchProps,
    OwnProps
> = dispatch => ({
    close: () => {
        dispatch(closeListDeleter());
    },
});

export const ListDeleterContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(ListDeleterComponent);
