import { WithStyles } from '@material-ui/core';
import { IUserState } from '../../../reducers/user';
import { styles } from './Component';

export interface IStateProps {
    user: IUserState;
}

export interface IOwnProps {
    /** If true, nav is made transparent and shadowless. */
    transparent?: boolean;
}

export interface IProps
    extends IStateProps,
        IOwnProps,
        WithStyles<typeof styles> {}
