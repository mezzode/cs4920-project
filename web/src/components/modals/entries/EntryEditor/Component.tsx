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
import { Entry, UserEntry } from 'src/types';
import { Props } from './types';

export const styles = createStyles({
    art: {
        objectFit: 'cover',
        width: '100%',
    },
});

const RawEntryEditor: React.SFC<Props> = ({
    afterSave,
    close,
    entry,
    handleCancel,
    handleInput,
    classes,
    width,
}) => {
    // TODO: move to separate module
    async function handleSave(
        entryCode: string,
        entryEdit: Partial<UserEntry>,
    ): Promise<Entry> {
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
        const result: Entry = await res.json();
        return result;
    }

    const save: React.MouseEventHandler = async e => {
        if (entry === null) {
            throw new Error('Cannot save if not loaded');
        }
        const editedEntry = await handleSave(entry.entryCode, {
            finished: entry.finished,
            // progress: entry.progress, // TODO: add progress to backend
            rating: entry.rating,
            started: entry.started,
        });
        if (afterSave) {
            afterSave(editedEntry);
        }
        close();
    };
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
                                    onInput={handleInput}
                                />
                                {/* TODO: date input restrictions/formatter */}
                                <TextField
                                    variant="outlined"
                                    margin="dense"
                                    id="started"
                                    label="Started"
                                    type=""
                                    value={entry.started}
                                    onInput={handleInput}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="dense"
                                    id="finished"
                                    label="Finished"
                                    type="text"
                                    value={entry.finished}
                                    onInput={handleInput}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="dense"
                                    id="progress"
                                    label="Progress"
                                    type="text"
                                    value={entry.progress}
                                    onInput={handleInput}
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
                        <Button onClick={handleCancel} color="primary">
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
