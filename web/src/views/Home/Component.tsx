// import Button from '@material-ui/core/Button';
import { ButtonBase, Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { Nav } from '../../components/common/Nav';
import anime from '../../images/anime.png';
import game from '../../images/game.jpg';
import movie from '../../images/movie.png';
import tv from '../../images/tv.jpg';
import { styles } from './styles';
import { Props, State } from './types';

// k u do this react
// i'll bring in the images
// do i keep typing here?
// yeah try guess the react components lol
// soz i pressed save ahahaha
// oh wait searchResults hasn't been merged in yet, gonna have to mimic from github
// oh ty LOL lololol
// ok carry on
class RawHome extends React.Component<Props, State> {
    public images = [movie, tv, anime, game];
    public mediaName = ['MOVIES', 'SHOWS', 'ANIME', 'GAMES'];
    public subtext = ['you See', 'you Watch', 'you Enjoy', 'you Play'];

    constructor(props: Props) {
        super(props);
        this.state = {
            backgroundImage: this.images[0],
            index: 0,
            intervalId: 0,
            mediaName: this.mediaName[0],
            subtext: this.subtext[0],
        };
    }

    public componentDidMount() {
        const intervalId = setInterval(this.updateBanner.bind(this), 8000);
        // So we can remove it when unmounting
        this.setState({
            intervalId,
        });
    }

    public componentWillUnmount() {
        clearInterval(this.state.intervalId);
    }

    // how to add line break after the MOVIES/SHOWS/ANIME etc?t
    // we'll try \n. if doesnt work we'll try <br> tags
    public updateBanner() {
        const nextIndex = (this.state.index + 1) % this.mediaName.length;
        this.setState({
            backgroundImage: this.images[nextIndex],
            index: nextIndex,
            mediaName: this.mediaName[nextIndex],
            subtext: this.subtext[nextIndex],
        });
    }

    public render() {
        const { classes } = this.props;
        return (
            <>
                <Nav transparent={true} />
                <div className={classes.header}>
                    <Grid
                        container={true}
                        direction="column"
                        className={classes.root}
                    >
                        <Grid
                            xs={6}
                            alignItems="center"
                            justify="center"
                            className={classes.halfpage}
                        >
                            <Typography align="center" variant="display2">
                                Welcome to
                            </Typography>
                            <br />
                            <Typography align="center" variant="display3">
                                medialog
                            </Typography>
                            <br />
                            <Typography align="center" variant="display2">
                                Track the
                            </Typography>
                            <br />
                            <Typography align="center" variant="display2">
                                {this.state.mediaName}
                            </Typography>
                            <Typography align="center" variant="display2">
                                {this.state.subtext}
                            </Typography>
                        </Grid>
                        <Grid
                            xs={6}
                            alignItems="center"
                            justify="center"
                            className={classes.halfpage}
                        >
                            {' '}
                            <ButtonBase
                                className={classes.image}
                                style={{ textDecoration: 'none' }}
                            >
                                {' '}
                                <img
                                    className={classes.img}
                                    src={this.state.backgroundImage}
                                />{' '}
                            </ButtonBase>{' '}
                            {this.state.backgroundImage}
                            <br />
                            <Typography variant="display1">
                                {' '}
                                NAME OF SHOW{' '}
                            </Typography>
                        </Grid>
                    </Grid>
                </div>
            </>
        );
    }
}

export const HomeComponent = withStyles(styles)(RawHome);
