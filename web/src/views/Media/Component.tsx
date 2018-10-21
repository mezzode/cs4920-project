import {
    Grid,
    LinearProgress,
    Paper,
    Typography,
    withStyles,
} from '@material-ui/core';
import * as React from 'react';
import { EntryMedia } from 'src/components/modals/entries/EntryMedia';
import { Nav } from '../../components/common/Nav';
import noImageAvailable from '../../images/no-image-available.svg';
import { styles } from './styles';
import { Props, State } from './types';

class RawMediaPage extends React.Component<Props, State> {
    public state: State = {
        isLoading: true,
        media: null,
    };

    public async componentDidMount() {
        const { mediaType, id } = this.props.match.params;
        const media = await this.loadMedia(mediaType, id);
        this.setState({ media, isLoading: false });
    }

    public render() {
        const { media } = this.state;
        const { classes } = this.props;

        let content = null;
        if (media) {
            content = (
                <Grid container={true} spacing={16} justify="space-around">
                    <Grid item={true} xs={12} md={3}>
                        <img
                            className={classes.img}
                            src={media.cover || noImageAvailable}
                        />
                    </Grid>
                    <Grid
                        className={classes.details}
                        container={true}
                        item={true}
                        xs={12}
                        md={6}
                    >
                        <Grid
                            className={classes.card}
                            item={true}
                            xs={12}
                            md={12}
                        >
                            <Paper className={classes.paper} elevation={1}>
                                <Typography variant="h3" component="h3">
                                    {media.title}
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid
                            className={classes.card}
                            item={true}
                            xs={12}
                            md={12}
                        >
                            <Paper className={classes.paper}>
                                <Typography
                                    variant="h6"
                                    component="h5"
                                    gutterBottom={true}
                                >
                                    Synopsis
                                </Typography>
                                <Typography component="p">
                                    {media.description || 'No synopsis found.'}
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Grid item={true} xs={12} md={3}>
                        <EntryMedia
                            mediaType={this.props.match.params.mediaType}
                            mediaId={this.props.match.params.id}
                        />
                    </Grid>
                </Grid>
            );
        }

        return (
            <>
                <Nav />
                {this.state.isLoading && <LinearProgress variant="query" />}
                <main className={classes.layout}>{content}</main>
            </>
        );
    }

    private loadMedia = async (mediaType: string, id: string) => {
        const res = await fetch(
            `${process.env.REACT_APP_API_BASE}/media/${mediaType}/${id}`,
            {
                mode: 'cors',
            },
        );

        if (!res.ok) {
            throw new Error(`Server error: ${res.status} ${res.statusText}`);
        }

        const json = await res.json();
        return json;
    };
}

export const MediaPageComponent = withStyles(styles)(RawMediaPage);
