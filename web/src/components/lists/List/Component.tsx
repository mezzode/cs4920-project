import {
    Button,
    Grid,
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
        button: {
            margin: theme.spacing.unit,
        },
        content: {
            width: '100%',
        },
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

const RawList: React.SFC<Props> = ({
    classes,
    list,
    handleEdit,
    handleDelete,
    editable,
}) => {
    const entries = list.entries;
    const content =
        entries.length === 0 ? (
            <Typography className={classes.layout} variant="body1">
                No entries.
            </Typography>
        ) : (
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
                                {entry.rating !== null
                                    ? `${entry.rating}/10`
                                    : '-'}
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

    return (
        <Grid className={classes.content} container={true}>
            <Grid xs={12} item={true}>
                {content}
            </Grid>
            {editable && ( // TODO: implement modals
                <Grid container={true} item={true} justify="flex-end" xs={12}>
                    <Button className={classes.button}>Edit</Button>
                    <Button className={classes.button} onClick={handleDelete}>
                        Delete
                    </Button>
                </Grid>
            )}
        </Grid>
    );
};

export const ListComponent = withStyles(styles)(RawList);
