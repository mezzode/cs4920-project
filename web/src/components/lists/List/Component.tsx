import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Theme,
    Typography,
} from '@material-ui/core';
import { createStyles, withStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { Props } from './types';

export const styles = (theme: Theme) =>
    createStyles({
        header: {
            height: '48px', // TODO: get var from theme instead of hardcoding?
        },
        layout: {
            margin: theme.spacing.unit * 3,
            width: 'auto',
        },
        link: {
            '&:link': {
                ...theme.typography.body1,
                textDecoration: 'none',
            },
            // tslint:disable-next-line:object-literal-sort-keys since must overwrite :link
            '&:hover': {
                ...theme.typography.body1,
                textDecoration: 'underline',
            },
            '&:visited': {
                ...theme.typography.body1,
                textDecoration: 'none',
            },
        },
    });

// TODO: prolly should use Typography to style title instead of Button
const RawList: React.SFC<Props> = ({
    classes,
    entries,
    handleEdit,
    editable,
}) => {
    if (entries.length === 0) {
        return (
            <Typography className={classes.layout} variant="body1">
                No entries.
            </Typography>
        );
    }
    return (
        <Table>
            <TableHead>
                <TableRow className={classes.header}>
                    <TableCell>Title</TableCell>
                    <TableCell>Rating</TableCell>
                    <TableCell>Started</TableCell>
                    <TableCell>Finished</TableCell>
                    <TableCell>Progress</TableCell>
                    {editable && <TableCell />}
                </TableRow>
            </TableHead>
            <TableBody>
                {entries.map(entry => (
                    <TableRow key={entry.entryCode}>
                        <TableCell component="th" scope="row">
                            <Typography variant="body1">
                                <Link
                                    to={`/media/${entry.media.mediaCode}`}
                                    className={classes.link}
                                >
                                    {entry.media.title}
                                </Link>
                            </Typography>
                        </TableCell>
                        <TableCell>
                            {entry.rating !== null ? `${entry.rating}/10` : '-'}
                        </TableCell>
                        <TableCell>{entry.started}</TableCell>
                        <TableCell>{entry.finished}</TableCell>
                        <TableCell>{entry.progress}</TableCell>
                        {editable && (
                            <TableCell>
                                <Button onClick={handleEdit(entry)}>
                                    Edit
                                </Button>
                            </TableCell>
                        )}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export const ListComponent = withStyles(styles)(RawList);
