import { WithStyles } from '@material-ui/core';
// import { History } from 'history';
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

export interface OwnProps extends RouteComponentProps<Params> {
    // history: History;
    // location: Location;
    // match: Match;
}

export interface StateProps {}

export interface State {}
