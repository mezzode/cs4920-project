import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    TextField,
} from '@material-ui/core';
import { createStyles, withStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { Props } from './types';

export const styles = createStyles({
    art: {
        objectFit: 'cover',
        width: '100%',
    },
});

// TODO: make this responsively fullscreen using withMobileDialog

const RawEntryEditor: React.SFC<Props> = ({
    entry,
    handleCancel,
    handleInput,
    handleSave,
    classes,
}) => (
    <Dialog
        open={entry !== null}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
    >
        {entry !== null && (
            <>
                <DialogTitle id="form-dialog-title">
                    {entry.media.title}
                </DialogTitle>
                <DialogContent>
                    <Grid container={true} spacing={16}>
                        <Grid item={true} xs={5}>
                            <img
                                className={classes.art}
                                src="https://78.media.tumblr.com/4f30940e947b58fb57e2b8499f460acb/tumblr_okccrbpkDY1rb48exo1_1280.jpg"
                            />
                        </Grid>
                        <Grid
                            item={true}
                            container={true}
                            direction="column"
                            xs={7}
                        >
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
                            <TextField
                                margin="dense"
                                id="progress"
                                label="Progress"
                                type="text"
                                defaultValue={entry.progress}
                                onInput={handleInput}
                            />
                        </Grid>
                    </Grid>
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
