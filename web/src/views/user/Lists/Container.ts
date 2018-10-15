import { connect, MapStateToProps } from 'react-redux';
import { State } from '../../../reducers/index';
import { UserListsComponent } from './Component';
import { OwnProps, StateProps } from './types';

export const mapStateToProps: MapStateToProps<StateProps, OwnProps, State> = (
    { user: { displayName } },
    { match },
) => ({
    editable: displayName === match.params.username,
});

export const UserListsContainer = connect(mapStateToProps)(UserListsComponent);
