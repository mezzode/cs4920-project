// import Button from '@material-ui/core/Button';
import { ButtonBase, Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { Nav } from '../../components/common/Nav';
import backgroundAnime from '../../images/anime0.jpg';
import tv from '../../images/game-of-thrones.jpg';
import backgroundGame from '../../images/game0.jpg';
import backgroundTv from '../../images/got0.jpg';
import game from '../../images/league-of-legends.jpg';
import backgroundMovie from '../../images/movie0.jpg';
import anime from '../../images/one-punch-man.jpg';
import movie from '../../images/star-wars.png';
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
    public backgroundImages2 = [
        'linear-gradient(sandybrown, goldenrod)',
        'linear-gradient(tan, chocolate)',
        'linear-gradient(lightsalmon, indianred)',
        'linear-gradient(silver, grey)',
    ];
    public backgroundColors = [
        'coral',
        'forestgreen',
        'orange',
        'moccassin',
    ];
    public imageNames = [
        'Star Wars',
        'Game of Thrones',
        'One Punch Man',
        'League of Legends',
    ];
    public mediaName = ['MOVIES', 'SHOWS', 'ANIME', 'GAMES'];
    public subtext = ['you see!', 'you watch!', 'you enjoy!', 'you play!'];

    constructor(props: Props) {
        super(props);
        this.state = {
            backgroundColor: this.backgroundColors[0],
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
            backgroundColor: this.backgroundColors[nextIndex],
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
                {/* <div
                    className={classes.header}
                    style={{
                        backgroundImage:
                            // this.state.backgroundImage,
                            'url(' + this.state.backgroundImage + ')',
                        backgroundSize: 'cover',
                        boxShadow: 'inset 0 0 0 2000px rgba(100, 0, 0, 0.8)',
                        // backgroundColor: this.state.backgroundColor,
                    }}
                > */}
                <Grid
                    container={true}
                    direction="row"
                    className={classes.root}
                >
                    <Grid
                        item={true}
                        xs={6}
                        className={classes.halfpage1}
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
                            Track the
                            </Typography>
                        <br />
                        <Typography
                            align="center"
                            variant="h2"
                            className={classes.text2}
                        >
                            {this.state.mediaName}
                        </Typography>
                        <br />
                        <Typography
                            align="center"
                            variant="h3"
                            className={classes.text}
                        >
                            {this.state.subtext}
                        </Typography>
                    </Grid>
                    <Grid item={true} xs={6} className={classes.halfpage2}>
                        {' '}
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
                            className={`${classes.textImage} ${classes.textBox}`}
                        >
                            {this.state.imageName}
                        </Typography>
                    </Grid>
                </Grid>
                {/* // </div> */}
            </>
        );
    }
}

export const HomeComponent = withStyles(styles)(RawHome);
