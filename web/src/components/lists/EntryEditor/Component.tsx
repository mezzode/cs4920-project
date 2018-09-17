import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    TextField,
    withWidth,
} from '@material-ui/core';
import { createStyles, withStyles } from '@material-ui/core/styles';
import { isWidthDown, isWidthUp } from '@material-ui/core/withWidth';
import * as React from 'react';
import { Props } from './types';

export const styles = createStyles({
    art: {
        objectFit: 'cover',
        width: '100%',
    },
});

const RawEntryEditor: React.SFC<Props> = ({
    entry,
    handleCancel,
    handleInput,
    handleSave,
    classes,
    width,
}) => (
    <Dialog
        open={entry !== null}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
        fullScreen={isWidthDown('sm', width)}
    >
        {entry !== null && (
            <>
                <DialogTitle id="form-dialog-title">
                    {entry.media.title}
                </DialogTitle>
                <DialogContent>
                    <Grid container={true} spacing={16}>
                        <Grid
                            item={true}
                            container={true}
                            direction="column"
                            sm={7}
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
                        {isWidthUp('xs', width, false) && (
                            <Grid item={true} sm={5}>
                                <img
                                    className={classes.art}
                                    src="https://78.media.tumblr.com/4f30940e947b58fb57e2b8499f460acb/tumblr_okccrbpkDY1rb48exo1_1280.jpg"
                                />
                            </Grid>
                        )}
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

export const EntryEditorComponent = withWidth()(
    withStyles(styles)(RawEntryEditor),
);
