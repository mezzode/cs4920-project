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
import { Entry } from 'src/types';
import { Props } from './types';

export const styles = createStyles({
    art: {
        objectFit: 'cover',
        width: '100%',
    },
});

const RawEntryEditor: React.SFC<Props> = ({
    afterEdit,
    close,
    entry,
    input,
    classes,
    width,
}) => {
    async function save() {
        if (entry === null) {
            throw new Error('Cannot save if not loaded');
        }
        const { finished, rating, started, entryCode } = entry;
        const entryEdit = {
            finished,
            // progress, // TODO: add progress to backend
            rating,
            started,
        };

        const res = await fetch(
            `${process.env.REACT_APP_API_BASE}/entry/${entryCode}`,
            {
                body: JSON.stringify(entryEdit),
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
            },
        );
        if (res.status >= 400) {
            throw new Error(`${res.status} ${res.statusText}`);
        }
        const editedEntry: Entry = await res.json();
        if (afterEdit) {
            afterEdit(editedEntry);
        }
        close();
    }

    return (
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
                                    variant="outlined"
                                    margin="dense"
                                    id="rating"
                                    label="Rating"
                                    type="number"
                                    value={entry.rating}
                                    onInput={input}
                                />
                                {/* TODO: date input restrictions/formatter */}
                                <TextField
                                    variant="outlined"
                                    margin="dense"
                                    id="started"
                                    label="Started"
                                    type=""
                                    value={entry.started}
                                    onInput={input}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="dense"
                                    id="finished"
                                    label="Finished"
                                    type="text"
                                    value={entry.finished}
                                    onInput={input}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="dense"
                                    id="progress"
                                    label="Progress"
                                    type="text"
                                    value={entry.progress}
                                    onInput={input}
                                />
                            </Grid>
                            {isWidthUp('xs', width, false) && (
                                <Grid item={true} sm={5}>
                                    <img
                                        className={classes.art}
                                        src={entry.media.artUrl}
                                    />
                                </Grid>
                            )}
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={close} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={save} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </>
            )}
        </Dialog>
    );
};

export const EntryEditorComponent = withWidth()(
    withStyles(styles)(RawEntryEditor),
);