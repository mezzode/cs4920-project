import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
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
    mediaType: MediaType;
}

interface State {
    name: string;
}

export const ListCreator = withWidth()(
    withStyles(styles)(
        class extends React.Component<Props, State> {
            public state: State = {
                name: '',
            };

            public render() {
                const { width, open, mediaType } = this.props;
                const { name } = this.state;
                const displayType = {
                    [MediaType.Game]: 'Game',
                    [MediaType.Anime]: 'Anime',
                    [MediaType.Show]: 'Show',
                    [MediaType.Movie]: 'Movie',
                }[mediaType];
                return (
                    <Dialog
                        open={open}
                        aria-labelledby="form-dialog-title"
                        fullWidth={false}
                        fullScreen={isWidthDown('sm', width)}
                    >
                        <>
                            <DialogTitle id="form-dialog-title">
                                New {displayType} List
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
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    color="primary"
                                    onClick={this.handleCancel}
                                >
                                    Cancel
                                </Button>
                                {name.length > 0 ? (
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
                    throw new Error('Invalid input');
                }

                this.setState({
                    [name]: value,
                } as Pick<State, keyof State>);
            };

            private handleCancel = () => {
                this.props.handleCancel();
                this.setState({
                    name: '',
                });
            };

            private handleSubmit = () => {
                const { name } = this.state;
                const { mediaType } = this.props;
                if (name.length === 0) {
                    throw new Error('Invalid');
                }
                this.props.submit({ name, mediaType });
            };
        },
    ),
);
