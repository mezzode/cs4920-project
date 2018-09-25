import Button from '@material-ui/core/Button';
import * as React from 'react';
import { Props } from './types';

export const LogoutComponent: React.SFC<Props> = ({
    component,
    handleLogout,
}) => (
    <Button component={component} onClick={handleLogout} color="inherit">
        Log out
    </Button>
);
