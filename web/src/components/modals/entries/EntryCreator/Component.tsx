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
import ChipInput from 'material-ui-chip-input';
import * as React from 'react';
import { SimpleSelect } from 'src/components/common/SimpleSelect';
import { NewEntry } from 'src/types';
import { Props, State } from './types';

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

class RawEntryCreator extends React.Component<Props, State> {
    public constructor(props: Props) {
        super(props);
    }

    public componentDidMount() {
        this.props.setDate();
    }

    public blah() {
        console.log('made it called');
    }

    public render() {
        const {
            addTagEntryCreator,
            afterEdit,
            classes,
            close,
            entry,
            input,
            lists,
            mediaId,
            removeTagEntryCreator,
            shouldOpen,
            width,
        } = this.props;

        async function save() {
            if (entry === null) {
                throw new Error('Cannot save if not loaded');
            }
            // TODO: store UserEntry details separate so do not need to extract them
            // from the full Entry?
            const {
                finished,
                rating,
                started,
                category,
                listCode,
                tags,
            } = entry;
            const entryEdit = {
                category,
                finished,
                // progress, // TODO: add progress to backend
                listCode,
                mediaId,
                rating,
                started,
                tags,
            };

            const res = await fetch(`${process.env.REACT_APP_API_BASE}/entry`, {
                body: JSON.stringify(entryEdit),
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
            });
            if (res.status >= 400) {
                throw new Error(`${res.status} ${res.statusText}`);
            }
            const editedEntry: NewEntry = await res.json();
            if (afterEdit) {
                afterEdit(editedEntry);
            }
            close();
        }

        return (
            <Dialog
                open={shouldOpen}
                aria-labelledby="form-dialog-title"
                fullWidth={true}
                fullScreen={isWidthDown('sm', width)}
            >
                <>
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
                                    name="rating"
                                    value={entry ? entry.rating : ''}
                                    onInput={input}
                                />
                                {/* TODO: date input restrictions/formatter */}
                                <TextField
                                    variant="outlined"
                                    margin="dense"
                                    id="started"
                                    label="Started"
                                    type="date"
                                    name="started"
                                    value={entry ? entry.started : ''}
                                    onInput={input}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="dense"
                                    id="finished"
                                    label="Finished"
                                    type="date"
                                    name="finished"
                                    value={entry ? entry.finished : ''}
                                    onInput={input}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="dense"
                                    id="progress"
                                    label="Progress"
                                    type="text"
                                    name="progress"
                                    value={entry ? entry.progress : ''}
                                    onInput={input}
                                />
                                <ChipInput
                                    onAdd={addTagEntryCreator}
                                    onDelete={removeTagEntryCreator}
                                    value={entry ? entry.tags : []}
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
                                        updateAdditionalState={input}
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
                                                      text: list.name,
                                                      value: list.listCode,
                                                  }))
                                        }
                                        updateAdditionalState={input}
                                    />
                                </FormControl>
                            </Grid>
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
            </Dialog>
        );
    }
}

export const EntryCreatorComponent = withWidth()(
    withStyles(styles)(RawEntryCreator),
);
