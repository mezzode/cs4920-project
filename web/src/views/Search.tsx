import { Theme, Typography } from '@material-ui/core';
import { createStyles, withStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { connect } from 'react-redux';
import { Nav } from '../components/common/Nav';

// TODO: fiddle with styling
const styles = (theme: Theme) =>
    createStyles({
        layout: {
            marginLeft: theme.spacing.unit * 3,
            marginRight: theme.spacing.unit * 3,
            marginTop: theme.spacing.unit * 3,
            width: 'auto',
        },
        paper: {},
    });

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
        class extends React.Component {
            public render() {
                const urlString = window.location.href;
                const url = new URL(urlString);
                const query = url.searchParams.get('q');
                return (
                    <>
                        <Nav />
                        <Typography variant="display3">
                            SEARCH RESULTS
                        </Typography>
                        HI what is up my dudes
                        <div>{query}</div>
                    </>
                );
            }
        },
    ),
);
