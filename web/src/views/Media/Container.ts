import { connect, MapStateToProps } from 'react-redux';
import { State } from '../../reducers/index';
import { MediaPageComponent } from './Component';
import { OwnProps, StateProps } from './types';

const mapStateToProps: MapStateToProps<
    StateProps,
    OwnProps,
    State
> = state => ({
    showFail: state.flashMessage.showFlashMessage,
});

export const MediaContainer = connect(mapStateToProps)(MediaPageComponent);
