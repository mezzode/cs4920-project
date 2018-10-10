import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { loadUserLists } from '../../../actions/list';
import { State } from '../../../reducers/index';
import { UserListsComponent } from './Component';
import { DispatchProps, OwnProps, StateProps } from './types';

export const mapStateToProps: MapStateToProps<StateProps, OwnProps, State> = (
    { lists, user: { displayName } },
    { match },
) => ({
    editable: displayName === match.params.username,
    lists:
        lists &&
        Object.keys(lists)
            .map(k => lists[k])
            .filter(({ username }) => username === match.params.username),
});

export const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = (
    dispatch: ThunkDispatch<State, void, Action>,
    { match },
) => ({
    loadLists: () => {
        const { username, mediaType } = match.params;
        dispatch(loadUserLists(username, mediaType));
    },
});

export const UserListsContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(UserListsComponent);
