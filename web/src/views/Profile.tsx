import {
    Theme,
    Typography,
} from '@material-ui/core';
import { createStyles, withStyles } from '@material-ui/core/styles';
import * as React from 'react';
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
        paper: {
        },
    });

interface Props { };

const RawProfile: React.SFC<Props> = () => (
    <>
        <Nav />
        <Typography variant="display3">foobar</Typography>
    </>
);

export const Profile = withStyles(styles)(RawProfile);