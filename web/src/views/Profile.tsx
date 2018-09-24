import {
    Avatar,
    Button,
    FormControl,
    Input,
    InputLabel,
    Theme,
    Typography,
    WithStyles,
} from '@material-ui/core';
import { createStyles, withStyles } from '@material-ui/core/styles';
import * as React from 'react';
import Dropzone from 'react-dropzone';
import { Nav } from '../components/common/Nav';
import defaultProfileImage from '../images/default-profile.jpg';

// TODO: fiddle with styling
const styles = (theme: Theme) =>
    createStyles({
        avatar: {
            backgroundColor: theme.palette.secondary.main,
            height: 60,
            margin: theme.spacing.unit,
            marginLeft: 'auto',
            marginRight: 'auto',
            width: 60,
        },
        form: {
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            marginTop: theme.spacing.unit * 8,
            padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit *
                3}px ${theme.spacing.unit * 3}px`,
            width: '100%', // Fix IE11 issue.
        },
        layout: {
            marginLeft: theme.spacing.unit * 8,
            marginRight: theme.spacing.unit * 8,
            marginTop: theme.spacing.unit * 3,
            textAlign: 'center',
            width: 'auto',
        },
        lock: {
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        submit: {
            marginTop: theme.spacing.unit * 3,
        },
    });
interface Props extends WithStyles<typeof styles> {}

const RawProfile: React.SFC<Props> = ({ classes }) => (
    <>
        <Nav />
        <main className={classes.layout}>
            <Typography variant="headline">Profile</Typography>
            <Avatar src={defaultProfileImage} className={classes.avatar} />
            <form
                className={classes.form}
                action="/update-profile-image"
                method="post"
            >
                <FormControl margin="normal" required={true} fullWidth={true}>
                    <Typography variant="subheading">
                        New profile image
                    </Typography>
                    <Dropzone>
                        <p>
                            Drop an image or click here to upload a profile
                            image
                        </p>
                    </Dropzone>
                </FormControl>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    type="submit"
                >
                    Submit
                </Button>
            </form>
            <form
                className={classes.form}
                action="/update-password"
                method="post"
            >
                <FormControl margin="normal" required={true} fullWidth={true}>
                    <Typography variant="subheading">New password</Typography>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input
                        id="password"
                        name="password"
                        autoComplete="password"
                        autoFocus={true}
                    />
                </FormControl>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    type="submit"
                >
                    Submit
                </Button>
            </form>
        </main>
    </>
);

export const Profile = withStyles(styles)(RawProfile);
