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
                name="searchMediaType"
                className={this.props.classes.selectEmpty}
            >
                <MenuItem value={'All'}>
                    <em>All</em>
                </MenuItem>
                <MenuItem value={'Anime'}>Anime</MenuItem>
                <MenuItem value={'Movie'}>Movie</MenuItem>
                <MenuItem value={'TV show'}>TV show</MenuItem>
            </Select>
        );
    }
}

const SimpleSelect = withStyles(styles)(RawSimpleSelect);

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
                <SimpleSelect />
            </FormControl>
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
