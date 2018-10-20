import {
    Button,
    Dialog,
    // DialogActions,
    DialogContent,
    Grid,
    // tBase,
    TextField,
    withWidth,
} from '@material-ui/core';
import { createStyles, withStyles } from '@material-ui/core/styles';
import { isWidthDown } from '@material-ui/core/withWidth';
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

const RawEntryCreator: React.SFC<Props> = ({
    afterEdit,
    close,
    entry,
    input,
    classes,
    width,
    shouldOpen,
    // addTag,
    // removeTag,
}) => {
    const save: React.FormEventHandler = async event => {
        event.preventDefault();
        const data = new FormData(event.target as HTMLFormElement);
        // console.log(JSON.stringify(data));
        if (data === null) {
            throw new Error('Cannot save if not loaded');
        }
        // list id, media id, remove tags
        const res = await fetch(`${process.env.REACT_APP_API_BASE}/entry`, {
            body: data, // may not work if server does not support our params
            credentials: 'include',
            method: 'post',
            mode: 'cors',
        });
        if (res.status >= 400) {
            throw new Error(`${res.status} ${res.statusText}`);
        }
        const editedEntry: Entry = await res.json();
        if (afterEdit) {
            afterEdit(editedEntry);
        }
        close();
    };

    return (
        <Dialog
            open={shouldOpen}
            aria-labelledby="form-dialog-title"
            fullWidth={true}
            fullScreen={isWidthDown('sm', width)}
        >
            <>
                <form onSubmit={save}>
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
                                    name="tags"
                                    style={{ display: 'none' }}
                                    value={'{}'}
                                />
                                <TextField
                                    name="listId"
                                    style={{ display: 'none' }}
                                    value={1}
                                />
                                <TextField
                                    name="mediaId"
                                    style={{ display: 'none' }}
                                    value={2}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="dense"
                                    id="rating"
                                    label="Rating"
                                    type="number"
                                    name="rating"
                                    // value={entry ? entry.rating : ''}
                                    // onInput={input}
                                />
                                {/* TODO: date input restrictions/formatter */}
                                <TextField
                                    variant="outlined"
                                    margin="dense"
                                    id="started"
                                    label="Started"
                                    type="date"
                                    name="started"
                                    // value={entry ? entry.started : ''}
                                    // onInput={input}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="dense"
                                    id="finished"
                                    label="Finished"
                                    type="date"
                                    name="finished"
                                    // value={entry ? entry.finished : ''}
                                    // onInput={input}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="dense"
                                    id="progress"
                                    label="Progress"
                                    type="text"
                                    // name="progress"
                                    // value={entry ? entry.progress : ''}
                                    // onInput={input}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="dense"
                                    id="category"
                                    label="Category"
                                    type="text"
                                    name="category"
                                    // value={entry ? entry.category : ''}
                                    // onInput={input}
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <Button variant="contained" color="primary" type="submit">
                        Save
                    </Button>

                    {/* <DialogActions>
                        <Button onClick={close} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={save} color="primary">
                            Save
                        </Button>
                    </DialogActions> */}
                </form>
            </>
        </Dialog>
    );
};

export const EntryCreatorComponent = withWidth()(
    withStyles(styles)(RawEntryCreator),
);
