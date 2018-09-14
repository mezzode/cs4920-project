import { IEntry } from "../List";
import { WithStyles } from "@material-ui/core";
import { styles } from "./Component";

export interface IStateProps {
    entry: IEntry | null;
}

export interface IDispatchProps {
    handleInput: React.FormEventHandler;
    handleCancel: () => void;
    handleSave: () => void;
}

export interface IOwnProps {}

export interface IProps
    extends WithStyles<typeof styles>,
        IDispatchProps,
        IStateProps,
        IOwnProps {}
