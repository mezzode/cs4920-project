import { WithStyles } from '@material-ui/core';
import { RouteComponentProps } from 'react-router';
import { MediaType } from '../../types';
import { styles } from './styles';

export interface SearchResultMedia {
    id: string;
    mediaType: MediaType;
    title: string;
    description: string;
    image: string;
}

export interface Props
    extends WithStyles<typeof styles>,
        DispatchProps,
        RouteComponentProps<Params> {
    searchResults: SearchResultMedia[];
    totalResults: number;
    isLoading: boolean;
}

export interface State {
    page: number;
}

export interface DispatchProps {
    loadSearchResults: (
        mediaType: string,
        searchString: string,
        pageNumber: number,
    ) => void;
    clearSearchResults: () => void;
}

interface Params {
    searchString: string;
    mediaType: string;
}

export interface OwnProps {}

export interface StateProps {}
