import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    FormControl,
    Grid,
    InputLabel,
    // tBase,
    TextField,
    withWidth,
} from '@material-ui/core';
import { createStyles, withStyles } from '@material-ui/core/styles';
import { isWidthDown } from '@material-ui/core/withWidth';
import * as React from 'react';
import { SimpleSelect } from 'src/components/common/SimpleSelect';
import { NewEntry } from 'src/types';
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
    lists,
    mediaId,
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
        const editedEntry: NewEntry = await res.json();
        if (afterEdit) {
            afterEdit(editedEntry);
        }
        close();
    };

    const today = new Date();
    const curDate = `${today.getFullYear()}-${
        today.getMonth() < 10 ? '0' + today.getMonth() : today.getMonth()
    }-${today.getDate() < 10 ? '0' + today.getDate() : today.getDate()}`;

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
                                    type="hidden"
                                    value={'{}'}
                                    style={{ display: 'none' }}
                                />
                                {/* <TextField
                                    name="listId"
                                    style={{ display: 'none' }}
                                    value={1}
                                /> */}
                                <TextField
                                    name="mediaId"
                                    // type="hidden"
                                    defaultValue={mediaId}
                                    value={mediaId}
                                    // style={{ display: 'none' }}
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
                                    defaultValue={curDate}
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
                                    defaultValue={curDate}
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
                                <FormControl>
                                    <InputLabel htmlFor="category">
                                        Category
                                    </InputLabel>
                                    <SimpleSelect
                                        name="category"
                                        options={[
                                            {
                                                text: 'Completed',
                                                value: 'Completed',
                                            },
                                            {
                                                text: 'In Progress',
                                                value: 'In Progress',
                                            },
                                        ]}
                                    />
                                </FormControl>
                                <FormControl>
                                    <InputLabel htmlFor="listCode">
                                        List
                                    </InputLabel>
                                    <SimpleSelect
                                        name="listCode"
                                        options={
                                            lists == null
                                                ? []
                                                : lists.map(list => ({
                                                      text: list.listCode,
                                                      value: list.listCode,
                                                  }))
                                        }
                                    />
                                </FormControl>
                                {/* /user/:username/lists/:mediaType */}
                                {/* <SimpleSelect
                                    // variant="outlined"
                                    // margin="dense"
                                    // id="category"
                                    // label="Category"
                                    // type="text"
                                    name="category"
                                    // value={entry ? entry.category : ''}
                                    // onInput={input}
                                /> */}
                            </Grid>
                        </Grid>
                    </DialogContent>
                    {/* <Button variant="contained" color="primary" type="submit">
                        Save
                    </Button> */}

                    <DialogActions>
                        <Button onClick={close} color="primary">
                            Cancel
                        </Button>
                        <Button type="submit" color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </form>
            </>
        </Dialog>
    );
};

export const EntryCreatorComponent = withWidth()(
    withStyles(styles)(RawEntryCreator),
);
