import { connect, MapDispatchToProps } from 'react-redux';
import { withRouter } from 'react-router';
// import { setSearch } from '../../actions/search';
import { SearchComponent } from './Component';
import { DispatchProps, OwnProps } from './types';

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = (
    dispatch,
    { history },
) => {
    const handleSearch: React.FormEventHandler = async event => {
        event.preventDefault();
        const data = new FormData(event.target as HTMLFormElement);

        // toDo output Flash message if user did not select it
        // TODO tolower and slugify
        const mediaType = data.get('mediaType');
        const searchString = data.get('searchString');
        if (mediaType === '' || searchString === '') {
            return;
        }

        // dispatch(setSearch({ search: searchString as string }));

        // const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');
        // if (res.ok) {
        //     console.log('search string is');
        //     console.log(data.get('searchString'));
        //     console.log('media type is');
        //     console.log(data.get('mediaType'));
        //     console.log(JSON.stringify(res.json()));
        //     // res.json();
        // }

        history.push(`/search/${mediaType}/${searchString}`);
    };
    return {
        handleSearch,
    };
};

export const SearchContainer = withRouter(
    connect(
        null,
        mapDispatchToProps,
    )(SearchComponent),
);
