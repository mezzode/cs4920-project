import { WithStyles } from '@material-ui/core';
import { styles } from './styles';

export interface Props extends WithStyles<typeof styles> {}

// tslint:disable:no-any
export interface State {
    backgroundImage: string;
    mediaName: string;
    subtext: string;
    index: number;
    intervalId: any;
}
