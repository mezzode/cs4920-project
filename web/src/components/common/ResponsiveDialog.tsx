import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import withWidth, { isWidthDown, WithWidth } from '@material-ui/core/withWidth';
import * as React from 'react';

interface Props extends DialogProps, WithWidth {}

const RawResponsiveDialog: React.SFC<Props> = ({
    width,
    children,
    ...props
}) => (
    <Dialog fullWidth={false} fullScreen={isWidthDown('sm', width)} {...props}>
        {children}
    </Dialog>
);

export const ResponsiveDialog = withWidth()(RawResponsiveDialog);
