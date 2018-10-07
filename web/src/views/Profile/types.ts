import { WithStyles } from '@material-ui/core';
import { styles } from './styles';

export interface Props
    extends WithStyles<typeof styles>,
        DispatchProps,
        StateProps {}

export interface DispatchProps {
    handleUpdateImage: React.FormEventHandler;
    handleUpdatePassword: React.FormEventHandler;
    loadProfile: () => void;
}
export interface OwnProps {}
export interface StateProps {
    profileImage: string | null;
    username: string | null;
}
