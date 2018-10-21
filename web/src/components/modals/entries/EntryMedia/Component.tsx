import {
    Button,
    Divider,
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    Table,
    TableCell,
    TableRow,
    Typography,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { EntryList, ListsMap } from 'src/types';
import { EntryCreator } from '../EntryCreator';
// import { AfterEntryEditCallBack } from 'src/components/modals';
// import { EntryCreator } from '../EntryCreator';
// import { lists } from './dummy-data';
import { styles } from './styles';
import { Props, State } from './types';

class RawEntryMedia extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            lists: null,
        };
        this.handleClick.bind(this);
    }

    public async getLists() {
        const { mediaType, username } = this.props;
        const listsMap = await this.loadUserLists(username, mediaType);
        const listsTemp = Object.keys(listsMap).map(
            k => listsMap[k],
        ) as EntryList[];
        this.setState({ lists: listsTemp });
    }

    public loadUserLists = async (username: string, mediaType: string) => {
        const res = await fetch(
            `${
                process.env.REACT_APP_API_BASE
            }/user/${username}/lists/${mediaType}`,
        );
        if (res.status > 400) {
            throw new Error(`Server error: ${res.status} ${res.statusText}`);
        }
        const { lists } = (await res.json()) as { lists: EntryList[] };
        // console.log(JSON.stringify(lists));
        const listsMap = lists.reduce<ListsMap>(
            (map, list) => ({
                ...map,
                [list.listCode]: list,
            }),
            {},
        );
        return listsMap;
    };

    public async componentDidMount() {
        await this.getLists();
    }

    public async componentDidUpdate(prevProps: Props) {
        if (prevProps.shouldOpen !== this.props.shouldOpen) {
            await this.getLists();
        }
    }

    public render() {
        const { classes } = this.props;
        const { lists } = this.state;

        console.log('media id is');
        console.log(this.props.mediaId);
        return (
            <>
                {/* <Button onClick={this.openDialog}>Edit</Button> */}
                {/* <EntryCreator afterEdit={this.afterEntryEdit} /> */}
                {/* <EntryCreator entry={this.state.editingEntry} /> */}
                {lists != null &&
                    lists.map(list =>
                        list.entries.map(
                            entry =>
                                entry.media.id ===
                                    parseInt(this.props.mediaId, 10) && (
                                    <ExpansionPanel key={list.listCode}>
                                        <ExpansionPanelSummary
                                            expandIcon={<ExpandMoreIcon />}
                                        >
                                            <Typography>
                                                <Link
                                                    to={`/list/${
                                                        list.listCode
                                                    }`}
                                                    className={classes.link}
                                                >
                                                    {list.name}
                                                </Link>
                                            </Typography>
                                        </ExpansionPanelSummary>
                                        <Divider />
                                        <ExpansionPanelDetails
                                            className={classes.details}
                                        >
                                            <Table
                                                className={classes.tableText}
                                            >
                                                <TableRow>
                                                    <TableCell>
                                                        Category
                                                    </TableCell>
                                                    <TableCell>
                                                        {entry.category}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>
                                                        Started
                                                    </TableCell>
                                                    <TableCell>
                                                        {entry.started}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>
                                                        Finished
                                                    </TableCell>
                                                    <TableCell>
                                                        {entry.finished}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>
                                                        Rating
                                                    </TableCell>
                                                    <TableCell>
                                                        {entry.rating}
                                                    </TableCell>
                                                </TableRow>
                                            </Table>
                                        </ExpansionPanelDetails>
                                    </ExpansionPanel>
                                ),
                        ),
                    )}
                <Button onClick={this.handleClick}>New Entry</Button>
                {this.props.shouldOpen && (
                    <EntryCreator
                        shouldOpen={this.props.shouldOpen}
                        lists={this.state.lists}
                        mediaId={this.props.mediaId}
                    />
                )}
            </>
        );
    }

    private handleClick = () => {
        this.props.open();
    };
}
/* // private afterEntryEdit: AfterEntryEditCallBack = editedEntry => { */
// private afterEntryEdit: AfterEntryEditCallBack = editedEntry => {
//     const { lists } = this.state;
//     if (lists === null) {
//         // should not be able to trigger edit if not loaded
//         throw new Error('List not loaded');
//     }
//     this.setState({
//         lists: {
//             ...list,
//             entries: list.entries.map(
//                 entry =>
//                     entry.entryCode === editedEntry.entryCode
//                         ? editedEntry
//                         : enry,
//             ),
//         },
//     });
// };

export const EntryMediaComponent = withStyles(styles)(RawEntryMedia);
