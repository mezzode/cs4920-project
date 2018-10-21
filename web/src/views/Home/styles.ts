import { Theme } from '@material-ui/core';
import { createStyles } from '@material-ui/core/styles';
import back from '../../images/back.png';

export const styles = (theme: Theme) =>
    createStyles({
        '@global': {
            body: {
                // backgroundColor: theme.palette.primary.dark,
                background: `linear-gradient(0deg, rgba(100, 0, 0, 0.8), rgba(100, 0, 0, 0.8)), url(${back})`,
                backgroundSize: 'cover',
                // backgroundColor: this.state.backgroundColor,
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
        fadein: {
            opacity: 0,
        },
        'fadein.visible': {
            opacity: 1,
            transition: 'opacity 1s ease-in',
        },
        halfpage1: {
            height: '100%',
            justifyContent: 'center',
            paddingTop: '200px',
            width: '100%',
        },
        halfpage2: {
            height: '100%',
            justifyContent: 'center',
            paddingTop: '150px',
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
            'border-radius': 20,
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
            '-webkit-font-smoothing': 'antialiased',
            justifyContent: 'center',
            opacity: 1,
            paddingTop: 10,
            // textShadow:
            //     '-1px -1px 0 #000, -1px 2px 0 #000, 1px -2px 0 #000, 1px 1px 0 #000',
        },
        text2: {
            '-webkit-font-smoothing': 'antialiased',
            color: 'yellow',
            justifyContent: 'center',
            opacity: 1,
            paddingTop: 10,
        },
        textBox: {
            // background: `linear-gradient(${theme.palette.primary.light}, ${
            //     theme.palette.primary.dark
            //     })`,
            // opacity: 0.8,
        },
        textImage: {
            justifyContent: 'center',
            opacity: 0.8,
            paddingTop: 20,
            // textShadow: '0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9, 0 5px 0 #aaa, 0 6px 1px rgba(0,0,0,.1), 0 0 5px rgba(0,0,0,.1), 0 1px 3px rgba(0,0,0,.3), 0 3px 5px rgba(0,0,0,.2), 0 5px 10px rgba(0,0,0,.25)',
        },
    });
