import { WithStyles } from '@material-ui/core';
import { styles } from './styles';

export interface State {
    name: string;
}

export interface FormEventTarget extends HTMLElement {
    name: string;
    value: string;
}

export interface Props extends WithStyles<typeof styles> {
    name: string;
}
