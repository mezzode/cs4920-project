import { Theme } from '@material-ui/core';
import { createStyles } from '@material-ui/core/styles';

export const styles = (theme: Theme) =>
    createStyles({
        '@global': {
            body: {
                backgroundColor: theme.palette.primary.dark,
            },
        },
        button: {
            justifyContent: 'center',
            width: '100%',
        },
        content: {
            display: 'flex',
            justifyContent: 'space-around',
        },
        halfpage: {
            height: '100%',
            justifyContent: 'center',
            paddingTop: '50px',
            width: '100%',
        },
        header: {
            // backgroundImage: 'url(' + anime + ')',
            backgroundPodsition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            height: '90vh',
            justifyContent: 'center',
        },
        image: {
            alignItems: 'center',
            height: 384,
            justifyContent: 'center',
            width: 384,
        },
        img: {
            display: 'block',
            height: '70%',
            justifyContent: 'center',
            margin: 'auto',
            width: '90%',
        },
        root: {
            flexGrow: 1,
            height: '100%',
            width: '100%',
        },
        text: {
            justifyContent: 'center',
            textShadow:
                '-2px -2px 0 #000, -2px 2px 0 #000, 2px -2px 0 #000, 2px 2px 0 #000',
        },
        textBox: {
            // background: `linear-gradient(${theme.palette.primary.dark}, ${
            //     theme.palette.primary.main
            // })`,
            // opacity: 0.8,
        },
    });
