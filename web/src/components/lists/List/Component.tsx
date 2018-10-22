import {
    Button,
    Chip,
    Divider,
    Grid,
    Theme,
    Typography,
} from '@material-ui/core';
import { createStyles, withStyles } from '@material-ui/core/styles';
import MUIDataTable from 'mui-datatables';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { Entry, Media, mediaUrl } from '../../../types';
import { Props } from './types';

export const styles = (theme: Theme) =>
    createStyles({
        button: {
            margin: theme.spacing.unit,
        },
        content: {
            width: '100%',
        },
        editButton: {
            backgroundColor: theme.palette.primary.light,
        },
        header: {
            height: '48px', // TODO: get var from theme instead of hardcoding?
        },
        layout: {
            margin: theme.spacing.unit * 3,
            width: 'auto',
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
        tag: {
            marginBottom: '4px',
            marginRight: '4px',
        },
    });

const RawList: React.SFC<Props> = ({
    classes,
    list,
    handleEdit,
    handleDelete,
    handleListEdit,
    editable,
}) => {
    const entries = list.entries;
    let columns = [
        {
            name: 'Title',
            options: {
                // FIXME: dirty hack - media is a stringified Media object because
                // table cells must be string | number, which is passed into this function
                customBodyRender: (mediaString: string) => {
                    const media: Media & { mediaType: string } = JSON.parse(
                        mediaString,
                    );
                    return (
                        <Typography variant="body1">
                            <Link
                                to={`/media/${mediaUrl[media.mediaType]}/${
                                    media.id
                                }`}
                                className={classes.link}
                            >
                                {media.title}
                            </Link>
                        </Typography>
                    );
                },
            },
        },
        'Rating',
        'Category',
        'Started',
        'Finished',
        {
            name: 'Tags',
            options: {
                customBodyRender: (tagsString: string) => {
                    const tags = JSON.parse(tagsString);
                    return tags.map((t: string) => (
                        <Chip className={classes.tag} key={t} label={t} />
                    ));
                },
            },
        },
    ];

    const entryToTitleCol = (entry: Entry) =>
        JSON.stringify({
            ...entry.media,
            mediaType: list.mediaType,
        });
    const data = entries.map(entry => [
        entryToTitleCol(entry),
        entry.rating ? `${entry.rating}/10` : '-',
        entry.category,
        entry.started,
        entry.finished,
        JSON.stringify(entry.tags),
    ]);

    if (editable) {
        columns = [
            ...columns,
            {
                name: '',
                options: {
                    customBodyRender: (entryString: string) => {
                        const entry = JSON.parse(entryString);
                        return (
                            <Button
                                className={classes.editButton}
                                onClick={handleEdit(entry)}
                            >
                                Edit
                            </Button>
                        );
                    },
                },
            },
        ];
        entries.forEach((entry, idx) => data[idx].push(JSON.stringify(entry)));
    }

    const options = {
        download: false,
        filter: false,
        print: false,
        responsive: 'scroll',
        rowHover: false,
        selectableRows: false,
        viewColumns: false,
    };

    const content = (
        <>
            <MUIDataTable data={data} columns={columns} options={options} />
        </>
    );

    return (
        <Grid className={classes.content} container={true}>
            <Grid xs={12} item={true}>
                {content}
            </Grid>
            {editable && (
                <>
                    <Divider />
                    <Grid
                        container={true}
                        item={true}
                        justify="flex-end"
                        xs={12}
                    >
                        <Button
                            className={classes.button}
                            onClick={handleListEdit}
                        >
                            Edit List
                        </Button>
                        <Button
                            className={classes.button}
                            onClick={handleDelete}
                        >
                            Delete List
                        </Button>
                    </Grid>
                </>
            )}
        </Grid>
    );
};

export const ListComponent = withStyles(styles)(RawList);
