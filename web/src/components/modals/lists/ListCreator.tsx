import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    MenuItem,
    TextField,
    withWidth,
} from '@material-ui/core';
import { WithStyles } from '@material-ui/core';
import { createStyles, withStyles } from '@material-ui/core/styles';
import { isWidthDown } from '@material-ui/core/withWidth';
import { WithWidth } from '@material-ui/core/withWidth';
import * as React from 'react';
import { EntryList, isMediaType, MediaType, NewEntryList } from 'src/types';

const styles = createStyles({});

export type AfterListCreateCallback = (newList: EntryList) => void;
interface Props extends WithStyles<typeof styles>, WithWidth {
    /** Callback to be called after a successful create. */
    afterCreate?: AfterListCreateCallback;
    handleCancel: () => void;
    open: boolean;
}

interface State {
    name: string;
    mediaType: MediaType | null;
}

// FIXME: refactor to match newer modals which store state in redux
// better to use redux so can close itself and parents do not all need to
// store and manage "open" state by passing callbacks in.
export const ListCreator = withWidth()(
    withStyles(styles)(
        class extends React.Component<Props, State> {
            public state: State = {
                mediaType: null,
                name: '',
            };

            public render() {
                const { width, open } = this.props;
                const { name, mediaType } = this.state;
                const typeItems = {
                    Anime: MediaType.Anime,
                    Games: MediaType.Game,
                    Movie: MediaType.Movie,
                    Show: MediaType.Show,
                };
                return (
                    <Dialog
                        open={open}
                        aria-labelledby="form-dialog-title"
                        fullWidth={false}
                        fullScreen={isWidthDown('sm', width)}
                    >
                        <>
                            <DialogTitle id="form-dialog-title">
                                New List
                            </DialogTitle>
                            <DialogContent>
                                <Grid container={true} direction="column">
                                    <TextField
                                        margin="dense"
                                        id="name"
                                        name="name"
                                        label="Name"
                                        type="text"
                                        onChange={this.handleInput}
                                        value={name}
                                        variant="outlined"
                                    />
                                    <TextField
                                        id="mediaType"
                                        name="mediaType"
                                        select={true}
                                        label="Type"
                                        // className={classes.textField}
                                        value={mediaType || ''}
                                        onChange={this.handleInput}
                                        helperText="List type cannot be edited later"
                                        margin="dense"
                                        variant="outlined"
                                    >
                                        {Object.keys(typeItems).map(k => (
                                            <MenuItem
                                                key={k}
                                                value={typeItems[k]}
                                            >
                                                {k}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    color="primary"
                                    onClick={this.handleCancel}
                                >
                                    Cancel
                                </Button>
                                {name.length > 0 && mediaType !== null ? (
                                    <Button
                                        color="primary"
                                        onClick={this.create}
                                    >
                                        Create
                                    </Button>
                                ) : (
                                    <Button color="primary" disabled={true}>
                                        Create
                                    </Button>
                                )}
                            </DialogActions>
                        </>
                    </Dialog>
                );
            }

            private handleInput: React.ChangeEventHandler<
                HTMLInputElement
            > = e => {
                const { name, value } = e.target;
                if (
                    !(name in this.state) ||
                    (name === 'mediaType' && !isMediaType(value))
                ) {
                    throw new Error('Invalid input');
                }

                this.setState({
                    [name]: value,
                } as Pick<State, keyof State>);
            };

            private handleCancel = () => {
                this.props.handleCancel();
                this.setState({
                    mediaType: null,
                    name: '',
                });
            };

            private create = async () => {
                const { name, mediaType } = this.state;
                if (name.length === 0 || mediaType === null) {
                    throw new Error('Invalid');
                }
                const newList: NewEntryList = { name, mediaType };

                const res = await fetch(
                    `${process.env.REACT_APP_API_BASE}/list`,
                    {
                        body: JSON.stringify(newList),
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        method: 'POST',
                    },
                );
                if (res.status >= 400) {
                    throw new Error(`${res.status} ${res.statusText}`);
                }
                const list = (await res.json()) as EntryList;

                const { afterCreate } = this.props;
                if (afterCreate) {
                    afterCreate(list);
                }
                this.setState({
                    mediaType: null,
                    name: '',
                });

                return list;
            };
        },
    ),
);
