import { Button, Table, TableBody, TableCell, TableHead, TableRow, WithStyles } from "@material-ui/core";
import { createStyles, withStyles } from "@material-ui/core/styles";
import * as React from "react";

const styles = createStyles({
    header: {
        height: "48px", // TODO: get var from theme instead of hardcoding?
    },
});

interface IProps extends WithStyles<typeof styles> {
    entries: IEntry[];
}

export interface IEntry {
    id: string;
    title: string;
    rating: number;
    started: string;
    finished: string;
    progress: string; // TODO: proper types
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
            {entries.map(entry => {
                return (
                    <TableRow key={entry.id}>
                        <TableCell component="th" scope="row">
                            {entry.title}
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
                );
            })}
        </TableBody>
    </Table>
);

export const List = withStyles(styles)(RawList);
export default List;
