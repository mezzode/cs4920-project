import {
    Divider,
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    Theme,
    Typography,
    WithStyles,
} from '@material-ui/core';
import { createStyles, withStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { EntryList } from '../../../types';
import { List } from '../List';

const styles = (theme: Theme) =>
    createStyles({
        details: {
            padding: 0,
        },
        link: {
            '&:link': {
                ...theme.typography.body1,
                textDecoration: 'none',
            },
            // tslint:disable-next-line:object-literal-sort-keys since must overwrite :link
            '&:hover': {
                ...theme.typography.body1,
                textDecoration: 'underline',
            },
            '&:visited': {
                ...theme.typography.body1,
                textDecoration: 'none',
            },
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
                    <Typography>
                        <Link
                            to={`/list/${list.listCode}`}
                            className={classes.link}
                        >
                            {list.name}
                        </Link>
                    </Typography>
                </ExpansionPanelSummary>
                <Divider />
                <ExpansionPanelDetails className={classes.details}>
                    <List list={list} editable={editable} />
                </ExpansionPanelDetails>
            </ExpansionPanel>
        ))}
    </>
);

export const Lists = withStyles(styles)(RawLists);
