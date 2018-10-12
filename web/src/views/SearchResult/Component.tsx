import {
    // Button,
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
        height: '48px',
    },
});

class RawSearchResult extends React.Component<Props> {
    public componentDidMount() {
        this.props.loadSearchResults();
    }

    public render() {
        const { classes, searchResults } = this.props;
        return (
            <Table>
                <TableHead>
                    <TableRow className={classes.header}>
                        <TableCell>Title</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {searchResults.map(searchResult => (
                        <TableRow key={searchResult.id}>
                            <TableCell component="th" scope="row">
                                <Link
                                    to={`/media/${searchResult.id}/${
                                        searchResult.mediaType
                                    }`}
                                >
                                    <Typography variant="body1">
                                        {searchResult.title}
                                    </Typography>
                                </Link>
                                <Typography variant="body1">
                                    {searchResult.description}
                                </Typography>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        );
    }
}

export const SearchResultComponent = withStyles(styles)(RawSearchResult);
