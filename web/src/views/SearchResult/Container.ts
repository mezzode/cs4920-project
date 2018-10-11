import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { setFlashMessage } from '../../actions/flashMessage';
import { setMedia } from '../../actions/media';
import { State } from '../../reducers/index';
import { SearchResultComponent } from './Component';
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
    const handleClick = async event => {
        const res = await fetch(`api-url`, {
            body: data,
            method: 'post',
        });
        if (res.ok) {
            const media = await res.json();
            dispatch(setMedia({ media }));
            dispatch(clearAuthAttempts());
            history.push('/dashboard');
        } else {
            console.log('fail');
            dispatch(incrementAuthAttempt());
            dispatch(setFlashMessage());
            // flash retry
        }
        console.log(data);
        console.log(res);
    };

    return {
        handleSubmit,
    };
};

export const SearchResultContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(SearchResultComponent);
