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
import { IEntry } from '../../types';
import { List } from './List';

const styles = createStyles({
    details: {
        padding: 0,
    },
});

export interface IList {
    entries: IEntry[];
    id: string;
    name: string;
}

interface IProps extends WithStyles<typeof styles> {
    lists: IList[];
}

const RawLists: React.SFC<IProps> = ({ classes, lists }) => (
    <>
        {lists.map(list => (
            <ExpansionPanel key={list.id}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>{list.name}</Typography>
                </ExpansionPanelSummary>
                <Divider />
                <ExpansionPanelDetails className={classes.details}>
                    <List entries={list.entries} />
                </ExpansionPanelDetails>
            </ExpansionPanel>
        ))}
    </>
);

export const Lists = withStyles(styles)(RawLists);
export default Lists;
