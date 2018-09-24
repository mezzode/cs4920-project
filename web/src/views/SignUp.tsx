import {
    Avatar,
    Button,
    FormControl,
    FormLabel,
    Input,
    InputLabel,
    Theme,
    Typography,
    WithStyles,
} from '@material-ui/core';
import { createStyles, withStyles } from '@material-ui/core/styles';
import { LockOutlined as LockIcon } from '@material-ui/icons';
import * as React from 'react';
// import Dropzone from 'react-dropzone';
// import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
// import { Action } from 'redux';
// import { ThunkDispatch } from 'redux-thunk';
import { Nav } from '../components/common/Nav';

// TODO: fiddle with styling
const styles = (theme: Theme) =>
    createStyles({
        avatar: {
            backgroundColor: theme.palette.secondary.main,
            margin: theme.spacing.unit,
            marginLeft: 'auto',
            marginRight: 'auto',
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
            marginLeft: theme.spacing.unit * 3,
            marginRight: theme.spacing.unit * 3,
            marginTop: theme.spacing.unit * 3,
            textAlign: 'center',
            width: 'auto',
        },
        profileImage: {
            textAlign: 'left',
        },
        submit: {
            marginTop: theme.spacing.unit * 3,
        },
    });

interface Props extends WithStyles<typeof styles> {}
// interface StateProps {}
// interface OwnProps {}
// interface State {
//     files: File[];
// }
// interface DispatchProps {
//     uploadFile: () => void;
// }

// const mapStateToProps: MapStateToProps<
//     StateProps,
//     OwnProps,
//     State
// > = state => ({
//     files: state.files,
// });

// const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = (
//     dispatch: ThunkDispatch<State, void, Action>,
// ) => ({
//     uploadFile: () => {
//         // dispatch(() => {});
//     },
// });

const RawSignUp: React.SFC<Props> = ({ classes }) => (
    // public constructor(props: Props) {
    //     super(props);
    //     this.state = { files: [] };
    //     this.onDrop.bind(this);
    // }

    // public onDrop(files: File[]) {
    //     this.setState({
    //         files,
    //     });
    // }
    // public render() {
    // const { classes } = this.props;
    // return (
    <>
        <Nav />
        <main className={classes.layout}>
            <Avatar className={classes.avatar}>
                <LockIcon />
            </Avatar>
            <Typography variant="headline">Sign up</Typography>
            <form
                className={classes.form}
                action="/sign-up"
                method="post"
                encType="multipart/form-data"
            >
                <FormControl margin="normal" required={true} fullWidth={true}>
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <Input
                        id="email"
                        name="email"
                        autoComplete="email"
                        autoFocus={true}
                    />
                </FormControl>
                <FormControl margin="normal" required={true} fullWidth={true}>
                    <InputLabel htmlFor="username">Username</InputLabel>
                    <Input
                        id="username"
                        name="username"
                        autoComplete="username"
                        autoFocus={true}
                    />
                </FormControl>
                <FormControl margin="normal" required={true} fullWidth={true}>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input
                        name="password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                </FormControl>
                <FormControl margin="normal" required={true} fullWidth={true}>
                    <FormLabel className={classes.profileImage}>
                        Profile picture
                    </FormLabel>
                    <Input type="file" name="profileImage" id="profileImage" />
                    {/* <div className="dropzone">
                                <Dropzone onDrop={this.onDrop}>
                                    <Typography variant="body1">
                                        Drop an image or click here to upload a
                                        profile image
                                    </Typography>
                                </Dropzone>
                            </div> */}
                    {/* <aside>
                                <ul>
                                    {this.state.files.map((f: File) => (
                                        <li key={f.name}>
                                            {f.name} - {f.size} bytes
                                        </li>
                                    ))}
                                </ul>
                            </aside> */}
                </FormControl>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    type="submit"
                >
                    Create account
                </Button>
            </form>
        </main>
    </>
);
// }
// }

export const SignUp = withStyles(styles)(RawSignUp);
