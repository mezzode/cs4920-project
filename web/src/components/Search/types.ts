import { WithStyles } from '@material-ui/core';
import { styles } from './styles';

export interface Props
    extends WithStyles<typeof styles>,
        DispatchProps,
        OwnProps {}

export interface DispatchProps {
    handleSearch: React.FormEventHandler;
}

export interface OwnProps {}

export interface StateProps {}

export interface State {}
