import { WithStyles } from '@material-ui/core';
import { styles } from './styles';

export interface Props extends WithStyles<typeof styles> {
    showFail: boolean;
    handleSubmit: (event: any) => void;
}

export interface DispatchProps {}
export interface OwnProps {
    history: any;
}
export interface StateProps {}
