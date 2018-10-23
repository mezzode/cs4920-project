import { WithStyles } from '@material-ui/core';
import { styles } from './styles';

export interface Props
    extends WithStyles<typeof styles>,
        DispatchProps,
        StateProps {}

export interface DispatchProps {
    handleDispatchUpdateImage: (displayImage: string) => void;
    handleDispatchUpdatePassword: () => void;
    dispatchLoadProfile: (displayImage: string) => void;
}
export interface OwnProps {}
export interface StateProps {
    authToken: string | null;
    profileImage: string | null;
    username: string | null;
}
