import {
    FormControl,
    FormHelperText,
    IconButton,
    Input,
    MenuItem,
    Select,
    withStyles,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import * as React from 'react';
import { styles } from './styles';
import { Props, Props2 } from './types';

interface State2 {
    name: string;
}

interface Thing extends HTMLElement {
    name: string;
    value: string;
}

class RawSimpleSelect extends React.Component<Props2, State2> {
    constructor(props: Props2) {
        super(props);
        this.state = {
            name: '',
        };
        this.handleChange = this.handleChange.bind(this);
    }

    public handleChange: React.FormEventHandler = event => {
        const target = event.target as Thing;
        this.setState({ name: target.value } as State2);
    };

    public render() {
        return (
            <Select
                value={this.state.name}
                onChange={this.handleChange}
                displayEmpty={true}
                name="genre"
                className={this.props.classes.selectEmpty}
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                <MenuItem value={'Anime'}>Anime</MenuItem>
                <MenuItem value={'Movie'}>Movie</MenuItem>
                <MenuItem value={'TV show'}>TV show</MenuItem>
            </Select>
        );
    }
}

const SimpleSelect = withStyles(styles)(RawSimpleSelect);

// yeah just gonna go with it
// let me check if this is most legit one sec
// kk
const RawSearch: React.SFC<Props> = ({ classes, handleSearch }) => (
    <>
        <form>
            <FormControl className={classes.formControl}>
                <SimpleSelect />
                <FormHelperText>Without label</FormHelperText>
            </FormControl>
        </form>
        <form onSubmit={handleSearch} className={classes.search}>
            <IconButton type="submit">
                <SearchIcon />
            </IconButton>
            <FormControl>
                <Select name="mediaType">
                    <MenuItem value={'All'}>
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={'All'}>All</MenuItem>
                    <MenuItem value={'Anime'}>Anime</MenuItem>
                    <MenuItem value={'Games'}>Games</MenuItem>
                    <MenuItem value={'Shows'}>Shows</MenuItem>
                </Select>
            </FormControl>
            <FormControl>
                <Select displayEmpty={true} name="age">
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
            <select>
                <option value="All">All</option>
                <option value="Anime">Anime</option>
                <option value="Games">Games</option>
                <option value="Shows">Shows</option>
            </select>
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
