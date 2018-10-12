import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    TextField,
    withWidth,
} from '@material-ui/core';
import { WithStyles } from '@material-ui/core';
import { createStyles, withStyles } from '@material-ui/core/styles';
import { isWidthDown } from '@material-ui/core/withWidth';
import { WithWidth } from '@material-ui/core/withWidth';
import * as React from 'react';
import { isMediaType, MediaType, NewEntryList } from '../../types';

const styles = createStyles({});

interface Props extends WithStyles<typeof styles>, WithWidth {
    handleCancel: () => void;
    submit: (newList: NewEntryList) => void;
    open: boolean;
}

interface State {
    name: string;
    mediaType: MediaType | null;
}

export const ListCreator = withWidth()(
    withStyles(styles)(
        class extends React.Component<Props, State> {
            public state: State = {
                mediaType: null,
                name: '',
            };

            public render() {
                const { width, handleCancel, open } = this.props;
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
                        fullWidth={true}
                        fullScreen={isWidthDown('sm', width)}
                    >
                        <>
                            <DialogTitle id="form-dialog-title">
                                New List
                            </DialogTitle>
                            <DialogContent>
                                <TextField
                                    margin="dense"
                                    id="name"
                                    name="name"
                                    label="Name"
                                    type="text"
                                    onChange={this.handleInput}
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
                                        <MenuItem key={k} value={typeItems[k]}>
                                            {k}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </DialogContent>
                            <DialogActions>
                                <Button color="primary" onClick={handleCancel}>
                                    Cancel
                                </Button>
                                {name.length > 0 && mediaType !== null ? (
                                    <Button
                                        color="primary"
                                        onClick={this.handleSubmit}
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
                    console.log(e);
                    console.log(e.target);
                    console.log(name);
                    console.log(value);
                    throw new Error('Invalid input');
                }

                this.setState({
                    [name]: value,
                } as Pick<State, keyof State>);
            };

            private handleSubmit = () => {
                const { name, mediaType } = this.state;
                if (name.length === 0 || mediaType === null) {
                    throw new Error('Invalid');
                }
                this.props.submit({ name, mediaType });
            };
        },
    ),
);
