import {
    Divider,
    ExpansionPanel,
    // ExpansionPanelActions,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    Typography,
    WithStyles,
} from '@material-ui/core';
import { createStyles, withStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import * as React from 'react';
import { EntryList } from '../../../types';
import { List } from '../List';

const styles = createStyles({
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
                    <List entries={list.entries} editable={editable} />
                </ExpansionPanelDetails>
            </ExpansionPanel>
        ))}
    </>
);

export const Lists = withStyles(styles)(RawLists);
