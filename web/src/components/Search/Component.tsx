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
import { SimpleSelect } from '../common/SimpleSelect';
import { styles } from './styles';
import { Props } from './types';

const RawSearch: React.SFC<Props> = ({ classes, handleSearch }) => (
    <>
        <form className={classes.formRoot} onSubmit={handleSearch}>
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
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="mediaType">Media type</InputLabel>
                <SimpleSelect name={'mediaType'} />
            </FormControl>
        </form>
    </>
);

export const SearchComponent = withStyles(styles)(RawSearch);
