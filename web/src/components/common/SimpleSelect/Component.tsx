import { MenuItem, Select, withStyles } from '@material-ui/core';
import * as React from 'react';
import { styles } from './styles';
import { FormEventTarget, Props, State } from './types';

class RawSimpleSelect extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            name: '',
        };
        this.handleChange = this.handleChange.bind(this);
    }

    public handleChange: React.FormEventHandler = event => {
        const target = event.target as FormEventTarget;
        this.setState({ name: target.value } as State);
    };

    public render() {
        const { options } = this.props;
        return (
            <Select
                value={this.state.name}
                onChange={this.handleChange}
                inputProps={{
                    id: 'mediaType',
                    name: this.props.name,
                }}
            >
                {options.map(option => (
                    <MenuItem value={option.value}>{option.text}</MenuItem>
                ))}
                {/* <MenuItem value={MediaType.Movie}>Movie</MenuItem>
                <MenuItem value={MediaType.Show}>TV show</MenuItem>
                <MenuItem value={MediaType.Anime}>Anime</MenuItem>
                <MenuItem value={MediaType.Game}>Game</MenuItem> */}
            </Select>
        );
    }
}

export const SimpleSelectComponent = withStyles(styles)(RawSimpleSelect);
