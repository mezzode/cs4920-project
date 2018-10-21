// import Button from '@material-ui/core/Button';
import { Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { Nav } from '../../components/common/Nav';
import backgroundAnime from '../../images/anime.png';
import tv from '../../images/game-of-thrones.jpg';
import backgroundGame from '../../images/game2.jpg';
import game from '../../images/league-of-legends.jpg';
import backgroundMovie from '../../images/movie.png';
import anime from '../../images/one-punch-man.jpg';
import movie from '../../images/star-wars.png';
import backgroundTv from '../../images/tv.jpg';
import { styles } from './styles';
import { Props, State } from './types';

class RawHome extends React.Component<Props, State> {
    public images = [movie, tv, anime, game];
    public backgroundImages = [
        backgroundMovie,
        backgroundTv,
        backgroundAnime,
        backgroundGame,
    ];
    public imageNames = [
        'Star Wars',
        'Game of Thrones',
        'One Punch Man',
        'League of Legends',
    ];
    public mediaName = ['movies', 'shows', 'anime', 'games'];
    public subtext = ['you see!', 'you watch!', 'you enjoy!', 'you play!'];

    constructor(props: Props) {
        super(props);
        this.state = {
            backgroundImage: this.backgroundImages[0],
            highlightImage: this.images[0],
            imageName: this.imageNames[0],
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

    public updateBanner() {
        const nextIndex = (this.state.index + 1) % this.mediaName.length;
        this.setState({
            backgroundImage: this.backgroundImages[nextIndex],
            highlightImage: this.images[nextIndex],
            imageName: this.imageNames[nextIndex],
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
                <div
                    className={classes.header}
                    style={{
                        backgroundImage:
                            'url(' + this.state.backgroundImage + ')',
                    }}
                >
                    <Grid
                        container={true}
                        direction="row"
                        className={classes.root}
                    >
                        <Grid item={true} xs={3} />
                        <Grid item={true} xs={3} />
                        <Grid
                            item={true}
                            xs={3}
                            className={`${classes.halfpage} ${classes.textBox}`}
                        >
                            <Typography
                                align="center"
                                variant="h2"
                                className={classes.text}
                            >
                                Welcome to
                            </Typography>
                            <br />
                            <Typography
                                align="center"
                                variant="h1"
                                className={classes.text}
                            >
                                medialog
                            </Typography>
                            <br />
                            <Typography
                                align="center"
                                variant="h3"
                                className={classes.text}
                            >
                                Track the {this.state.mediaName} {this.state.subtext}
                            </Typography>
                        </Grid>
                        <Grid item={true} xs={3} className={classes.halfpage}>
                            {/* {' '}
                            <ButtonBase
                                className={classes.button}
                                style={{
                                    textDecoration: 'none',
                                }}
                            >
                                {' '}
                                <img
                                    className={classes.img}
                                    src={this.state.highlightImage}
                                />{' '}
                            </ButtonBase>{' '}
                            <br />
                            <Typography
                                align="center"
                                variant="h3"
                                className={`${classes.text} ${classes.textBox}`}
                            >
                                {this.state.imageName}
                            </Typography> */}
                        </Grid>
                    </Grid>
                </div>
            </>
        );
    }
}

export const HomeComponent = withStyles(styles)(RawHome);
