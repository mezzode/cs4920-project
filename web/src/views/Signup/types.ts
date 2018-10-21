import { WithStyles } from '@material-ui/core';
import { RouteComponentProps } from 'react-router-dom';
import { styles } from './styles';

export interface Props extends WithStyles<typeof styles> {
    authAttempt: number;
    handleSubmit: React.FormEventHandler;
}

export interface DispatchProps {}
interface Params {}
export interface OwnProps extends RouteComponentProps<Params> {}
export interface StateProps {}
