export interface Props extends DispatchProps, OwnProps {}

export interface DispatchProps {
    handleLogout: () => void;
}

export interface OwnProps {
    component: React.ComponentType;
}

export interface StateProps {}

export interface State {}
