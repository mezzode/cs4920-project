import { WithStyles } from '@material-ui/core';
import { History } from 'history';
import { styles } from './styles';

export interface Props extends WithStyles<typeof styles> {
    showFail: boolean;
    handleSubmit: React.FormEventHandler;
}

export interface DispatchProps {}
export interface OwnProps {
    history: History;
}
export interface StateProps {}
