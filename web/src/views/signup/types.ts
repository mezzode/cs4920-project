import { WithStyles } from '@material-ui/core';
import { styles } from './styles';

export interface Props extends WithStyles<typeof styles> {
    authAttempt: number;
    handleSubmit: (event: any) => void;
}

export interface DispatchProps {}
export interface OwnProps {}
export interface StateProps {}
