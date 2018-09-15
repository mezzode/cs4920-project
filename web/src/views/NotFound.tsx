import { Typography, WithStyles } from '@material-ui/core';
import { createStyles, withStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { Nav } from '../components/common/Nav';

const styles = createStyles({
    content: {
        display: 'flex',
        justifyContent: 'space-around',
    },
});

interface IProps extends WithStyles<typeof styles> {}

const RawNotFound: React.SFC<IProps> = ({ classes }) => (
    <>
        <Nav />
        <div className={classes.content}>
            <Typography variant="display3">404</Typography>
        </div>
    </>
);

export const NotFound = withStyles(styles)(RawNotFound);
