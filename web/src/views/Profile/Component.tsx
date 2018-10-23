import {
    Avatar,
    Button,
    FormControl,
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
        this.loadProfile();
    }

    public loadProfile = async () => {
        const res = await fetch(`${process.env.REACT_APP_API_BASE}/profile`, {
            credentials: 'include',
            headers: {
                Authorization: `Bearer ${this.props.authToken}`,
            },
            mode: 'cors',
        });
        if (res.ok) {
            const imageBlob = await res.blob();
            const displayImage = URL.createObjectURL(imageBlob);
            this.props.dispatchLoadProfile(displayImage);
        }
    };

    public handleUpdateImage: React.FormEventHandler = async event => {
        event.preventDefault();
        const data = new FormData(event.target as HTMLFormElement);

        const res = await fetch(
            `${process.env.REACT_APP_API_BASE}/update-profile-image`,
            {
                body: data,
                credentials: 'include',
                headers: {
                    Authorization: `Bearer ${this.props.authToken}`,
                },
                method: 'post',
                mode: 'cors',
            },
        );

        if (res.ok) {
            const imageBlob = await res.blob();
            const displayImage = URL.createObjectURL(imageBlob);
            this.props.handleDispatchUpdateImage(displayImage);
        }
    };

    public handleUpdatePassword: React.FormEventHandler = async event => {
        event.preventDefault();
        const data = new FormData(event.target as HTMLFormElement);

        const res = await fetch(
            `${process.env.REACT_APP_API_BASE}/update-password`,
            {
                body: data,
                credentials: 'include',
                headers: {
                    Authorization: `Bearer ${this.props.authToken}`,
                },
                method: 'post',
                mode: 'cors',
            },
        );

        if (res.ok) {
            this.props.handleDispatchUpdatePassword();
        }
    };

    public render() {
        const { classes, profileImage, username } = this.props;

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
                    <form
                        className={classes.form}
                        onSubmit={this.handleUpdateImage}
                    >
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
                        onSubmit={this.handleUpdatePassword}
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
                                type="password"
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
