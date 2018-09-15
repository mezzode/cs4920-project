import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    WithStyles,
} from '@material-ui/core';
import { createStyles, withStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { IEntry } from '../../types';

const styles = createStyles({
    header: {
        height: '48px', // TODO: get var from theme instead of hardcoding?
    },
});

interface IProps extends WithStyles<typeof styles> {
    entries: IEntry[];
}

const RawList: React.SFC<IProps> = ({ classes, entries }) => (
    <Table>
        <TableHead>
            <TableRow className={classes.header}>
                <TableCell>Title</TableCell>
                <TableCell>Rating</TableCell>
                <TableCell>Started</TableCell>
                <TableCell>Finished</TableCell>
                <TableCell>Progress</TableCell>
                <TableCell />
            </TableRow>
        </TableHead>
        <TableBody>
            {entries.map(entry => (
                <TableRow key={entry.entryId}>
                    <TableCell component="th" scope="row">
                        {entry.media.title}
                    </TableCell>
                    <TableCell>
                        {entry.rating}
                        /10
                    </TableCell>
                    <TableCell>{entry.started}</TableCell>
                    <TableCell>{entry.finished}</TableCell>
                    <TableCell>{entry.progress}</TableCell>
                    <TableCell>
                        <Button>Edit</Button>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
);

export const List = withStyles(styles)(RawList);
