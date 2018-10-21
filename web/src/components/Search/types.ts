import { WithStyles } from '@material-ui/core';
import { RouteComponentProps } from 'react-router-dom';
import { styles } from './styles';

export interface Props
    extends WithStyles<typeof styles>,
        DispatchProps,
        OwnProps {}

export interface DispatchProps {
    handleSearch: React.FormEventHandler;
}

interface Params {}

export interface OwnProps extends RouteComponentProps<Params> {}

export interface StateProps {}

export interface State {}
