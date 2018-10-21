import { WithStyles } from '@material-ui/core';
import { RouteComponentProps } from 'react-router';
import { Anime, Game, Movie, TV } from 'src/types';
import { styles } from './styles';

interface Params {
    mediaType: string;
    id: string;
}

export interface OwnProps extends RouteComponentProps<Params> {
    username: string;
}

export interface StateProps {}

export interface DispatchProps {}

export interface Props
    extends WithStyles<typeof styles>,
        OwnProps,
        StateProps,
        DispatchProps {}

export interface State {
    media: Game | Movie | TV | Anime | null;
    isLoading: boolean;
}
