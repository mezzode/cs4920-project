import { Typography, WithStyles } from '@material-ui/core';
import { createStyles, withStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { Nav } from '../components/common/Nav';
import { List } from '../components/lists/List';
import { EntryList } from '../types';

const styles = createStyles({
    content: {
        display: 'flex',
        justifyContent: 'space-around',
    },
});

interface Props extends WithStyles<typeof styles> {
    listId: string;
}

interface State {
    readonly list: EntryList | null;
}

export const ListPage = withStyles(styles)(
    class extends React.Component<Props, State> {
        public state: State = {
            list: null,
        };

        public render() {
            const { list } = this.state;
            return (
                <>
                    <Nav />
                    <div className={this.props.classes.content}>
                        {list === null ? (
                            <Typography variant="display3">Loading</Typography>
                        ) : (
                            <>
                                <Typography variant="display3">
                                    {list.name}
                                </Typography>
                                <List entries={list.entries} />
                            </>
                        )}
                    </div>
                </>
            );
        }

        public async componentDidMount() {
            const { listId } = this.props;
            const res = await fetch(`/list/${listId}/`);
            const list = (await res.json()) as EntryList;
            this.setState({ list });
        }
    },
);
