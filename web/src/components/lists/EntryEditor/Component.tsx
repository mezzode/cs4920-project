import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from "@material-ui/core";
import { createStyles, withStyles } from "@material-ui/core/styles";
import * as React from "react";
import { IProps } from "./types";

export const styles = createStyles({});

const RawEntryEditor: React.SFC<IProps> = ({
    entry,
    handleCancel,
    handleInput,
    handleSave,
}) => (
    <Dialog open={entry !== null} aria-labelledby="form-dialog-title">
        {entry !== null && (
            <>
                <DialogTitle id="form-dialog-title">{entry.media.title}</DialogTitle>
                <DialogContent>
                    {/* TODO: add cover art*/}
                    <TextField
                        margin="dense"
                        id="rating"
                        label="Rating"
                        type="number"
                        defaultValue={entry.rating}
                        onInput={handleInput}
                    />
                    <TextField
                        margin="dense"
                        id="started"
                        label="Started"
                        type=""
                        defaultValue={entry.started}
                        onInput={handleInput}
                    />
                    <TextField
                        margin="dense"
                        id="finished"
                        label="Finished"
                        type="text"
                        defaultValue={entry.finished}
                        onInput={handleInput}
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

export const EntryEditorComponent = withStyles(styles)(RawEntryEditor);
