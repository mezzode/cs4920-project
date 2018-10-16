import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
    withWidth,
} from '@material-ui/core';
import { createStyles, withStyles } from '@material-ui/core/styles';
import { isWidthDown } from '@material-ui/core/withWidth';
import * as React from 'react';
import { EntryList } from 'src/types';
import { Props } from './types';

export const styles = createStyles({});

const RawListDeleter: React.SFC<Props> = ({
    width,
    list,
    afterDelete,
    close,
}) => {
    const handleDelete = async () => {
        if (list === null) {
            throw new Error('Cannot delete null');
        }
        const res = await fetch(
            `${process.env.REACT_APP_API_BASE}/list/${list.listCode}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'DELETE',
            },
        );
        if (res.status >= 400) {
            throw new Error(`${res.status} ${res.statusText}`);
        }
        const deletedList = (await res.json()) as EntryList;
        if (afterDelete) {
            afterDelete(deletedList);
        }
        close();
    };

    return (
        <Dialog
            open={list !== null}
            aria-labelledby="form-dialog-title"
            fullWidth={false}
            fullScreen={isWidthDown('sm', width)}
        >
            {list !== null && (
                <>
                    <DialogTitle id="form-dialog-title">
                        Delete List
                    </DialogTitle>
                    <DialogContent>
                        <Typography variant="body1">
                            Are you sure you want to delete "{list.name}
                            "?
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={close}>
                            Cancel
                        </Button>
                        <Button
                            color="primary"
                            onClick={handleDelete}
                            variant="contained"
                        >
                            Delete
                        </Button>
                    </DialogActions>
                </>
            )}
        </Dialog>
    );
};

export const ListDeleterComponent = withWidth()(
    withStyles(styles)(RawListDeleter),
);
