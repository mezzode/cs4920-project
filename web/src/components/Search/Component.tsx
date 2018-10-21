import {
    FormControl,
    // FormGroup,
    // IconButton,
    // Input,
    InputBase,
    InputLabel,
    withStyles,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import * as React from 'react';
import { MediaType } from 'src/types';
import { SimpleSelect } from '../common/SimpleSelect';
import { styles } from './styles';
import { Props } from './types';

const RawSearch: React.SFC<Props> = ({ classes, handleSearch }) => (
    <>
        <form className={classes.formRoot} onSubmit={handleSearch}>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="mediaType">Media type</InputLabel>
                <SimpleSelect
                    name="mediaType"
                    options={[
                        {
                            text: 'Movie',
                            value: MediaType.Movie,
                        },
                        {
                            text: 'TV show',
                            value: MediaType.Show,
                        },
                        {
                            text: 'Anime',
                            value: MediaType.Anime,
                        },
                        {
                            text: 'Game',
                            value: MediaType.Game,
                        },
                    ]}
                />
            </FormControl>
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
                <InputBase
                    placeholder="Search…"
                    classes={{
                        input: classes.inputInput,
                        root: classes.inputRoot,
                    }}
                    name={'searchString'}
                />
            </div>
        </form>
    </>
);

export const SearchComponent = withStyles(styles)(RawSearch);
