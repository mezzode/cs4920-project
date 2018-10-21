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
import ChipInput from 'material-ui-chip-input';
import * as React from 'react';
import { Entry } from 'src/types';
import { Props } from './types';

export const styles = createStyles({
    art: {
        objectFit: 'cover',
        width: '100%',
    },
    // chipInput works around fullWidth bug with outlined variant ChipInput
    chipInput: {
        width: '100%',
    },
    // chipLabel and chipLabelShrink work around label vertical alignment bug
    // with dense margin ChipInput
    chipLabel: {
        '&:not($chipLabelShrink)': {
            top: '-2px !important',
        },
        top: '2px !important',
    },
    chipLabelShrink: {
        top: '0px !important',
    },
});

const RawEntryEditor: React.SFC<Props> = ({
    afterEdit,
    close,
    entry,
    input,
    classes,
    width,
    addTag,
    removeTag,
}) => {
    async function save() {
        if (entry === null) {
            throw new Error('Cannot save if not loaded');
        }
        // TODO: store UserEntry details separate so do not need to extract them
        // from the full Entry?
        const { finished, rating, started, entryCode, tags, category } = entry;
        const entryEdit = {
            category,
            finished,
            // progress, // TODO: add progress to backend
            rating,
            started,
            tags,
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
                                justify="space-between"
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
                                    type="text"
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
                                <TextField
                                    variant="outlined"
                                    margin="dense"
                                    id="category"
                                    label="Category"
                                    type="text"
                                    value={entry.category}
                                    onInput={input}
                                />
                                <ChipInput
                                    onAdd={addTag}
                                    onDelete={removeTag}
                                    value={entry.tags}
                                    blurBehavior="add"
                                    variant="outlined"
                                    label="Tags"
                                    fullWidth={true}
                                    margin="dense"
                                    classes={{
                                        inputRoot: classes.chipInput,
                                        label: classes.chipLabel,
                                        labelShrink: classes.chipLabelShrink,
                                    }}
                                    helperText={
                                        'Type and press "Enter" to add a tag'
                                    }
                                />
                            </Grid>
                            {isWidthUp('xs', width, false) && (
                                <Grid
                                    item={true}
                                    sm={5}
                                    container={true}
                                    alignItems="center"
                                >
                                    <img
                                        className={classes.art}
                                        src={entry.media.cover}
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
