import {
    ButtonBase,
    Grid,
    Paper,
    TablePagination,
    Typography,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { Loading } from '../../components/common/Loading';
import { Nav } from '../../components/common/Nav';
import { TablePaginationAction } from '../../components/common/TablePagination';
import { styles } from './styles';
import { Props, State } from './types';

class RawSearchResult extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            page: 0,
        };
    }

    public componentDidMount() {
        this.props.clearSearchResults();

        const { mediaType, searchString } = this.props.match.params;
        this.props.loadSearchResults(mediaType, searchString, this.state.page);
    }

    public componentDidUpdate(prevProps: Props) {
        const prevMediaType = prevProps.match.params.mediaType;
        const prevSearchString = prevProps.match.params.searchString;

        const { mediaType, searchString } = this.props.match.params;
        console.log(mediaType + ' ' + searchString);

        if (prevMediaType !== mediaType || prevSearchString !== searchString) {
            this.props.clearSearchResults();
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
        const { classes, searchResults, totalResults, isLoading } = this.props;
        const { page } = this.state;
        const rowsLength = 20;

        let content = null;
        if (isLoading) {
            content = <Loading />;
        } else {
            content = (
                <Grid>
                    <Grid className={classes.header}>
                        <Typography align="center" variant="h3">
                            Results
                        </Typography>
                    </Grid>
                    <Grid>
                        {searchResults.map(searchResult => (
                            <Paper
                                className={classes.root}
                                key={searchResult.id}
                            >
                                <Grid container={true} spacing={16}>
                                    <Grid item={true}>
                                        <ButtonBase
                                            component={Link}
                                            {...{
                                                to: `/media/${
                                                    searchResult.id
                                                }/${searchResult.mediaType}`,
                                            }}
                                            className={classes.image}
                                            style={{
                                                textDecoration: 'none',
                                            }}
                                        >
                                            <img
                                                className={classes.img}
                                                src={searchResult.image}
                                            />
                                        </ButtonBase>
                                    </Grid>
                                    <Grid
                                        item={true}
                                        xs={12}
                                        sm={true}
                                        container={true}
                                        direction="column"
                                        spacing={16}
                                    >
                                        <Grid item={true} xs={true}>
                                            <Link
                                                to={`/media/${
                                                    searchResult.id
                                                }/${searchResult.mediaType}`}
                                                style={{
                                                    textDecoration: 'none',
                                                }}
                                            >
                                                <Typography
                                                    gutterBottom={true}
                                                    variant="h6"
                                                >
                                                    {searchResult.title}
                                                </Typography>
                                            </Link>
                                            <Typography>
                                                {searchResult.description}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Paper>
                        ))}
                    </Grid>
                    <Grid>
                        <TablePagination
                            colSpan={3}
                            component="div"
                            count={totalResults}
                            rowsPerPage={rowsLength}
                            rowsPerPageOptions={[rowsLength]}
                            page={page}
                            onChangePage={this.handleChangePage}
                            ActionsComponent={TablePaginationAction}
                        />
                    </Grid>
                </Grid>
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
