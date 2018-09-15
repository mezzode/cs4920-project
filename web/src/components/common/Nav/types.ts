import { WithStyles } from '@material-ui/core';
import { UserState } from '../../../reducers/user';
import { styles } from './Component';

export interface StateProps {
    user: UserState;
}

export interface OwnProps {
    /** If true, nav is made transparent and shadowless. */
    transparent?: boolean;
}

export interface Props
    extends StateProps,
        OwnProps,
        WithStyles<typeof styles> {}
