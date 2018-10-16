import {
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from '@material-ui/core';
import { createStyles, withStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { ResponsiveDialog } from 'src/components/common/ResponsiveDialog';
import { ListEdit, Props } from './types';

export const styles = createStyles({});

const isValid = (listEdit: ListEdit) => listEdit.name.length > 0;

const RawListEditor: React.SFC<Props> = ({
    list,
    listEdit,
    afterEdit,
    close,
    input,
}) => {
    const edit = async () => {
        if (list === null) {
            throw new Error('Cannot delete null');
        }
        const res = await fetch(
            `${process.env.REACT_APP_API_BASE}/list/${list.listCode}`,
            {
                body: JSON.stringify(listEdit),
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'PATCH',
            },
        );
        if (res.status >= 400) {
            throw new Error(`${res.status} ${res.statusText}`);
        }
        const result = (await res.json()) as ListEdit;
        if (afterEdit) {
            afterEdit(list.listCode, result);
        }
        close();
    };

    return (
        <ResponsiveDialog
            open={list !== null}
            aria-labelledby="delete-list-title"
        >
            {list !== null &&
                listEdit !== null && (
                    <>
                        <DialogTitle id="delete-list-title">
                            Edit List
                        </DialogTitle>
                        <DialogContent>
                            <TextField
                                margin="dense"
                                id="name"
                                name="name"
                                label="Name"
                                type="text"
                                onChange={input}
                                variant="outlined"
                                value={listEdit.name}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button color="primary" onClick={close}>
                                Cancel
                            </Button>
                            <Button
                                color="primary"
                                onClick={edit}
                                disabled={!isValid(listEdit)}
                            >
                                Save
                            </Button>
                        </DialogActions>
                    </>
                )}
        </ResponsiveDialog>
    );
};

export const ListEditorComponent = withStyles(styles)(RawListEditor);
