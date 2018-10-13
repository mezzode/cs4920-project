import { WithStyles } from '@material-ui/core';
import { RouteComponentProps } from 'react-router';
import { styles } from './styles';

export interface SearchResultMedia {
    id: string;
    mediaType: string;
    title: string;
    description: string;
    artUrl: string;
}

export interface Props
    extends WithStyles<typeof styles>,
        DispatchProps,
        RouteComponentProps<Params> {
    searchResults: SearchResultMedia[];
}

export interface State {
    page: number;
}

export interface DispatchProps {
    loadSearchResults: (mediaType: string, searchString: string) => void;
}

interface Params {
    searchString: string;
    mediaType: string;
}

export interface OwnProps {}

export interface StateProps {}
