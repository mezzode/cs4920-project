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

export interface Props extends WithStyles<typeof styles>, DispatchProps {
    searchResults: SearchResultMedia[];
}

export interface DispatchProps {
    loadSearchResults: () => void;
}

interface Params {
    searchString: string;
    mediaType: string;
}

export interface OwnProps extends RouteComponentProps<Params> {}

export interface StateProps {}
