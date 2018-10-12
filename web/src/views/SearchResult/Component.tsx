import {
    // Button,
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TablePagination,
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
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            colSpan={3}
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={this.handleChangePage}
                            onChangeRowsPerPage={this.handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActionsWrapped}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        );
    }
}

export const SearchResultComponent = withStyles(styles)(RawSearchResult);
