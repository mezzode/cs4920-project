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
import { Snackbar } from '../../components/common/Snackbar';
import defaultProfileImage from '../../images/default-profile.jpg';
import { styles } from './styles';
import { Props } from './types';

class RawProfile extends React.Component<Props> {
    public componentDidMount() {
        this.props.loadProfile();
    }
    public render() {
        const {
            classes,
            profileImage,
            handleUpdateImage,
            handleUpdatePassword,
            username,
        } = this.props;

        return (
            <>
                <Nav />
                <main className={classes.layout}>
                    <Typography variant="headline">Profile</Typography>
                    <Typography variant="caption">{username}</Typography>
                    <Avatar
                        src={profileImage || defaultProfileImage}
                        className={classes.avatar}
                    />
                    <form className={classes.form} onSubmit={handleUpdateImage}>
                        <FormControl
                            margin="normal"
                            required={true}
                            fullWidth={true}
                        >
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
                        onSubmit={handleUpdatePassword}
                    >
                        <FormControl
                            margin="normal"
                            required={true}
                            fullWidth={true}
                        >
                            <Typography variant="subheading">
                                New password
                            </Typography>
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
                    <Snackbar variant="success" message="Update successful" />
                </main>
            </>
        );
    }
}

export const ProfileComponent = withStyles(styles)(RawProfile);
