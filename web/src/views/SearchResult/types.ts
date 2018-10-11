import { WithStyles } from '@material-ui/core';
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
    handleClick: () => void;
}
export interface OwnProps {}
