import { connect, MapDispatchToProps } from 'react-redux';
import { setSearch } from '../../actions/search';
import { SearchComponent } from './Component';
import { DispatchProps, OwnProps } from './types';

const mapDispatchToProps: MapDispatchToProps<
    DispatchProps,
    OwnProps
> = dispatch => {
    const handleSearch: React.FormEventHandler = async event => {
        event.preventDefault();
        const data = new FormData(event.target as HTMLFormElement);

        // toDo output Flash message if user did not select it
        if (data.get('media-type') === '') {
            return;
        }

        if (data.get('searchString') === '') {
            return;
        }
        const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');
        if (res.ok) {
            console.log('search string is');
            console.log(data.get('searchString'));
            console.log('media type is');
            console.log(data.get('mediaType'));
            dispatch(setSearch({ search: data.get('searchString') as string }));
            console.log(JSON.stringify(res.json()));
            // res.json();
        }
    };
    return {
        handleSearch,
    };
};

export const SearchContainer = connect(
    null,
    mapDispatchToProps,
)(SearchComponent);
