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
import { Loading } from '../../components/common/Loading';
import { Nav } from '../../components/common/Nav';
import { TablePaginationAction } from '../../components/common/TablePagination';
import { Props, State } from './types';

export const styles = createStyles({
    header: {
        height: '48px',
    },
});

class RawSearchResult extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            page: 0,
        };
    }

    public componentDidMount() {
        const { mediaType, searchString } = this.props.match.params;
        this.props.loadSearchResults(mediaType, searchString, this.state.page);
    }

    public componentDidUpdate(prevProps: Props) {
        const prevMediaType = prevProps.match.params.mediaType;
        const prevSearchString = prevProps.match.params.searchString;

        const { mediaType, searchString } = this.props.match.params;
        console.log(mediaType + ' ' + searchString);

        if (prevMediaType !== mediaType || prevSearchString !== searchString) {
            this.props.loadSearchResults(
                mediaType,
                searchString,
                this.state.page,
            );
        }
    }

    // public componentWillReceiveProps(nextProps: Props) {
    //     const { mediaType, searchString } = nextProps.match.params;
    //     this.props.loadSearchResults(mediaType, searchString, this.state.page);
    // }

    public handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement>,
        page: number,
    ) => {
        this.props.clearSearchResults();

        const { mediaType, searchString } = this.props.match.params;
        this.props.loadSearchResults(mediaType, searchString, page);

        this.setState({ page });
    };

    public render() {
        const { classes, searchResults, totalResults } = this.props;
        const { page } = this.state;
        const rowsLength = 20;

        let content = null;
        if (searchResults.length === 0) {
            content = <Loading />;
        } else {
            content = (
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
                                </TableCell>
                                <TableCell>
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
                                count={totalResults}
                                rowsPerPage={rowsLength}
                                page={page}
                                onChangePage={this.handleChangePage}
                                // onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationAction}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            );
        }

        return (
            <>
                <Nav />
                {content}
            </>
        );
    }
}

export const SearchResultComponent = withStyles(styles)(RawSearchResult);
