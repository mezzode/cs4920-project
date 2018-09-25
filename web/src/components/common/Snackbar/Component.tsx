import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { withStyles } from '@material-ui/core/styles';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import classNames from 'classnames';
import * as React from 'react';
import { styles1, styles2 } from './styles';
import { Props1, Props2 } from './types';

const variantIcon = {
    error: ErrorIcon,
    info: InfoIcon,
    success: CheckCircleIcon,
    warning: WarningIcon,
};

function MySnackbarContent(props: Props1) {
    const { classes, className, message, onClose, variant, ...other } = props;
    const Icon = variantIcon[variant];

    return (
        <SnackbarContent
            className={classNames(classes[variant], className)}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" className={classes.message}>
                    <Icon
                        className={classNames(
                            classes.icon,
                            classes.iconVariant,
                        )}
                    />
                    {message}
                </span>
            }
            action={[
                <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    className={classes.close}
                    onClick={onClose}
                >
                    <CloseIcon className={classes.icon} />
                </IconButton>,
            ]}
            {...other}
        />
    );
}
const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

const RawCustomizedSnackbars: React.SFC<Props2> = ({
    open,
    variant,
    message,
    handleClose,
}) => (
    <>
        <Snackbar
            anchorOrigin={{
                horizontal: 'left',
                vertical: 'bottom',
            }}
            open={open || false}
            autoHideDuration={3000}
            onClose={handleClose}
        >
            <MySnackbarContentWrapper
                onClose={handleClose}
                variant={variant}
                message={message}
            />
        </Snackbar>
    </>
);

export const SnackbarComponent = withStyles(styles2)(RawCustomizedSnackbars);
