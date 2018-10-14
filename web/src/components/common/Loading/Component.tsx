import CircularProgress from '@material-ui/core/CircularProgress';
// import purple from '@material-ui/core/colors/purple';
import { withStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { styles } from './styles';
import { Props } from './types';

function CircularIndeterminate(props: Props) {
    const { classes } = props;
    return (
        <>
            {/* <CircularProgress className={classes.progress} /> */}
            {/* <CircularProgress className={classes.progress} size={50} /> */}
            <CircularProgress className={classes.progress} color="secondary" />
            {/* <CircularProgress
                className={classes.progress}
                style={{ color: purple[500] }}
                thickness={7}
            /> */}
        </>
    );
}

export const LoadingComponent = withStyles(styles)(CircularIndeterminate);
