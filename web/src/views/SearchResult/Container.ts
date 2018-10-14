import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
// import { setFlashMessage } from '../../actions/flashMessage';
import { clearMedias, setMedias } from '../../actions/media';
import { State } from '../../reducers/index';
import { MediaType } from '../../types';
import { SearchResultComponent } from './Component';
import { DispatchProps, OwnProps, StateProps } from './types';

const makeMediaRequest = async (
    mediaType: string,
    searchString: string,
    pageNumber: number,
) => {
    const res = await fetch(`${process.env.REACT_APP_API_BASE}/${mediaType}`, {
        body: JSON.stringify({ searchString, pageNumber }),
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
    });
    console.log(JSON.stringify(res));
    return res.json();
};

const mapStateToProps: MapStateToProps<
    StateProps,
    OwnProps,
    State
> = state => ({
    searchResults: state.media.medias,
    showFail: state.flashMessage.showFlashMessage,
    totalResults: state.media.totalResults,
});

const mapDispatchToProps: MapDispatchToProps<
    DispatchProps,
    OwnProps
> = dispatch => {
    const loadSearchResults = async (
        mediaType: string,
        searchString: string,
        pageNumber: number,
    ) => {
        if (
            mediaType === MediaType.movie ||
            mediaType === MediaType.tvshow ||
            mediaType === MediaType.anime ||
            mediaType === MediaType.game
        ) {
            const pageNumberForServer = pageNumber + 1;
            console.log(pageNumberForServer);
            const mediaResult = await makeMediaRequest(
                mediaType,
                searchString,
                pageNumberForServer,
            );
            console.log(JSON.stringify(mediaResult));
            dispatch(
                setMedias({
                    medias: mediaResult.media,
                    totalResults: mediaResult.totalResults,
                }),
            );
        }
        // else {
        //     return;
        // }
        // console.log(mediaType);
        // console.log(searchString);
        // const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');
        // if (res.ok) {
        //     const contents = await res.json();
        //     dispatch(setMedias(contents));
        // }
    };

    const clearSearchResults = () => {
        dispatch(clearMedias());
    };

    // const handleClick = async event => {
    //     const res = await fetch(`api-url`, {
    //         body: data,
    //         method: 'post',
    //     });
    //     if (res.ok) {
    //         const media = await res.json();
    //         dispatch(setMedia({ media }));
    //         // dispatch(clearAuthAttempts());
    //         // history.push('/dashboard');
    //     } else {
    //         console.log('fail');
    //         // dispatch(incrementAuthAttempt());
    //         dispatch(setFlashMessage());
    //         // flash retry
    //     }
    //     console.log(data);
    //     console.log(res);
    // };

    return {
        clearSearchResults,
        loadSearchResults,
        // handleClick,
    };
};

export const SearchResultContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(SearchResultComponent);
