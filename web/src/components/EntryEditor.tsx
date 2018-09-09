import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, WithStyles } from "@material-ui/core";
import { createStyles, withStyles } from "@material-ui/core/styles";
import * as React from "react";
import { IEntry } from "./List";

const styles = createStyles({});

interface IProps extends WithStyles<typeof styles> {
    entry: IEntry|null;
    handleCancel: () => void;
    handleInput: (field: keyof IEntry) => React.FormEventHandler;
    handleSave: () => void;
}

const RawEntryEditor: React.SFC<IProps> = ({
    entry,
    handleCancel,
    handleInput,
    handleSave
}) => (
    <Dialog open={entry !== null} aria-labelledby="form-dialog-title">
        {entry !== null && (
            <>
                <DialogTitle id="form-dialog-title">{entry.title}</DialogTitle>
                <DialogContent>
                    {/* TODO: add cover art*/}
                    <TextField
                        margin="dense"
                        id="rating"
                        label="Rating"
                        type="number"
                        defaultValue={entry.rating}
                        onInput={handleInput("rating")}
                    />
                    <TextField
                        margin="dense"
                        id="started"
                        label="Started"
                        type=""
                        defaultValue={entry.started}
                        onInput={handleInput("started")}
                    />
                    <TextField
                        margin="dense"
                        id="finished"
                        label="Finished"
                        type="text"
                        defaultValue={entry.finished}
                        onInput={handleInput("finished")}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </>
        )}
    </Dialog>
);

export const EntryEditor = withStyles(styles)(RawEntryEditor);
export default EntryEditor;
