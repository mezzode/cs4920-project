import {
    createStyles,
    Grid,
    Theme,
    WithStyles,
    withStyles,
} from '@material-ui/core';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Nav } from '../../components/common/Nav/index';
import { UserMenu } from '../../components/user/UserMenu';

const styles = (theme: Theme) =>
    createStyles({
        layout: {
            marginLeft: theme.spacing.unit * 3,
            marginRight: theme.spacing.unit * 3,
            marginTop: theme.spacing.unit * 3,
            width: 'auto',
        },
    });

interface Params {
    username: string;
}

interface Props
    extends WithStyles<typeof styles>,
        RouteComponentProps<Params> {}

const RawUserPage: React.SFC<Props> = ({
    classes,
    match: {
        params: { username },
    },
}) => (
    <>
        <Nav />
        <main className={classes.layout}>
            <Grid container={true} spacing={16} justify="space-around">
                <Grid item={true} xs={12} md={2} xl={1}>
                    <UserMenu username={username} />
                </Grid>
                <Grid item={true} xs={12} md={10} xl={11} />
            </Grid>
        </main>
    </>
);

export const UserPage = withStyles(styles)(RawUserPage);
