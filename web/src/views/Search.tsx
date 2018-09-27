import { Theme, WithStyles } from '@material-ui/core';
import { Grid, IconButton } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import { createStyles, withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import * as React from 'react';
import { connect } from 'react-redux';
import { Nav } from '../components/common/Nav';

// TODO: fiddle with styling
const styles = (theme: Theme) =>
    createStyles({
        inputInput: {
            fontSize: 34,
        },
        inputRoot: {
            width: '75%',
        },
        layout: {
            marginLeft: theme.spacing.unit * 3,
            marginRight: theme.spacing.unit * 3,
            marginTop: theme.spacing.unit * 3,
            width: 'auto',
        },
        paper: {},
        search: {
            margin: 'auto',
            position: 'absolute',
            right: '0%',
            top: '50%',
        },
        searchButton: {
            float: 'left',
            height: 60,
            width: 60,
        },
        searchIcon: {
            height: 60,
            width: 60,
        },
    });

interface Props extends WithStyles<typeof styles> {}
/*
interface Props {}

const SearchResults: React.SFC<Props> = () => (
    <>
        <Nav />
        <Typography variant="display3">SEARCH RESULTS</Typography>
    </>
);

export const Search = withStyles(styles)(SearchResults);
*/

export const SearchPage = connect()(
    withStyles(styles)(
        class extends React.Component<Props> {
            public render() {
                const { classes } = this.props;
                const urlString = window.location.href;
                const url = new URL(urlString);
                const query = url.searchParams.get('q');

                let content = null;
                if (query === '') {
                    content = (
                        <Grid
                            container={true}
                            spacing={0}
                            direction="column"
                            alignItems="center"
                            justify="center"
                            style={{ minHeight: '60vh' }}
                        >
                            <form action="/search">
                                <IconButton
                                    type="submit"
                                    classes={{ root: classes.searchButton }}
                                >
                                    <SearchIcon
                                        classes={{ root: classes.searchIcon }}
                                    />
                                </IconButton>
                                <Input
                                    autoComplete="off"
                                    name="q"
                                    type="text"
                                    id="q"
                                    placeholder="Search"
                                    classes={{
                                        input: classes.inputInput,
                                        root: classes.inputRoot,
                                    }}
                                />
                            </form>
                        </Grid>
                    );
                } else {
                    content = <div>{query}</div>;
                }
                return (
                    <>
                        <Nav />
                        HI what is up my dudes
                        {content}
                    </>
                );
            }
        },
    ),
);
