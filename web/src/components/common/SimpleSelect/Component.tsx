import { MenuItem, Select, withStyles } from '@material-ui/core';
import * as React from 'react';
import { MediaType } from '../../../types';
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
        return (
            <Select
                value={this.state.name}
                onChange={this.handleChange}
                inputProps={{
                    id: 'mediaType',
                    name: this.props.name,
                }}
            >
                <MenuItem value={MediaType.movie}>Movie</MenuItem>
                <MenuItem value={MediaType.tvshow}>TV show</MenuItem>
                <MenuItem value={MediaType.anime}>Anime</MenuItem>
                <MenuItem value={MediaType.game}>Game</MenuItem>
            </Select>
        );
    }
}

export const SimpleSelectComponent = withStyles(styles)(RawSimpleSelect);
