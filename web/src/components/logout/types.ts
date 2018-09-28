export interface Props extends DispatchProps, OwnProps {}

export interface DispatchProps {
    handleLogout: () => void;
}
// tslint:disable:no-any
export interface OwnProps {
    component: any;
}
export interface StateProps {}

export interface State {}
