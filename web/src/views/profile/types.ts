import { WithStyles } from '@material-ui/core';
import { styles } from './styles';

export interface Props
    extends WithStyles<typeof styles>,
        DispatchProps,
        StateProps {}

export interface DispatchProps {
    // tslint:disable:no-any
    handleUpdateImage: (event: any) => void;
    handleUpdatePassword: (event: any) => void;
    loadProfile: () => void;
}
export interface OwnProps {}
export interface StateProps {
    profileImage: string | null;
    username: string | null;
}
