import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from '@material-ui/core';
import { createStyles, withStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { Props } from './types';

export const styles = createStyles({
    header: {
        height: '48px', // TODO: get var from theme instead of hardcoding?
    },
});

// TODO: prolly should use Typography to style title instead of Button
const RawList: React.SFC<Props> = ({ classes, entries, handleEdit }) => (
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
                <TableRow key={entry.entryCode}>
                    <TableCell component="th" scope="row">
                        <Link to={`/media/${entry.media.mediaCode}`}>
                            <Typography variant="body1">
                                {entry.media.title}
                            </Typography>
                        </Link>
                    </TableCell>
                    <TableCell>
                        {entry.rating}
                        /10
                    </TableCell>
                    <TableCell>{entry.started}</TableCell>
                    <TableCell>{entry.finished}</TableCell>
                    <TableCell>{entry.progress}</TableCell>
                    <TableCell>
                        <Button onClick={handleEdit(entry)}>Edit</Button>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
);

export const ListComponent = withStyles(styles)(RawList);
