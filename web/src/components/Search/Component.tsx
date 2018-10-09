import {
    IconButton,
    Input,
    MenuItem,
    Select,
    withStyles,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import * as React from 'react';
import { styles } from './styles';
import { Props } from './types';

const RawSearch: React.SFC<Props> = ({ classes, handleSearch }) => (
    <>
        <form onSubmit={handleSearch} className={classes.search}>
            <IconButton type="submit">
                <SearchIcon />
            </IconButton>
            <Select name="mediaType">
                <MenuItem value={'All'}>All</MenuItem>
                <MenuItem value={'Anime'}>Anime</MenuItem>
                <MenuItem value={'Games'}>Games</MenuItem>
                <MenuItem value={'Shows'}>Shows</MenuItem>
            </Select>
            <Input
                name="searchString"
                placeholder="Search"
                classes={{
                    root: classes.inputRoot,
                }}
            />
        </form>
    </>
);

export const SearchComponent = withStyles(styles)(RawSearch);
