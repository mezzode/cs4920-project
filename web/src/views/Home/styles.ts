import { Theme } from '@material-ui/core';
import { createStyles } from '@material-ui/core/styles';
import anime from '../../images/anime.png';

export const styles = (theme: Theme) =>
    createStyles({
        '@global': {
            body: {
                backgroundColor: theme.palette.primary.dark,
            },
        },
        content: {
            display: 'flex',
            justifyContent: 'space-around',
        },
        halfpage: {
            height: '100%',
            width: '100%',
        },
        header: {
            backgroundImage: anime,
            backgroundPodsition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            height: '100vh',
        },
        image: {
            height: 384,
            width: 384,
        },
        img: {
            display: 'block',
            margin: 'auto',
            maxHeight: '100%',
            maxWidth: '100%',
        },
        root: {
            flexGrow: 1,
            height: '100%',
            width: '100%',
        },
    });
