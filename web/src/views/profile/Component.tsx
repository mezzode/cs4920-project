import {
    Avatar,
    Button,
    FormControl,
    FormLabel,
    Input,
    InputLabel,
    Typography,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { Nav } from '../../components/common/Nav';
import defaultProfileImage from '../../images/default-profile.jpg';
import { styles } from './styles';
import { Props } from './types';

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
                    <FormControl
                        margin="normal"
                        required={true}
                        fullWidth={true}
                    >
                        <FormLabel className={classes.centerItem}>
                            Profile picture
                        </FormLabel>
                        <Input
                            type="file"
                            name="profileImage"
                            id="profileImage"
                        />
                    </FormControl>
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

export const ProfileComponent = withStyles(styles)(RawProfile);
