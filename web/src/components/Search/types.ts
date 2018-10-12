import { WithStyles } from '@material-ui/core';
import { History } from 'history';
import { styles } from './styles';

export interface Props
    extends WithStyles<typeof styles>,
        DispatchProps,
        OwnProps {}

export interface DispatchProps {
    handleSearch: React.FormEventHandler;
}

export interface OwnProps {
    history: History;
}

export interface StateProps {}

export interface State {}
