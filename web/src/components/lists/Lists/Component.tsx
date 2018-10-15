import {
    Button,
    Divider,
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    Grid,
    Theme,
    Typography,
    WithStyles,
} from '@material-ui/core';
import { createStyles, withStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import * as React from 'react';
import { EntryList } from '../../../types';
import { List } from '../List';

const styles = (theme: Theme) =>
    createStyles({
        button: {
            margin: theme.spacing.unit,
        },
        content: {
            width: '100%',
        },
        details: {
            padding: 0,
        },
    });

interface Props extends WithStyles<typeof styles> {
    editable: boolean;
    lists: EntryList[];
}

const RawLists: React.SFC<Props> = ({ classes, editable, lists }) => (
    <>
        {lists.map(list => (
            <ExpansionPanel key={list.listCode}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>{list.name}</Typography>
                </ExpansionPanelSummary>
                <Divider />
                <ExpansionPanelDetails className={classes.details}>
                    <Grid className={classes.content} container={true}>
                        <Grid xs={12} item={true}>
                            <List entries={list.entries} editable={editable} />
                        </Grid>
                        <Grid
                            container={true}
                            item={true}
                            justify="flex-end"
                            xs={12}
                        >
                            <Button className={classes.button}>Edit</Button>
                            <Button className={classes.button}>Delete</Button>
                        </Grid>
                    </Grid>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        ))}
    </>
);

export const Lists = withStyles(styles)(RawLists);
